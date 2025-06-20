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
                /** @var \Illuminate\Support\Collection $collection */
                $collection = $this;

                return $collection->map(function ($item) use ($template) {
                    $result = [];
                    foreach ($item as $key => $value) {
                        if (is_array($value)) {
                            // Обрабатываем вложенные массивы
                            $filtered = collect($value)->only($template)->toArray();

                            foreach ($filtered as $fKey => $fValue) {
                                if (array_key_exists($fKey, $item)) {
                                    $result[(string) $key . "__" . $fKey] = $fValue;
                                    // dump($key);
                                } else {
                                    $result[$fKey] = $fValue;
                                }
                            }
                        } elseif (in_array($key, $template)) {
                            $result[$key] = $value;
                        }
                    }

                    // Упорядочиваем ключи в соответствии с $only
                    return collect($template)->mapWithKeys(fn($k) => [$k => $result[$k] ?? null]);
                });
            }
        );
    }
}
