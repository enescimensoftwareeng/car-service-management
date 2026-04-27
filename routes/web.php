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
use App\Http\Controllers\ServiceController;

// ANA SAYFA
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// YÖNETİM PANELİ (Gelişmiş Raporlama)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'stats' => [
            'vehicles' => Vehicle::count(),
            'customers' => User::where('role_id', 3)->count(),
            'brands' => Brand::count(),
            'daily_services' => Service::whereDate('created_at', now())->count(),
        ]
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// GÜVENLİ BÖLGE (Sadece Giriş Yapanlar)
Route::middleware('auth')->group(function () {
    // Profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // SİSTEM SORUMLUSU DUVARI: Sadece Usta ve Adminler
    Route::middleware('role:Usta')->group(function () {
        Route::resource('vehicles', VehicleController::class);
        Route::resource('services', ServiceController::class);

        // Faturaya parça/işçilik ekleme rotası
        Route::post('/services/{service}/items', [ServiceController::class, 'addItem'])->name('services.add-item');

        // DURUM GÜNCELLEME ROTASI BURADA:
        Route::patch('/services/{service}/status', [ServiceController::class, 'update'])->name('services.update-status');
    });
});

require __DIR__.'/auth.php';



Route::middleware('auth')->group(function () {
    Route::resource('vehicles', VehicleController::class);
    Route::resource('services', ServiceController::class); // YENİ EKLENEN SATIR
});

// Existing routes...
Route::middleware('auth')->group(function () {
    Route::resource('vehicles', VehicleController::class);
    Route::resource('services', ServiceController::class);

    // YENİ EKLENEN SATIR: Parça ekleme rotası
    Route::post('services/{service}/items', [ServiceController::class, 'storeItem'])->name('services.items.store');
});
