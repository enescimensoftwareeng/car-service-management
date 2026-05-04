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
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->string('description');
            $table->integer('quantity')->default(1);
            $table->decimal('part_price', 10, 2)->default(0);  // Parça Tutarı
            $table->decimal('labor_price', 10, 2)->default(0); // İşçilik Tutarı
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_items');
    }
};
