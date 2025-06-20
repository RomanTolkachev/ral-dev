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
        Schema::create('certificationAuthority', function (Blueprint $table) {
            $table->id(); // поле "id"
            $table->integer('certificate_id');
            $table->integer('idCertificationAuthority');
            $table->string('fullName');
            $table->string('accredOrgName');
            $table->string('attestatRegNumber');
            $table->string('attestatRegDate');
            $table->string('attestatEndDate');
            $table->integer('idRal');
            $table->string('ogrn');
            $table->integer('idPerson');
            $table->string('firstName');
            $table->string('surname');
            $table->string('patronymic');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificationAuthority');
    }
};
