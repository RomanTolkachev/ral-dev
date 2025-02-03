<?php

namespace App\Services;

class TableFilterService
{
    public function getFiltersFor(string $modelClass): array
    {
        foreach ($modelClass::getPublicHeaders() as $columnName) {
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
        $actualFilters = ['new_status_AL', 'nameType', 'status_change_date', 'regDate', 'fullText']; // тут актуальные фильтры

        $filters = array_filter($filters, function ($item) use ($actualFilters) {
            return in_array($item->header, $actualFilters);
        });

        $filters = array_values($filters);

        // добавление полнотекстового поиска
        $fullText = new \stdClass();
        $fullText->header = "fullText";
        $fullText->sortValues = new \stdClass();
        $fullText->sortValues->type = "huge";
        $filters = [$fullText, ...$filters];

        return $filters ?? [];
    }
}
