<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ral_short_info_view', function (Blueprint $table) {
            $table->string('link', 128)->unique();
            $table->string('RegNumber',128);
            $table->string('old_status_AL',128)->nullable();
            $table->string('new_status_AL',128)->nullable();
            $table->dateTime('status_change_date')->nullable();
            $table->string('nameType',128);
            $table->string('nameTypeActivity',256)->nullable();
            $table->dateTime('regDate')->nullable();
            $table->string('fullName',512)->nullable();
            $table->text('address')->nullable();
            $table->string('applicantINN',32)->nullable();
            $table->string('applicantFullName',1024)->nullable();
            $table->text('oaDescription')->nullable();
            $table->string('NPstatus',128)->nullable();
            $table->id();
            $table->dateTime('NP_status_change_date')->nullable();
            $table->string('regulations')->nullable();
            $table->index(['applicantINN', 'RegNumber', 'fullName'], 'idx_ral_info');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ral_short_info_view');
    }
};
