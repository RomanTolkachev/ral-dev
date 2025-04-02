<?php

use App\Models\RalShortInfo;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('np_regulations_tnveds', function (Blueprint $table) {
            $table->id();
            $table->string('link', 128);
            $table->string('regulation');
            $table->string('tnved');
            $table->foreign('link')->references('link')->on('ral_short_info_view');
        });

        

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('np_regulations_tnveds');
    }
};
