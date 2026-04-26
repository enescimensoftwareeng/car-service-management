<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Veritabanına araç markalarını basar.
     */
    public function run(): void
    {
        $brands = [
            'Volkswagen',
            'Audi',
            'BMW',
            'Mercedes-Benz',
            'Skoda',
            'Seat',
            'Renault',
            'Fiat',
            'Ford',
            'Toyota',
            'Honda',
            'Hyundai',
            'Peugeot',
            'Opel',
            'Volvo',
            'Nissan',
            'Kia'
        ];

        foreach ($brands as $brand) {
            // Eğer marka zaten varsa tekrar eklemesini engellemek için firstOrCreate kullanıyoruz
            Brand::firstOrCreate(['name' => $brand]);
        }
    }
}
