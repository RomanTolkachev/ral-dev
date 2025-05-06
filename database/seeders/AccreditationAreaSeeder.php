<?php

namespace Database\Seeders;

use App\Models\AccreditationArea;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccreditationAreaSeeder extends Seeder
{
    public function run(): void
    {
        AccreditationArea::factory()->count(30)->create();
    }
}
