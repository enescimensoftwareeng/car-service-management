<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController; // Ekledik: Araç Yönlendiricisi
use App\Models\Vehicle; // Ekledik: Araç Modeli
use App\Models\User;    // Ekledik: Kullanıcı Modeli
use App\Models\Brand;   // Ekledik: Marka Modeli
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// GÜNCELLENDİ: İstatistikleri React'e Gönderen Dashboard Rotası
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'stats' => [
            'vehicles' => Vehicle::count(),
            'customers' => User::where('role_id', 3)->count(), // Sadece müşteriler
            'brands' => Brand::count(),
        ]
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Sisteme Giriş Yapmış Kullanıcıların Rotaları
Route::middleware('auth')->group(function () {
    // Profil İşlemleri
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // YENİ: Araç Yönetimi Tüm İşlemleri (Ekleme, Silme, Güncelleme, Listeleme)
    Route::resource('vehicles', VehicleController::class);
});

require __DIR__.'/auth.php';
