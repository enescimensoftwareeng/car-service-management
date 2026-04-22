<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Rolleri Oluştur
        $roles = ['Admin', 'Usta', 'Müşteri'];
        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        // 2. Sık Kullanılan Araç Markaları
        $brands = ['Volkswagen', 'Renault', 'Toyota', 'Ford', 'Fiat', 'BMW', 'Mercedes'];
        foreach ($brands as $brand) {
            Brand::create(['name' => $brand]);
        }

        // 3. Sistem Yöneticisi (Admin) Hesabı
        User::create([
            'name' => 'Muhammed Enes',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'), // Giriş şifresi: password
            'role_id' => 1, // Admin
            'phone' => '05550000000',
        ]);

        // 4. Örnek Sistem Kullanıcıları
        User::create([
            'name' => 'Ahmet Usta',
            'email' => 'usta@usta.com',
            'password' => Hash::make('password'),
            'role_id' => 2, // Usta
            'phone' => '05551112233',
        ]);

        User::create([
            'name' => 'Veli Müşteri',
            'email' => 'musteri@musteri.com',
            'password' => Hash::make('password'),
            'role_id' => 3, // Müşteri
            'phone' => '05554445566',
        ]);
    }
}
