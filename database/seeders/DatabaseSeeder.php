<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // $this->call(AccreditationAreaSeeder::class);
        $this->call(RalShortInfoSeeder::class);
        $this->call(NPSeeder::class);
    }
}