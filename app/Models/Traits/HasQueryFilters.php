<?php

namespace App\Models\Traits;

use App\Http\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

trait HasQueryFilters
{
    /**
     * @param Builder $builder
     * @param AbstractFilter $filter
     * @param array $exclude
     * @return Builder
     */
    public function scopeFilter(Builder $builder, AbstractFilter $filter, $exclude = []): Builder
    {
        return $filter->apply($builder, $exclude);
    }

}
