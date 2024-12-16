<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class RalFilter extends AbstractFilter
{

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
            $query = $query->orWhere('link', 'like', "%$item%");
        }
        return $query;
    }

    protected function RegNumber(string $value): Builder
    {
        return $this->builder->whereIn('RegNumber', $value);
    }

    protected function oldStatusAL(array $value): Builder
    {
        $query = $this->builder->whereIn('old_status_AL', $value);

        if (in_array("false", $value, true)) {
            $query->orWhereNull('old_status_AL');
        }

        return $query;
    }

    protected function newStatusAL(array $value): Builder
    {
        return $this->builder->whereIn('new_status_AL', $value);
    }

    protected function statusChangeDate(string $value): Builder
    {
        return $this->builder->whereIn('status_change_date', $value);
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

    protected function NPStatusChangeDate(int $value): Builder
    {
        return $this->builder->whereIn('NP_status_change_date', $value);
    }
}
