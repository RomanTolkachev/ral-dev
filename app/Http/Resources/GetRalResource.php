<?php

namespace App\Http\Resources;

use App\Models\NPMock;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GetRalResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $ralInfoMockAsArray = parent::toArray($request);

        if (array_key_exists('np_mocks', $ralInfoMockAsArray)) {
            unset($ralInfoMockAsArray['np_mocks']);
        }

        if ($isNpRelevant = $this->isNpRelevant(...$this->npMocks)) {
            [$lastChangeKeyOrNull, $lastChangeDateOrNull] = $this->calcLatestDateOrNull(...$this->npMocks);
            $isNpIncludedOrNull = $lastChangeKeyOrNull == "include_date" ? "Да" : "Нет";
        }

        return array_merge($ralInfoMockAsArray, [
            'is_np_relevant' => $isNpRelevant ? "Да" : "Нет",
            'is_np_included' => $isNpIncludedOrNull ?? null,
            'last_status_change_date' => $lastChangeDateOrNull ?? null, 
        ]);
    }

    private function isNpRelevant(NPMock ...$npMocks): bool 
    {
        foreach ($npMocks as $npMock) {
            if ($npMock->include_date !== null) {
                return true;
            }
        }

        return false;
    }

    private function calcLatestDateOrNull(NPMock ...$npMocks): ?array
    {
        $arr = ['include_date' => null, 'exclude_date' => null];

        foreach ($npMocks as $npMock) {
            foreach ($arr as $key => $value) {
                $arr[$key] = max($arr[$key], $npMock->$key);
            }
        }

        uasort($arr, function ($a, $b) {
            if ($a === null) return 1;
            if ($b === null) return -1;
            return strtotime($b) <=> strtotime($a);
        });

        if (true === empty(array_filter($arr))) {
            return null;
        }
        
        $key = array_key_first($arr);

        return [$key, $arr[$key]];
    }
}
