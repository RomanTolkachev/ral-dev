<?php

namespace App\UseCases\GetRalShortInfoList;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GetRalShortInfoListResource extends JsonResource
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
