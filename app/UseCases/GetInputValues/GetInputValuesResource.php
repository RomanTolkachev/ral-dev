<?php

namespace App\UseCases\GetInputValues;
use Illuminate\Http\Resources\Json\JsonResource;

class GetInputValuesResource extends JsonResource
{
    public function toArray($raw)
    {
        $res = collect($this->resource->toArray())
        ->pluck('ral_short_info_view.applicantFullName')
        ->filter()
        ->unique()
        ->values()
        ->toArray();

        return array_map(fn($item) => ['value' => $item,'label' => $item],$res);
    }
}