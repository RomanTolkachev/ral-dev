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

            if (in_array($columnType, ['date', 'datetime'])) {
                $headerItemObject->sortValues->type = 'date';
                $headerItemObject->sortValues->min = $modelClass::min($columnName);
                $headerItemObject->sortValues->max = $modelClass::max($columnName);
            } else {
                $uniqValues = $modelClass::distinct()->pluck($columnName);
                $isUniqValuesHuge = count($uniqValues) > 7;
                if ($isUniqValuesHuge) {
                    $headerItemObject->sortValues->type = "huge";
                } else {
                    $headerItemObject->sortValues->type = "checkBox";
                    $headerItemObject->sortValues->checkboxValues = $modelClass::distinct()->pluck($columnName);
                }
            }
            $filters[] = $headerItemObject;
        }
        return $filters ?? [];
    }
}
