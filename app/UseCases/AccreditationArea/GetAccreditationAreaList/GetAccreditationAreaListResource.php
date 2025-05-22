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

        $result['data'] = array_map(function (array $data) {
            if (!array_key_exists('ral_short_info_view', $data)){
                return $data;
            }
            if (!is_array($data['ral_short_info_view'])) {
                unset($data['ral_short_info_view']);
            return $data;
            }
            if (!isset($data['ral_short_info_view']['fullName'])) {
                unset($data['ral_short_info_view']);
            return $data;
            }
            $data['id_ral'] = $data['ral_short_info_view']['fullName'];
            unset($data['ral_short_info_view']);
            return $data;
        }, $result['data']);

        return $result;
    }
}
