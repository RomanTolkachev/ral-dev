<?php

namespace App\Http\Filters;

use App\Models\RalShortInfoMock;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;

class RalFilter extends AbstractFilter
{

    protected $model;
    // protected $request;
    public function __construct(RalShortInfoMock $model, FormRequest $request)
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
    protected function link(array $value): Builder
    {
        $query = $this->builder;
        foreach ($value as $item) {
            $query = $query->Where('link', 'like', "%$item%");
        }
        return $query;
    }

    protected function RegNumber(array $value): Builder
    {
        $query = $this->builder;

        foreach ($value as $item) {
            $query = $query->Where('RegNumber', 'like', "%$item%");
        }
        return $query;
    }

    protected function oldStatusAL($value): Builder
    {
        $query = $this->builder->whereIn('old_status_AL', $value);

        if (in_array('false', $value, true)) {
            $query->WhereNull('old_status_AL');
        }
        return $query;
    }

    protected function newStatusAL($value): Builder
    {
        $query =  $this->builder->whereIn('new_status_AL', $value);
        if (in_array('false', $value, true)) {
            $query->orWhereNull('new_status_AL');
        }
        return $query;
    }

    protected function statusChangeDate(array $value): Builder
    {
        return $this->builder->whereBetween('status_change_date', $value);
    }

    protected function nameType(array $value): Builder
    {
        return $this->builder->whereIn('nameType', $value);
    }

    protected function nameTypeActivity(string $value): Builder
    {
        return $this->builder->whereIn('nameTypeActivity', $value);
    }

    protected function regDate(string $value): Builder
    {
        return $this->builder->whereIn('regDate', $value);
    }

    protected function fullName(string $value): Builder
    {
        return $this->builder->whereIn('fullName', $value);
    }

    protected function address(string $value): Builder
    {
        return $this->builder->whereIn('address', $value);
    }

    protected function applicantINN(string $value): Builder
    {
        return $this->builder->whereIn('applicantINN', $value);
    }

    protected function applicantFullName(string $value): Builder
    {
        return $this->builder->whereIn('applicantFullName', $value);
    }

    protected function oaDescription(string $value): Builder
    {
        return $this->builder->whereIn('oaDescription', $value);
    }

    protected function NPstatus(array $value): Builder
    {
        return $this->builder->whereIn('NPstatus', $value);
    }

    protected function id(int $value): Builder
    {
        return $this->builder->whereIn('id', $value);
    }

    protected function NPStatusChangeDate(array $value): Builder
    {
        return $this->builder->whereBetween('NP_status_change_date', $value);
    }

    protected function fullText(array $value): Builder
    {
        // $query = $this->builder;
        // dd($query);
        $searchRes = $this->model::search($value[0])->get();
        $ids = $searchRes->pluck('id')->toArray();
        return $this->builder->whereIn('id', $ids);
    }
}
