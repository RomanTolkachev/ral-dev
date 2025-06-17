<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates_short_info', function (Blueprint $table) {
            $table->id(); 

            $table->string("certificate_name");
            $table->string("certificate_status");
            $table->string("certificate_link");

            $table->dateTime("update_status_date")->nullable();
            $table->dateTime("previous_update_status_date")->nullable();
            $table->string("previous_status")->nullable();
            $table->dateTime("date")->nullable();
            $table->dateTime("endDate")->nullable();

            $table->string("blankNumber")->nullable();
            $table->string("technicalReglaments")->nullable();
            $table->string("group")->nullable();
            $table->string("certType")->nullable();
            $table->string("certObjectType")->nullable();

            $table->string("applicantLegalSubjectType")->nullable();
            $table->string("applicantType")->nullable();
            $table->string("applicantName")->nullable();
            $table->string("applicantOpf")->nullable();
            $table->string("applicantFilialFullNames")->nullable();

            $table->string("manufacterLegalSubjectType")->nullable();
            $table->string("manufacterType")->nullable();
            $table->string("manufacterName")->nullable();
            $table->string("manufacterOpf")->nullable();
            $table->string("manufacterFilialFullNames")->nullable();

            $table->integer("idRalCertificationAuthority")->nullable();
            $table->string("certificationAuthorityAttestatRegNumber")->nullable();

            $table->string("productOrig")->nullable();
            $table->string("productFullName")->nullable();
            $table->string("productBatchSize")->nullable();

            $table->string("productIdentificationName")->nullable();
            $table->string("productIdentificationType")->nullable();
            $table->string("productIdentificationTrademark")->nullable();
            $table->string("productIdentificationModel")->nullable();
            $table->string("productIdentificationArticle")->nullable();
            $table->string("productIdentificationSort")->nullable();
            $table->string("productIdentificationGtin")->nullable();

            $table->string("expertFio")->nullable();
            $table->string("expertSnils")->nullable();

            $table->integer("certificate_id"); // NOT NULL
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates_short_info');
    }
};
