<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class GetAccreditationAreaListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $result = parent::toArray($request);

        # чистим не нужное
        unset($result['links']);
        unset($result['path']);
        unset($result['first_page_url']);
        unset($result['last_page_url']);
        unset($result['next_page_url']);
        unset($result['prev_page_url']);

        return $result;
    }
}