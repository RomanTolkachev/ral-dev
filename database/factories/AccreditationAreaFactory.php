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
    protected $predefinedCharacteristic = ['прочность', 'напряжение', 'гибкость', 'запах', 'термоустойчивость', 'размер'];

    protected function getRandomGost(): String {
        $gostNum = $this->faker->numerify('####');
        $gostSecondNum = $this->faker->numerify('##');
        return "{$gostNum}-{$gostSecondNum}";
    }
    
    public function definition(): array
    {
        return [
            "source_row" => $this->faker->numberBetween(1, 20),
            "gost" => $this->getRandomGost(),
            "gost_object" => "описание госта",
            "okpd" => $this->faker->numberBetween(100, 120) . $this->faker->numberBetween(1, 20),
            "tn_ved" => $this->faker->randomElement($this->predefinedTNVEDS),
            "characteristic" => $this->faker->randomElement($this->predefinedCharacteristic),
            "characteristic_range" => $this->faker->sentence(rand(3, 5)),
            "source_page" => $this->faker->numberBetween(1, 300),
            "id_ral" => $this->faker->numberBetween(1, 300),
            "source_file" => "название источника файла",
        ];
    }
}
