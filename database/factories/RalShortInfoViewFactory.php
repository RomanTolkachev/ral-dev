<?php

namespace Database\Factories;

use App\Models\RalShortInfoView;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class RalShortInfoViewFactory extends Factory
{
    protected $model = RalShortInfoView::class;

    public function definition(): array
    {
        $credentials = $this->generateCredentials();
        $statusOldValueOrNull = $this->generateOldStatusOrNull();
        $statusChangeDateOrNull = is_null($statusOldValueOrNull)
            ? null : Carbon::parse($this->faker->dateTimeBetween('-3 years'))->toIso8601ZuluString();
        return [
            'link' => $credentials['link'],
            'RegNumber' => $credentials['regNumber'],
            'old_status_AL' => $statusOldValueOrNull,
            'new_status_AL' => $this->generateNewStatusOrNull(),
            'status_change_date' => $statusChangeDateOrNull,
            'nameType' => $this->generateNameTypeOrNull(),
            'nameTypeActivity' => $this->generateNameTypeActivityOrNull(),
            'regDate' => $this->faker->dateTimeBetween('-10 years'),
            'fullName' => $credentials['fullName'],
            'address' => $this->faker->address(),
            'applicantINN' => $this->generateApplicantINN(),
            'applicantFullName' => $credentials['fullName'],
            'oaDescription' => $this->faker->paragraph(mt_rand(1, 15)),
            'NPstatus' => $this->generateNpStatusOrNull(),
            // 'id' => $this->faker->unique()->randomNumber(9),
            'NP_status_change_date' => null,
            'regulations' => '222,333,444',
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

    protected function generateCredentials(): array
    {
        $fullNames = [
            'ООО Ромашка',
            'ООО Помидорка',
            'ООО Огурчик',
            'ООО Оливка',
            'ООО Рожки',
            'ООО Копытца',
            'ООО Альфа',
            'ООО Бета',
            'ООО Гамма',
            'ООО Сигма',
        ];

        $labs = [
            'ООО Испытательная лаборатория',
            'ООО Тестирование',
            'ООО Мега лаборатория',
            'ООО ПроТест',
        ];

        return
            [
                'link' => 'https://pub.fsa.gov.ru/ral/view/' . $this->faker->randomNumber(9, true),
                'regNumber' => 'RAL.01010101' . $this->faker->randomNumber(3, true),
                'fullName' => $this->faker->randomElement($fullNames),
                'applicantFullName' => $this->faker->randomElement($labs),
            ];
    }

    protected function generateOldStatusOrNull(): ?string
    {
        $nullVariantKey = '5e788b2d28fc03f6ddbb36747bfeb808';

        $variants = [
            'Действует' => 50,
            'Архивный' => 50,
            'Прекращен' => 50,
            'Приостановлен' => 50,
            $nullVariantKey => 800
        ];

        $result = $this->getRandByHisWeight($variants);

        return $result === $nullVariantKey ? null : $result;
    }

    protected function generateNewStatusOrNull(): ?string
    {
        $nullVariantKey = '5e788b2d28fc03f6ddbb36747bfeb808';

        $variants = [
            'Действует' => 50,
            'Архивный' => 50,
            'Прекращен' => 50,
            'Приостановлен' => 50,
            $nullVariantKey => 50
        ];

        $result = $this->getRandByHisWeight($variants);

        return $result === $nullVariantKey ? null : $result;
    }

    protected function generateNameTypeOrNull(): ?string
    {
        $nullVariantKey = '5e788b2d28fc03f6ddbb36747bfeb808';
        $variants = [
            'ИЛ' => 50,
            'ОС' => 50,
            'ОС по продукции (услугам)' => 50,
            'ОИ типа C' => 50,
            'МЛ' => 50,
            'КЛ' => 50,
            'ОС по персоналу' => 50,
            'ОИ типа A' => 50,
            $nullVariantKey => 0
        ];

        $result = $this->getRandByHisWeight($variants);

        return $result === $nullVariantKey ? null : $result;
    }

    protected function generateNameTypeActivityOrNull(): ?string
    {
        $nullVariantKey = '5e788b2d28fc03f6ddbb36747bfeb808';

        $variants = [
            'Испытания продукции' => 50,
            'Испытания' => 50,
            'Окружающая среда' => 50,
            $nullVariantKey => 800
        ];

        $result = $this->getRandByHisWeight($variants);

        return $result === $nullVariantKey ? null : $result;
    }

    protected function generateApplicantINN(): string
    {
        $variants = ['77', '99', '50', '52', '14'];

        return $this->faker->randomElement($variants)
            . $this->faker->randomNumber(8, true);
    }

    // protected function generateApplicantFullName(): string
    // {
    //     return $this->faker->address();
    // }

    protected function generateNpStatusOrNull(): ?string
    {
        $nullVariantKey = '5e788b2d28fc03f6ddbb36747bfeb808';

        $variants = [
            'да' => 50,
            'нет' => 50,
            $nullVariantKey => 800
        ];

        $result = $this->getRandByHisWeight($variants);

        return $result === $nullVariantKey ? null : $result;
    }
}
