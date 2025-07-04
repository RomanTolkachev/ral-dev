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

        Collection::macro('customToFlat', function () {

                            // dd($this);
            return $this->map(function ($item) {
                $result = [];

                $processNested = function ($array, $parentKey = null) use (&$result, &$processNested) {
                    if (!is_array($array)) return;

                    // Обработка списков у связанных моделей - конкатенируем через //
                    if (array_keys($array) === range(0, count($array) - 1)) {
                        $concatenated = [];
                        foreach ($array as $item) {
                            if (!is_array($item)) continue;
                            foreach ($item as $k => $v) {
                                $value = (string)($v ?? '');
                                $concatenated[$k] = isset($concatenated[$k])
                                    ? $concatenated[$k] . ' // ' . $value
                                    : $value;
                            }
                        }
                        foreach ($concatenated as $k => $v) {
                            $result["{$parentKey}__{$k}"] = $v;
                        }
                        return;
                    }

                    // Обработка ассоциативных массивов - добавляем связанным моделям префикс __ и переносим на верхний уровень
                    foreach ($array as $k => $v) {
                        $newKey = $parentKey ? "{$parentKey}__{$k}" : $k;
                        if (is_array($v)) {
                            $processNested($v, $newKey);
                        } else {
                            $result[$newKey] = (string)($v ?? '');
                        }
                    }
                };

                foreach ($item as $k => $v) {
                    if (is_array($v)) {
                        $processNested($v, $k);
                    } else {
                        $result[$k] = $v;
                    }
                }



                return $result;
            });
        });

        // Сортирует результат по заданному шаблону
        Collection::macro('sortByTemplate', function (array $template) {
            return $this->map(function ($item) use ($template) {
                return collect($template)
                    ->mapWithKeys(fn($k) => [$k => $item[$k] ?? null]);
            });
        });
    }
}
