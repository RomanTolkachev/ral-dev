<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('accreditation_area', function (Blueprint $table) {
            $table->string("source_row");
            $table->string("gost");
            $table->string("gost_object");
            $table->string("okpd");
            $table->string("tn_ved");
            $table->string("characteristic");
            $table->string("characteristic_range");
            $table->string("source_page");
            $table->bigInteger("id_ral");
            $table->string("source_file");
            $table->string("source_file_label");
            $table->string("full_gost");
            $table->id();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accreditation_area');
    }
};
