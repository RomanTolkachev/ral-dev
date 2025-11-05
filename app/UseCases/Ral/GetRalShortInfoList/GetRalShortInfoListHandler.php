<?php

namespace App\UseCases\Ral\GetRalShortInfoList;

use App\Models\RalShortInfoView;
use App\Models\User;
use App\Services\GetTableSettings;

class GetRalShortInfoListHandler
{
    public function __construct(protected GetRalShortInfoListFilter $filter) {}

    public function execute(
        int $page,
        int $itemsPerPage,
        User | null $user,
        User $defaultUser,
        GetRalShortInfoListFilter $filter
    ): GetRalShortInfoListResource {

        $columns = GetTableSettings::for($user, $defaultUser, "ral_short_info");

        $result = RalShortInfoView::query()->with("regulationAndTnved")
            ->filter(
                $filter
            )

            ->paginate(
                page: $page,
                perPage: $itemsPerPage
            );

        $result->setCollection(
            collect($result->items())
                ->customToFlat()
                ->sortByTemplate($columns)
        );

        return new GetRalShortInfoListResource($result);
    }
}
