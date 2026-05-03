<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\ServiceController;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\Brand;
use App\Models\Service;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ANA SAYFA
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// YÖNETİM PANELİ (Kullanıcı Rolüne Göre Yönlendirme)
Route::get('/dashboard', function () {
    $user = auth()->user();

    // Rol 1: Sistem Yöneticisi (Admin)
    if ($user->role_id === 1) {
        return Inertia::render('Dashboard', [
            'stats' => [
                'vehicles' => Vehicle::count(),
                'customers' => User::where('role_id', 3)->count(),
                'brands' => Brand::count(),
                'daily_services' => Service::whereDate('created_at', now())->count(),
            ]
        ]);
    }

    // Rol 2: Servis Ustası
    if ($user->role_id === 2) {
        return Inertia::render('Dashboard', [
            'stats' => [
                'daily_services' => Service::whereDate('created_at', now())->count(),
            ]
        ]);
    }

    // Rol 3: Müşteri
    if ($user->role_id === 3) {

        // 1. Müşterinin Araçları
        $vehicles = Vehicle::where('owner_id', $user->id)->get();

        // 2. Aktif (Devam Eden) Servis Kayıtları
        $activeServices = Service::with('vehicle')
            ->whereHas('vehicle', function ($query) use ($user) {
                $query->where('owner_id', $user->id);
            })
            ->whereNotIn('status', ['Tamamlandı', 'Teslim Edildi'])
            ->orderBy('created_at', 'desc')
            ->get();

        // 3. Geçmiş (Tamamlanmış) Servis Kayıtları (YENİ EKLENDİ)
        $pastServices = Service::with('vehicle')
            ->whereHas('vehicle', function ($query) use ($user) {
                $query->where('owner_id', $user->id);
            })
            ->whereIn('status', ['Tamamlandı', 'Teslim Edildi'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Customer/Dashboard', [
            'vehicles' => $vehicles,
            'activeServices' => $activeServices,
            'pastServices' => $pastServices // React tarafına gönderiliyor
        ]);
    }

    // Belirsiz rol
    abort(403, 'Yetkisiz erişim.');
})->middleware(['auth', 'verified'])->name('dashboard');


// GÜVENLİ BÖLGE (Sadece Giriş Yapanlar)
Route::middleware('auth')->group(function () {

    // Profil İşlemleri
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Araçlar ve Servisler
    Route::resource('vehicles', VehicleController::class);
    Route::resource('services', ServiceController::class);

    // Faturaya parça/işçilik ekleme rotası
    Route::post('services/{service}/items', [ServiceController::class, 'storeItem'])->name('services.items.store');

    // DURUM GÜNCELLEME ROTASI:
    Route::patch('/services/{service}/status', [ServiceController::class, 'update'])->name('services.update-status');
});

require __DIR__.'/auth.php';
