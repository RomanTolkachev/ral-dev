<?php

namespace App\Services;

class TableFilterService
{
    public function getFiltersFor(string $modelClass, array $userFilters): array
    {
        $headers = array_filter(
            $modelClass::getPublicHeaders(),
            fn($item) => in_array($item, $userFilters)
        );

        foreach ($headers as $columnName) {
            $columnType = $modelClass::getAttributeType($columnName);
            $headerItemObject = new \stdClass();
            $headerItemObject->header = $columnName;
            $headerItemObject->headerType = $columnType;
            $headerItemObject->sortValues = new \stdClass();

            if (in_array($columnType, ['date', 'datetime'])) {
                $headerItemObject->sortValues->type = 'date';
                $min_max = $modelClass::selectRaw("min($columnName) as min")->selectRaw("max($columnName) as max")->get()->toArray();
                $headerItemObject->sortValues->min = $min_max[0]["min"];
                $headerItemObject->sortValues->max = $min_max[0]["max"];
            } else {
                $uniqValues = $modelClass::distinct()->pluck($columnName);
                $isUniqValuesHuge = count($uniqValues) > 20;
                if ($isUniqValuesHuge) {
                    $headerItemObject->sortValues->type = "huge";
                } else {
                    $headerItemObject->sortValues->type = "checkBox";
                    $headerItemObject->sortValues->checkboxValues = $uniqValues;
                }
            }
            $filters[] = $headerItemObject;
        }

        $filters = array_values($filters);

        // добавление полнотекстового поиска
        $fullText = new \stdClass();
        $fullText->header = "fullText";
        $fullText->sortValues = new \stdClass();
        $fullText->sortValues->type = "huge";

        // добавление поиска для регуляций
        $regulations = new \stdClass();
        $regulations->header = "regulations";
        $regulations->sortValues = new \stdClass();
        $regulations->sortValues->type = "huge";

        // добавление поиска для ТН ВЭД
        $tnved = new \stdClass();
        $tnved->header = "tnved";
        $tnved->sortValues = new \stdClass();
        $tnved->sortValues->type = "huge";

        $filters = [$fullText, ...$filters, $regulations, $tnved];


        return $filters ?? [];
    }
}
