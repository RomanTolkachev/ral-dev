<?php

namespace Database\Factories;

use App\Models\NP;
use App\Models\RalShortInfoView;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NP>
 */

class NPFactory extends Factory
{
    protected $model = NP::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'link' => null,
            'exclude_id' => null, 
            'exclude_date' => null, 
            'exclude_doc' => null, 
            'include_id' => null, 
            'include_date' => null, 
            'include_doc' => null, 
        ];
    }

    public function generatePN() {
        $links = RalShortInfoView::select('link')->distinct()->get()->toArray();
        $links = array_map(fn($item) => $item['link'], $links);
        foreach($links as $link) {
            $include = $this->generateinClude();
            $exclude = $this->generateExclude($include['date']);
            NP::factory()->create([
                'link' => $link,
                'exclude_id' => $exclude['id'],
                'exclude_date' => $exclude['date'],
                'exclude_doc' => $exclude['doc'],
                'include_id' => $include['id'],
                'include_date' => $include['date'],
                'include_doc' => $include['doc'],
            ]);
        }
    }

    protected function generateLink() {
        $links = RalShortInfoView::select('link')->distinct()->get()->toArray()[0];
        $randomKey = array_rand($links);
        return $links[$randomKey];
    }

    protected function generateExclude($includeDate) {
        $faker = $this->faker;
        $variants = [
            "date" => 1,
            "null" => 9,
        ];
        $date = $this->getRandByHisWeight($variants);
        $excludedate = $date === "null" ? null : $faker->dateTimeBetween($includeDate, 'now')->format('Y-m-d');
        $excludeId = $excludedate ? $faker->randomNumber(6, true) : null;
        $excludeDoc = $date === "null" ? null : $faker->randomLetter . $faker->randomNumber(2, true) . $faker->randomLetter;
        return [
            'date' => $excludedate,
            'id' => $excludeId,
            'doc' => $excludeDoc,
        ];
    }

    protected function generateInclude() {
        $faker = $this->faker;
        $variants = [
            "date" => 1,
            "null" => 0,
        ];
        $date = $this->getRandByHisWeight($variants);
        $inCludedate = $date === "null" ? null :$faker->dateTimeBetween('-3 years')->format('Y-m-d');
        $inCludeId = $inCludedate ? $faker->randomNumber(6, true) : null;
        $inCludeDoc = $date === "null" ? null : $faker->randomLetter . $faker->randomNumber(2, true) . $faker->randomLetter;
        return [
            'date' => $inCludedate,
            'id' => $inCludeId,
            'doc' => $inCludeDoc,
        ];
    }
    

    protected function getRandByHisWeight(array $variants): mixed
    {
        if (empty($variants) or !empty(array_filter(
            $variants,
            fn($value)
            => false === is_numeric($value) or $value < 0
        ))) throw new \InvalidArgumentException(
            'Передан пустой массив вариантов или некорректные данные.'
        );

        # нормализируем веса каждого варианта
        $sumOfAllWeights = array_sum($variants);

        foreach ($variants as $variant => $weight) {
            $variants[$variant] = $weight / $sumOfAllWeights;
        }

        # получаем случайное значение от 0 до 1
        $randomNumber = mt_rand() / mt_getrandmax();

        # сортируем веса в порядке возрастания
        asort($variants);

        # выбираем элемент методом рулетки
        $cumulativeProbability = 0;

        foreach ($variants as $variant => $probability) {
            $cumulativeProbability += $probability;
            if ($cumulativeProbability >= $randomNumber) {
                return $variant;
            }
        }

        # по умолчанию возвращаем последний вариант
        return array_key_last($variants);
    }
}
