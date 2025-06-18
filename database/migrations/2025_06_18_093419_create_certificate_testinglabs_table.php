<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificate_testinglabs', function (Blueprint $table) {
            $table->id(); // primary key

            $table->unsignedBigInteger('id_cert')->nullable();
            $table->string('link', 128)->nullable();
            $table->unsignedBigInteger('id_ral')->nullable();

            // Foreign key constraints
            $table->foreign('id_cert')->references('id')->on('certificates_short_info')->onDelete('set null');
            $table->foreign('link')->references('link')->on('ral_short_info_view')->onDelete('NO ACTION');
            $table->foreign('id_ral')->references('id')->on('ral_short_info_view')->onDelete('NO ACTION');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificate_testinglabs');
    }
};
