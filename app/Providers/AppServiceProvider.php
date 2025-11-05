<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Collection;
use Closure;


/**
 * @method Illuminate\Support\Collection map
 */
class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Collection::macro('customToFlat', function () {
            return $this->map(function ($item) {
                // Преобразуем модель в массив
                $array = $item->toArray();
                $result = [];

                $processNested = function ($nestedArray, $parentKey = null) use (&$result, &$processNested) {
                    if (!is_array($nestedArray)) return;

                    // Обработка списков отношений
                    if (array_is_list($nestedArray)) {
                        $concatenated = [];
                        foreach ($nestedArray as $nestedItem) {
                            if (!is_array($nestedItem)) continue;
                            foreach ($nestedItem as $k => $v) {
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

                    // Обработка обычных массивов
                    foreach ($nestedArray as $k => $v) {
                        $newKey = $parentKey ? "{$parentKey}__{$k}" : $k;
                        if (is_array($v)) {
                            $processNested($v, $newKey);
                        } else {
                            $result[$newKey] = (string)($v ?? '');
                        }
                    }
                };

                foreach ($array as $k => $v) {
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
