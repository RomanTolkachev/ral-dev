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
            $query = $query->Where('gost', 'like', "%$item%");
        }
        return $query;
    }

    protected function tnVed(array $value): Builder
    {
        $query = $this->builder;
        foreach ($value as $item) {
            $query = $query->Where('tn_ved', 'like', "%$item%");
        }
        return $query;
    }
}
