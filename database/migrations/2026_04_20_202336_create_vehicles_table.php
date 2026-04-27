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

            // --- EKLENMESİ GEREKEN SÜTUNLAR ---
            $table->unsignedBigInteger('owner_id'); // Aracı ekleyen kişi (şimdilik Admin)
            $table->string('plate', 20)->unique();  // Plaka (benzersiz)
            $table->string('model', 100);           // Model
            $table->string('chassis_no', 17)->unique(); // Şasi No (benzersiz)
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
