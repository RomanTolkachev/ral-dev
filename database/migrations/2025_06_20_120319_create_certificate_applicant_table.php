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
        Schema::create('certificate_applicant', function (Blueprint $table) {

            $table->id();
            $table->integer('certificate_id');
            $table->integer('idLegalSubject');
            $table->integer('idEgrul');
            $table->integer('idApplicantType');
            $table->integer('idLegalSubjectType');
            $table->string('fullName');
            $table->string('shortName');
            $table->integer('idPerson');
            $table->string('surname');
            $table->string('firstName');
            $table->string('patronymic');
            $table->string('headPosition');
            $table->string('ogrn');
            $table->string('ogrnAssignDate');
            $table->string('inn');
            $table->string('kpp');
            $table->integer('idLegalForm');
            $table->string('regDate');
            $table->string('regOrganName');
            $table->string('addlRegInfo');
            $table->boolean('isEecRegister');
            $table->dateTime('passportIssueDate');
            $table->string('passportIssuedBy');
            $table->string('passportNum');
            $table->integer('idPersonDoc');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificate_applicant');
    }
};
