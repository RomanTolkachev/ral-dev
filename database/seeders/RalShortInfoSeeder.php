<?php

namespace Database\Seeders;

use App\Models\RalShortInfo;
use Illuminate\Database\Seeder;

class RalShortInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RalShortInfo::factory()->count(100)->create();
    }
}
