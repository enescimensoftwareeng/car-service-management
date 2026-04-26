<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin rolünü bul
        $adminRole = Role::where('name', 'admin')->first();

        User::updateOrCreate(
            ['email' => 'admin@admin.com'], // Bu e-posta varsa güncelle, yoksa oluştur
            [
                'name' => 'Sistem Yöneticisi',
                'password' => Hash::make('password'), // Varsayılan şifre
                'role_id' => $adminRole->id,
                'phone' => '05554443322'
            ]
        );
    }
}
