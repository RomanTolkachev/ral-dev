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
        Schema::create('accreditation_areas', function (Blueprint $table) {
            $table->id();
            $table->string('nov_gosts');
            $table->string('nov_tnveds');
            $table->string('comperable_gosts');
            $table->string('comperable_tnveds');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accreditation_areas');
    }
};
