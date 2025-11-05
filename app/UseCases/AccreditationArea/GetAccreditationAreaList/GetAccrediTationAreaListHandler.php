<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use App\Models\AccreditationArea;
use App\Models\User;
use App\Services\GetTableSettings;

class GetAccrediTationAreaListHandler
{

    public function execute(
        int $page,
        int $itemsPerPage,
        User | null $user,
        User $defaultUser,
        GetAccreditationAreaListFilter $filter
    ): GetAccreditationAreaListResource {

        $model = AccreditationArea::query();

        $columns = GetTableSettings::for($user, $defaultUser, "accreditation_area");

        $result = $model->filter(
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

        // foreach ($result as $key => $item) {
        //     $hasGost = $gost === [] ? false : stripos($item["full_gost"], $gost[0]) === 0;
        //     $hasTnVed = $tnved === [] ? false : stripos($item["tn_ved"], $tnved[0]) === 0;

        //     if ($hasGost && $hasTnVed) {
        //         $result[$key]["match_status"] = 'полное';
        //     }
        //     if ($hasGost && !$hasTnVed) {
        //         $result[$key]["match_status"] = 'совпадение по ГОСТ';
        //     }
        //     if (!$hasGost && $hasTnVed) {
        //         $result[$key]["match_status"] = 'совпадение по ТН ВЭД';
        //     }
        //     if (!$hasGost && !$hasTnVed) {
        //         $result[$key]["match_status"] = 'не применимо';
        //     }
        // }

        return new GetAccreditationAreaListResource($result);
    }
}
