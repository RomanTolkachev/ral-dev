<?php

namespace Database\Seeders;

use Database\Factories\NPFactory;
use Illuminate\Database\Seeder;

class NPSeeder extends Seeder
{
    public function run(): void
    {
        $factory = new NPFactory();
        $factory->generatePN();
    }
}
