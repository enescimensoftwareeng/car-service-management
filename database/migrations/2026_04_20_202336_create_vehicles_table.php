<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();

            // --- EKLENEN SÜTUNLAR ---
            $table->unsignedBigInteger('user_id'); // Aracın sahibi (Müşteri)
            $table->unsignedBigInteger('brand_id')->nullable(); // Aracın markası (İleride eklenebilir)
            $table->string('plate')->unique(); // Plaka (Benzersiz olmalı)
            $table->string('model')->nullable(); // Model (Örn: Focus, Corolla)
            $table->string('chassis_no')->nullable(); // Şasi No
            $table->integer('current_km')->default(0); // Güncel Kilometre
            // ----------------------------------

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
