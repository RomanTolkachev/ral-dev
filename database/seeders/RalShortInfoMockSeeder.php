<?php

namespace Database\Seeders;

use App\Models\RalShortInfoMock;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class RalShortInfoMockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RalShortInfoMock::factory()->count(100)->create();
        echo "done";
    }
}
