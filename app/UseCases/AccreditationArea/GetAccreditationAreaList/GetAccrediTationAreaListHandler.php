<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use App\Models\AccreditationArea;
use App\Services\ConfirmRelationsService;

class GetAccrediTationAreaListHandler
{
    public function __construct(protected GetAccreditationAreaListFilter $filter, protected ConfirmRelationsService $relations) {}

    public function execute(int $page, int $itemsPerPage, array $columns, array $gost, array $tnved): GetAccreditationAreaListResource
    {

        $query = AccreditationArea::with($this->relations->prepareRalations($columns));
        $noRelationsColumns = $this->relations->filterRelatedColumns($columns);

        foreach ($noRelationsColumns as $column) {
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
                $result[$key]["match_status"] = 'совпадение по ГОСТ';
            }
            if (!$hasGost && $hasTnVed) {
                $result[$key]["match_status"] = 'совпадение по ТН ВЭД';
            }
            if (!$hasGost && !$hasTnVed) {
                $result[$key]["match_status"] = 'не применимо';
            }
        }

        return new GetAccreditationAreaListResource($result);
    }

}