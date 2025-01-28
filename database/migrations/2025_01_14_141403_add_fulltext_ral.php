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
        Schema::table('ral_short_info_mock', function (Blueprint $table) {
            $table->fullText('fullName');
            $table->fullText('oaDescription');
            $table->fullText('applicantINN');
            $table->fullText('RegNumber');
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
