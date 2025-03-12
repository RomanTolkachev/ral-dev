<?php

namespace Database\Seeders;

use App\Models\NPMock;
use Database\Factories\NPMockFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NPMockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $factory = new NPMockFactory();
        $factory->generatePN();
    }
}
