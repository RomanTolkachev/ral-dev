<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Collection;
use Closure;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Collection::macro(
            "toFlatFilteredAndSorted",
            /**
             * Функция разворачивает связанные модели в один уровень с родительской
             * если ключ в связанной повторяется, то добавится префикс с именем вложенной модели
             * затем происходит сортировка ключей в соответствии с параметром
             * @param array $template
             * @return \Illuminate\Support\Collection
             */
            function (array $template): Collection {
                return $this->map(function ($item) use ($template) {
                    $result = [];
                    $existingKeys = array_keys($item);

                    // Функция для обработки вложенных массивов
                    $processNested = function ($array, $parentKey = null) use (&$result, &$existingKeys, &$processNested) {
                        foreach ($array as $key => $value) {
                            // Определяем конечный ключ
                            $finalKey = $parentKey ? 
                                (in_array($key, $existingKeys) ? $parentKey.'__'.$key : $key) : 
                                $key;

                            if (is_array($value)) {
                                // Если значение - массив, обрабатываем рекурсивно
                                $processNested($value, $finalKey);
                            } else {
                                // Конкатенируем значения с одинаковыми ключами
                                $value = (string)($value ?? '');
                                if (array_key_exists($finalKey, $result)) {
                                    $result[$finalKey] .= ' // ' . $value;
                                } else {
                                    $result[$finalKey] = $value;
                                }
                            }
                        }
                    };

                    // Обрабатываем основной элемент
                    foreach ($item as $key => $value) {
                        if (is_array($value)) {
                            $processNested($value, in_array($key, $existingKeys) ? $key : null);
                        } elseif (in_array($key, $template)) {
                            $result[$key] = $value;
                        }
                    }

                    // Сортируем по шаблону
                    return collect($template)
                        ->mapWithKeys(fn($k) => [$k => $result[$k] ?? null]);
                });
            }
        );
    }
}
