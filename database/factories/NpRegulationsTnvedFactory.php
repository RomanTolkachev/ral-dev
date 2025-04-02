<?php

namespace Database\Factories;

use App\Models\RalShortInfoView;
use App\Models\NpRegulationsTnved;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NpRegulationsTnved>
 */
class NpRegulationsTnvedFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        ];
    }

    public function generate()
    {
        $links = RalShortInfoView::select('link')->distinct()->get()->toArray();
        $links = array_map(fn($item) => $item['link'], $links);
        foreach($links as $link) {
            $include = $this->generateRegulation();
            NpRegulationsTnved::factory()->create([
                'link' => $link,
                'regulation' => $this->generateRegulation(),
                'tnved' => $this->generateTnved(),
            ]);
        }
    }

    public function generateRegulation()
    {
        $faker = $this->faker;
        $regulations = "";
        for($i = 0; $i < mt_rand(1,10); $i++) {
            $regulations .= $faker->randomNumber(5, false) . ',';
        }
        return substr($regulations, 0, -1);
    }

    public function generateTnved()
    {
        $faker = $this->faker;
        $tnveds = "";
        for($i = 0; $i < mt_rand(1,10); $i++) { 
            $tnveds .= $faker->randomNumber(4, true) . ';';
        }
        return substr($tnveds, 0, -1);
    }

}
