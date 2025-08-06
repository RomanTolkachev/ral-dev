<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use App\Models\AccreditationArea;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Filters\AbstractFilter;

class GetAccreditationAreaListFilter extends AbstractFilter
{
    protected AccreditationArea $model;

    public function __construct(AccreditationArea $model, GetAccreditationAreaListRequest $request)
    {
        $this->model = $model;
        parent::__construct($request);
    }

    protected function fullGost(array $values): Builder
    {
        return $this->builder->where(function ($q) use ($values) {
            foreach ($values as $value) {
                $q->orWhere('full_gost', 'like', "%$value%");
            }
        });
    }

    protected function tnVed(array $values): Builder
    {
        return $this->builder->where(function ($q) use ($values) {
            foreach ($values as $item) {
                $q->orWhere('tn_ved', 'like', "%$item%");
            }
        });
    }

    protected function sourceFileLabel(array $value): Builder
    {
        return $this->builder->whereIn('source_file_label', $value);
    }

    protected function ralShortInfoViewFullName(array $values): Builder
    {
        return $this->builder->whereHas("ralShortInfoView", function($query) use($values) {
            $query->where(function ($q) use ($values) {
                foreach ($values as $value) {
                    $q->orWhere('applicantFullName', 'like', "%{$value}%");
                }
            });
        });
    }

    protected function ralShortInfoViewRegNumber(array $values): Builder
    {
        return $this->builder->whereHas("ralShortInfoView", function($query) use($values) {
            $query->where(function ($q) use ($values) {
                foreach ($values as $value) {
                    $q->orWhere('RegNumber', 'like', "%{$value}%");
                }
            });
        });
    }
}
