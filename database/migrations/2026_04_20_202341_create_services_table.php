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
        Schema::create('services', function (Blueprint $table) {
            $table->id();

            // --- EKLENEN SÜTUNLAR ---
            $table->unsignedBigInteger('vehicle_id'); // Hangi araca ait olduğu
            $table->integer('current_km'); // Servise geldiği anki kilometresi
            $table->text('complaint'); // Müşterinin şikayeti / İstekler
            $table->string('status')->default('pending'); // Durum: pending (beklemede), processing (işlemde), completed (tamamlandı)
            // ----------------------------------

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
