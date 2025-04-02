<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Factories\NpRegulationsTnvedFactory;

class NpRegulationsTnvedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $factory = new NpRegulationsTnvedFactory();
        $factory->generate();
    }
}
