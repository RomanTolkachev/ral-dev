<?php

namespace Database\Seeders;

use App\Models\RalShortInfoView;
use Illuminate\Database\Seeder;

class RalShortInfoViewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RalShortInfoView::factory()->count(100)->create();
    }
}
