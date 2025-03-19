<?php

namespace App\UseCases\GetRalShortInfoList;

use App\Http\Filters\RalFilter;
use App\Models\RalShortInfoMock;

class GetRalShortInfoListUseCase
{
    public function __construct(protected RalFilter $filter) {}

    public function execute(int $page, int $itemsPerPage, array $columns): GetRalShortInfoListResource
    {
        $query = RalShortInfoMock::query();

        foreach ($columns as $column) {
            switch ($column) {
                case 'NPstatus':
                    $query->modifyNPStatus();
                    break;
                default:
                    $query->addSelect($column);
            }
        }

        $result = $query->filter(
            $this->filter
        )
        // $result->toSQL();
        // dd($result->toSQL());
        ->paginate(
            page: $page,
            perPage: $itemsPerPage
        );

        return new GetRalShortInfoListResource($result);
    }
}