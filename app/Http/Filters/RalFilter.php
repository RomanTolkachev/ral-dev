<?php

namespace App\Http\Filters;

use App\Models\RalShortInfoMock;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;


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
        if (in_array("Пустые", $value, true)) {
            $query->orWhereNull('new_status_AL');
        }
        return $query;
    }

    protected function statusChangeDate(array $value): Builder
    {
        switch (true) {
            case empty($value[0]) && empty($value[1]): 
                return $this->builder;
            case (empty($value[0]) && !empty($value[1])):
                return $this->builder->where('status_change_date', '<', $value[1]);
            case (!empty($value[0]) && empty($value[1])):
                return $this->builder->where('status_change_date', '>', $value[0]);
            default: 
                return $this->builder->whereBetween('status_change_date', $value);
        }

        // return $this->builder->whereRaw('status_change_date BETWEEN CONVERT(datetime, ?) AND CONVERT(datetime, ?)', $value);
        
        // для msSql
        // if (empty($value[0]) && empty($value[1])) {
        //     return $this->builder;
        // } elseif (empty($value[0]) && !empty($value[1])) {
        //     return $this->builder->whereRaw('status_change_date < CONVERT(datetime, ?)', [$value[1]]);
        // } elseif (!empty($value[0]) && empty($value[1])) {
        //     return $this->builder->whereRaw('status_change_date > CONVERT(datetime, ?)', [$value[0]]);
        // } else {
        //     return $this->builder->whereRaw('status_change_date BETWEEN CONVERT(datetime, ?) AND CONVERT(datetime, ?)', $value);
        // }
    }

    protected function nameType(array $value): Builder
    {
        return $this->builder->whereIn('nameType', $value);
    }

    protected function nameTypeActivity(string $value): Builder
    {
        return $this->builder->whereIn('nameTypeActivity', $value);
    }

    protected function regDate(array $value): Builder
    {
        switch (true) {
            case empty($value[0]) && empty($value[1]): 
                return $this->builder;
            case (empty($value[0]) && !empty($value[1])):
                return $this->builder->where('regDate', '<', $value[1]);
            case (!empty($value[0]) && empty($value[1])):
                return $this->builder->where('regDate', '>', $value[0]);
            default: 
                return $this->builder->whereBetween('regDate', $value);
        }

                // для msSql
        // if (empty($value[0]) && empty($value[1])) {
        //     return $this->builder;
        // } elseif (empty($value[0]) && !empty($value[1])) {
        //     return $this->builder->whereRaw('status_change_date < CONVERT(datetime, ?)', [$value[1]]);
        // } elseif (!empty($value[0]) && empty($value[1])) {
        //     return $this->builder->whereRaw('status_change_date > CONVERT(datetime, ?)', [$value[0]]);
        // } else {
        //     return $this->builder->whereRaw('status_change_date BETWEEN CONVERT(datetime, ?) AND CONVERT(datetime, ?)', $value);
        // }
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
        $query = $this->builder;

        if (in_array("Пустые", $value, true)) {
            $query->orWhereNull('NPStatus');
        }
        return $query->whereIn(DB::raw(
            "CASE
                WHEN NPstatus IS NOT NULL THEN NPstatus
                WHEN NPstatus IS NULL AND status_change_date IS NOT NULL THEN 'нет'
                ELSE 'не релевантно'
            END"
        ), $value);
    }

    protected function id(int $value): Builder
    {
        return $this->builder->whereIn('id', $value);
    }

    protected function NPstatusChangeDate(array $value): Builder
    {
        switch (true) {
            case empty($value[0]) && empty($value[1]): 
                return $this->builder;
            case (empty($value[0]) && !empty($value[1])):
                return $this->builder->where('NP_status_change_date', '<', $value[1]);
            case (!empty($value[0]) && empty($value[1])):
                return $this->builder->where('NP_status_change_date', '>', $value[0]);
            default: 
                return $this->builder->whereBetween('NP_status_change_date', $value);
        }
    }

    protected function fullText(array $value): Builder
    {
        $searchRes = $this->model::search($value[0])->get();
        $ids = $searchRes->pluck('id')->toArray();
        return $this->builder->whereIn('id', $ids);
    }
}
