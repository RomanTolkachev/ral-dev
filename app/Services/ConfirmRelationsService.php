<?php

namespace App\Services;

class ConfirmRelationsService
{

    public function filterRelatedColumns(array $rawColumns): array
    {
        return array_filter($rawColumns, fn ($item) => !str_contains($item, '__'));
    }

    public function prepareRalations(array $columns): array
    {
        $relationTables = [];
        $relations = [];

        foreach ($columns as $item) {
            if (str_contains($item, '__')) {
                [$relation, $field] = explode('__', $item, 2);
                $relationTables[$relation][] = $field;
            }
        }

      
        foreach ($relationTables as $relation => $field) {
            $string = $relation . ":id," . implode(",", $field);
            $relations[] = $string;
        }

        return $relations;
    }
}
