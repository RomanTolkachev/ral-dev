<?php

namespace App\UseCases\GetInputValues;

use App\Models\AccreditationArea;
use Illuminate\Database\Eloquent\Builder;

class GetInputValuesHandler
{
    public function execute(array $query)
    {
        $table = $query["where"];
        $column = $query["column"];
        $pattern = $query["like"];

        if ($table === 'accreditation_area') {
            $result =  AccreditationArea::whereHas("ralShortInfoView", function (Builder $builder) use ($column, $pattern) {
                $builder->whereLike($column, "%$pattern%");
            })->with("ralShortInfoView:id,applicantFullName")->get();
        }

        return new GetInputValuesResource($result);
    }

}
