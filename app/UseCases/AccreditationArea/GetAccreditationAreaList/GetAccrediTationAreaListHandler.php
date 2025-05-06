<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use App\Models\AccreditationArea;

class GetAccrediTationAreaListHandler
{
    public function __construct(protected GetAccreditationAreaListFilter $filter) {}

    public function execute(int $page, int $itemsPerPage, array $columns): GetAccreditationAreaListResource
    {
        // dd($itemsPerPage);
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

        return new GetAccreditationAreaListResource($result);
    }

}