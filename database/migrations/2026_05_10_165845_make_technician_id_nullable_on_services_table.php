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
        Schema::table('services', function (Blueprint $table) {
            // Önce mevcut foreign key bağlantısını kaldır
            $table->dropForeign(['technician_id']);
            
            // Sütunu nullable yap
            $table->unsignedBigInteger('technician_id')->nullable()->change();
            
            // Foreign key bağlantısını onDelete('set null') ile tekrar kur
            $table->foreign('technician_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropForeign(['technician_id']);
            $table->unsignedBigInteger('technician_id')->nullable(false)->change();
            $table->foreign('technician_id')
                  ->references('id')
                  ->on('users');
        });
    }
};
