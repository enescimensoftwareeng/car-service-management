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
        if (!Schema::hasColumn('vehicles', 'chassis_no')) {
            Schema::table('vehicles', function (Blueprint $table) {
                $table->string('chassis_no', 17)->nullable()->unique()->after('year');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('vehicles', 'chassis_no')) {
            Schema::table('vehicles', function (Blueprint $table) {
                $table->dropUnique('vehicles_chassis_no_unique');
                $table->dropColumn('chassis_no');
            });
        }
    }
};
