<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class GetAccreditationAreaListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $result = parent::toArray($request);

        $userColumns = $request->query('user_columns', []);

        unset($result['links']);
        unset($result['path']);
        unset($result['first_page_url']);
        unset($result['last_page_url']);
        unset($result['next_page_url']);
        unset($result['prev_page_url']);

        $result['data'] = array_map(function (array $data) {

            if (!isset($data['ral_short_info_view']) || !is_array($data['ral_short_info_view'])) {
                unset($data['ral_short_info_view']);
                unset($data['id_ral']);
                return $data;
            }

            foreach ($data['ral_short_info_view'] as $key => $value) {
                if ($key === 'id') {
                    continue;
                }
                $data['ralShortInfoView' . "__" . $key] = $value;
            }

            unset($data['ral_short_info_view']);
            unset($data['id_ral']);

            return $data;
        }, $result['data']);

        $orderedData = collect($result['data'])->map(function ($item) use ($userColumns) {
            $orderedItem = [];

            foreach ($userColumns as $column) {
                if (array_key_exists($column, $item)) {
                    $orderedItem[$column] = $item[$column];
                }
            }

            return $orderedItem;
        });

        $result['data'] = $orderedData->toArray();

        return $result;
    }
}
