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
            // ÖNEMLİ: Bu satırın orada olduğundan emin ol
            $table->foreignId('vehicle_id')->constrained()->onDelete('cascade');
            // Sorumlu usta (users tablosuna bağlanıyor)
            $table->foreignId('technician_id')->constrained('users');

            $table->integer('km_entry');
            $table->text('complaint');
            $table->enum('status', ['Beklemede', 'İşlemde', 'Tamamlandı'])->default('Beklemede');
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
