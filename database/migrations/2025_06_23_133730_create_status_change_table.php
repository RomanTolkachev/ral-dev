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
        Schema::create('status_change', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('certificate_id');
            $table->string('status')->nullable();
            $table->dateTime('begin_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->text('comment')->nullable();
            $table->dateTime('publish_date')->nullable();
            $table->string('status_changes_by')->nullable();
            $table->unsignedBigInteger('idChangeStatus')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('status_change');
    }
};
