<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AppointmentController;
use App\Models\Vehicle;
use App\Models\Appointment;
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
        'brands' => Brand::all(),
    ]);
});

// PLAKA İLE GEÇMİŞ SORGULAMA (Public API)
Route::get('/api/vehicle-history', [VehicleController::class, 'publicHistory'])->name('api.vehicle-history');

// RANDEVU OLUŞTURMA (Public)
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');

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
                'technicians' => User::where('role_id', 2)->count(),
            ],
            'appointments' => Appointment::with(['user', 'vehicle.brand'])->latest()->get()
        ]);
    }

    // Rol 2: Servis Ustası
    if ($user->role_id === 2) {
        $activeTasks = Service::with('vehicle.brand')
            ->where('technician_id', $user->id)
            ->whereNotIn('status', ['Tamamlandı', 'Teslim Edildi'])
            ->latest()
            ->get();

        $completedTasksCount = Service::where('technician_id', $user->id)
            ->whereIn('status', ['Tamamlandı', 'Teslim Edildi'])
            ->count();

        return Inertia::render('Technician/Dashboard', [
            'stats' => [
                'active_tasks' => $activeTasks->count(),
                'completed_tasks' => $completedTasksCount,
                'total_parts' => \App\Models\Part::count(), // Stoktaki parça/ürün çeşidi
            ],
            'active_services' => $activeTasks
        ]);
    }

    // Rol 3: Müşteri
    if ($user->role_id === 3) {

        // 1. Müşterinin Araçları
        $vehicles = Vehicle::where('owner_id', $user->id)->get();

        // 2. Aktif (Devam Eden) Servis Kayıtları ('items' ilişkisi eklendi)
        $activeServices = Service::with(['vehicle', 'items'])
            ->whereHas('vehicle', function ($query) use ($user) {
                $query->where('owner_id', $user->id);
            })
            ->whereNotIn('status', ['Tamamlandı', 'Teslim Edildi'])
            ->orderBy('created_at', 'desc')
            ->get();

        // 3. Geçmiş (Tamamlanmış) Servis Kayıtları ('items' ilişkisi eklendi)
        $pastServices = Service::with(['vehicle', 'items'])
            ->whereHas('vehicle', function ($query) use ($user) {
                $query->where('owner_id', $user->id);
            })
            ->whereIn('status', ['Tamamlandı', 'Teslim Edildi'])
            ->orderBy('created_at', 'desc')
            ->get();

        // 4. Müşterinin Randevuları
        $appointments = Appointment::with('vehicle.brand')
            ->where('user_id', $user->id)
            ->orderBy('appointment_date', 'desc')
            ->orderBy('appointment_time', 'desc')
            ->get();

        return Inertia::render('Customer/Dashboard', [
            'vehicles' => $vehicles,
            'activeServices' => $activeServices,
            'pastServices' => $pastServices, // React tarafına gönderiliyor
            'appointments' => $appointments
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

    // Araçlar, Servisler ve Ustalar
    Route::resource('vehicles', VehicleController::class);
    Route::resource('services', ServiceController::class);
    
    // Usta (Technician) Yönetimi (Sadece Admin için kısıtlanmış rotalar)
    Route::get('/technicians', [App\Http\Controllers\TechnicianController::class, 'index'])->name('technicians.index');
    Route::post('/technicians', [App\Http\Controllers\TechnicianController::class, 'store'])->name('technicians.store');
    Route::put('/technicians/{user}', [App\Http\Controllers\TechnicianController::class, 'update'])->name('technicians.update');
    Route::delete('/technicians/{user}', [App\Http\Controllers\TechnicianController::class, 'destroy'])->name('technicians.destroy');
    Route::patch('/technicians/{user}/reset-password', [App\Http\Controllers\TechnicianController::class, 'resetPassword'])->name('technicians.reset-password');

    // Faturaya parça/işçilik ekleme rotası
    Route::post('services/{service}/items', [ServiceController::class, 'storeItem'])->name('services.items.store');

    // DURUM GÜNCELLEME ROTASI:
    Route::patch('/services/{service}/status', [ServiceController::class, 'update'])->name('services.update-status');

    // RANDEVU DURUM GÜNCELLEME (Admin)
    Route::patch('/appointments/{appointment}/status', [AppointmentController::class, 'updateStatus'])->name('appointments.update-status');

    // DEPO/PARÇA YÖNETİMİ
    Route::resource('parts', \App\Http\Controllers\PartController::class);
});

require __DIR__.'/auth.php';
