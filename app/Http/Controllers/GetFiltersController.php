<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfoMock;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class GetFiltersController
{

    public function __invoke()
    {
        $headers = Schema::getColumnListing('ral_short_info_mock');

        $response = [];
        foreach ($headers as $value) {
            $columnType = Schema::getColumnType('ral_short_info_mock', $value);
            $headerItemObject = new \stdClass();
            $headerItemObject->header = $value;
            $headerItemObject->headerType = $columnType;
            $headerItemObject->sortValues = new \stdClass();

            if (in_array($columnType, ['date', 'datetime'])) {
                $headerItemObject->sortValues->type = 'date';
                $headerItemObject->sortValues->min = RalShortInfoMock::min($value);
                $headerItemObject->sortValues->max = RalShortInfoMock::max($value);
            } else {
                $uniqValues = RalShortInfoMock::distinct()->pluck($value);
                $isUniqValuesHuge = count($uniqValues) > 7;
                if ($isUniqValuesHuge) {
                    $headerItemObject->sortValues->type = "huge";
                } else {
                    $headerItemObject->sortValues->type = "checkBox";
                    $headerItemObject->sortValues->checkboxValues = RalShortInfoMock::distinct()->pluck($value);
                }
            }
            $response[] = $headerItemObject;
        }

        return new JsonResponse($response);
    }
}
