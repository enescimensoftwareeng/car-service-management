<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_items', function (Blueprint $table) {
            $table->id();

            // --- EKLENEN SÜTUNLAR ---
            $table->unsignedBigInteger('service_id'); // Hangi iş emrine (faturaya) ait olduğu
            $table->string('item_name'); // Parça veya işçilik adı (Örn: Buji, Motor Yağı, İşçilik)
            $table->integer('quantity')->default(1); // Adet/Miktar
            $table->decimal('unit_price', 10, 2); // Birim Fiyat (Örn: 1500.50 TL)
            // ----------------------------------

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_items');
    }
};
