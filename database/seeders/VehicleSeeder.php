<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Önce bir 'customer' (müşteri) rolünü bulalım
        $customerRole = Role::where('name', 'customer')->first();

        // 2. Bir tane örnek müşteri (araç sahibi) oluşturalım
        $user = User::updateOrCreate(
            ['email' => 'musteri@test.com'],
            [
                'name' => 'Ahmet Müşteri',
                'password' => Hash::make('password'),
                'role_id' => $customerRole->id,
                'phone' => '05001112233'
            ]
        );

        // 3. Bu müşteriye ait bir araç ekleyelim
        Vehicle::updateOrCreate(
            ['plate' => '34 ABC 123'],
            [
                'user_id' => $user->id,
                'model' => 'Focus',
                'chassis_no' => 'WFOXXXXXXXX123456',
                'current_km' => 45000,
                // Eğer brand_id kullanıyorsan buraya bir id ver,
                // yoksa brand sütunu string ise 'Ford' yazabilirsin.
            ]
        );

        Vehicle::updateOrCreate(
            ['plate' => '06 ANK 06'],
            [
                'user_id' => $user->id,
                'model' => 'Corolla',
                'chassis_no' => 'NMTXXXXXXXX987654',
                'current_km' => 120000,
            ]
        );
    }
}
