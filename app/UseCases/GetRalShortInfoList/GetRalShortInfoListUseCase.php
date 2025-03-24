<?php

namespace App\UseCases\GetRalShortInfoList;

use App\Http\Filters\RalFilter;
use App\Models\RalShortInfo;

class GetRalShortInfoListUseCase
{
    public function __construct(protected RalFilter $filter) {}

    public function execute(int $page, int $itemsPerPage, array $columns): GetRalShortInfoListResource
    {
        $query = RalShortInfo::query();

        foreach ($columns as $column) {
            switch ($column) {
                case 'NPstatus':
                    $query->modifyNPStatus();
                    break;
                case 'NP_status_change_date':
                    $query->ModifyNPStatusChangeDate();
                    break;
                default:
                    $query->addSelect($column);
            }
        }

        $result = $query->filter(
            $this->filter
        )->paginate(
            page: $page,
            perPage: $itemsPerPage
        );

        return new GetRalShortInfoListResource($result);
    }
}