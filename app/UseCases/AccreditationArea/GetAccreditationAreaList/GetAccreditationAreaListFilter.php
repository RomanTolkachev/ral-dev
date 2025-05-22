<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use App\Models\AccreditationArea;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Filters\AbstractFilter;


class GetAccreditationAreaListFilter extends AbstractFilter
{

    protected $model;
    // protected $request;
    public function __construct(AccreditationArea $model, GetAccreditationAreaListRequest $request)
    {
        $this->model = $model;
        parent::__construct($request);
        // $this->request = $request;
    }

    /**
     * Фильтрация по Ссылке
     *
     * @param array $value
     * @return Builder
     */
    protected function gost(array $value): Builder
    {
        $query = $this->builder;
        foreach ($value as $item) {
            $query = $query->orWhere('gost', 'like', "$item%");
        }
        return $query;
    }

    protected function tnVed(array $value): Builder
    {
        $query = $this->builder;
        foreach ($value as $item) {
            $query = $query->orWhere('tn_ved', 'like', "%$item%");
        }
        return $query;
    }
    protected function sourceFileLabel(array $value): Builder
    {
        $query = $this->builder;
        foreach ($value as $item) {
            $query = $query->orWhere('source_file_label', '=', $item);
        }
        return $query;
    }
    protected function idRal(array $value): Builder
    {
        $query = $this->builder;
        $query = $query->whereHas('ralShortInfoView', function (Builder $q) use ($value) {
            $q->where(function ($subQuery) use ($value) {
                foreach ($value as $item) {
                    $subQuery->orWhere('fullName', 'like', "%$item%");
                }
            });
        });

        return $query;
    }
}
