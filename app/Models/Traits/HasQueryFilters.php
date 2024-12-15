<?php

namespace App\Models\Traits;

use App\Http\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

trait HasQueryFilters
{
    /**
     * @param Builder $builder
     * @param AbstractFilter $filter
     * @return Builder
     */
    public function scopeFilter(Builder $builder, AbstractFilter $filter): Builder
    {
        return $filter->apply($builder);
    }

}
