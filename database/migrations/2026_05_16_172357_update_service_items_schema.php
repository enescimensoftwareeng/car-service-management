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
        Schema::table('service_items', function (Blueprint $table) {
            if (Schema::hasColumn('service_items', 'item_name')) {
                $table->renameColumn('item_name', 'description');
            }
            if (Schema::hasColumn('service_items', 'unit_price')) {
                $table->renameColumn('unit_price', 'part_price');
            }
        });

        Schema::table('service_items', function (Blueprint $table) {
            if (!Schema::hasColumn('service_items', 'labor_price')) {
                $table->decimal('labor_price', 10, 2)->default(0);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_items', function (Blueprint $table) {
            if (Schema::hasColumn('service_items', 'description')) {
                $table->renameColumn('description', 'item_name');
            }
            if (Schema::hasColumn('service_items', 'part_price')) {
                $table->renameColumn('part_price', 'unit_price');
            }
            if (Schema::hasColumn('service_items', 'labor_price')) {
                $table->dropColumn('labor_price');
            }
        });
    }
};
