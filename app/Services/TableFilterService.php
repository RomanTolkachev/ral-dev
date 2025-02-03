<?php

namespace App\Services;

class TableFilterService
{
    public function getFiltersFor(string $modelClass, array $userFilters): array
    {
        $publicHeaders = $modelClass::getPublicHeaders();
        $headers = array_filter($publicHeaders, function($item) use ($userFilters) {
            return in_array($item, $userFilters);
        });
        foreach ($headers as $columnName) {
            $columnType = $modelClass::getAttributeType($columnName);
            $headerItemObject = new \stdClass();
            $headerItemObject->header = $columnName;
            $headerItemObject->headerType = $columnType;
            $headerItemObject->sortValues = new \stdClass();

            if (in_array($columnType, ['date', 'datetime']) || $columnName === 'regDate') {
                $headerItemObject->sortValues->type = 'date';
                $headerItemObject->sortValues->min = $modelClass::min($columnName);
                $headerItemObject->sortValues->max = $modelClass::max($columnName);
            } else {
                $uniqValues = $modelClass::distinct()->pluck($columnName);
                $isUniqValuesHuge = count($uniqValues) > 20;
                if ($isUniqValuesHuge) {
                    $headerItemObject->sortValues->type = "huge";
                } else {
                    $headerItemObject->sortValues->type = "checkBox";
                    $headerItemObject->sortValues->checkboxValues = $modelClass::distinct()->pluck($columnName);
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
        $filters = [$fullText, ...$filters];

        // dd($filters);

        return $filters ?? [];
    }
}
