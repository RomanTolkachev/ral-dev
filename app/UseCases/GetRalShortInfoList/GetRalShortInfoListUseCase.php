<?php

namespace App\UseCases\GetRalShortInfoList;

use App\Models\RalShortInfoView;

class GetRalShortInfoListUseCase
{
    public function __construct(protected GetRalShortInfoListFilter $filter) {}

    public function execute(int $page, int $itemsPerPage, array $columns): GetRalShortInfoListResource
    {
        $query = RalShortInfoView::query()->leftJoin('np_regulations_tnveds', 'np_regulations_tnveds.link', '=', 'ral_short_info_view.link');

        foreach ($columns as $column) {
            switch ($column) {
                default:
                    $query->addSelect($column);
            }
        }
        // dd($query);
        $result = $query->filter(
            $this->filter
        )
        
        // ->toSql();

        // dd($result);
        
        ->paginate(
            page: $page,
            perPage: $itemsPerPage
        );

        return new GetRalShortInfoListResource($result);
    }
}