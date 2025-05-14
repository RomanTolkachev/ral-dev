<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use App\Models\AccreditationArea;

class GetAccrediTationAreaListHandler
{
    public function __construct(protected GetAccreditationAreaListFilter $filter) {}

    public function execute(int $page, int $itemsPerPage, array $columns, array $gost, array $tnved): GetAccreditationAreaListResource
    {
        $query = AccreditationArea::query();

        foreach ($columns as $column) {
            switch ($column) {
                default:
                    $query->addSelect($column);
            }
        }

        $result = $query->filter(
            $this->filter
        )

        ->paginate(
            page: $page,
            perPage: $itemsPerPage
        );
      
        foreach($result as $key => $item)
        {
            $hasGost = $gost === [] ? false : stripos($item["gost"], $gost[0]) === 0;
            $hasTnVed = $tnved === [] ? false : stripos($item["tn_ved"], $tnved[0]) === 0;

            if ($hasGost && $hasTnVed) {
                $result[$key]["match_status"] = 'полное';
            }
            if ($hasGost && !$hasTnVed) {
                $result[$key]["match_status"] = 'частичное';
            }
            if (!$hasGost && $hasTnVed) {
                $result[$key]["match_status"] = 'частичное';
            }
            if (!$hasGost && !$hasTnVed) {
                $result[$key]["match_status"] = 'не применимо';
            }
        }

        return new GetAccreditationAreaListResource($result);
    }

}