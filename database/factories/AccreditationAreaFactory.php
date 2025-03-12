<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AccreditationArea>
 */
class AccreditationAreaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $predefinedTNVEDS = ['2233', '8788', '1122', '5677', '7655', '4344', '9999', '8181'];

    protected function getRandomGost(): String {
        $gostNum = $this->faker->numerify('####');
        $gostSecondNum = $this->faker->numerify('##');
        return "{$gostNum}-{$gostSecondNum}";
    }
    
    public function definition(): array
    {
        $randomNovTNVEDS = '';
        $randomComparableTNVEDS = '';

        for ($i = 0; $i < rand(1,5); $i++) {
            $randomNovTNVEDS = $randomNovTNVEDS . $this->faker->randomElement($this->predefinedTNVEDS) .";";
        }
        for ($i = 0; $i < rand(1,5); $i++) {
            $randomComparableTNVEDS = $randomComparableTNVEDS . $this->faker->randomElement($this->predefinedTNVEDS) .";";
        }

        return [
            'nov_gosts' => $this->getRandomGost(),
            'nov_tnveds' => json_encode($randomNovTNVEDS),
            'comperable_gosts' => $this->getRandomGost(),
            'comperable_tnveds' => json_encode($randomComparableTNVEDS),
        ];
    }
}
