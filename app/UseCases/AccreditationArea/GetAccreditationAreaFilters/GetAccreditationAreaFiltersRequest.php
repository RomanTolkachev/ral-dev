<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaFilters;

use Illuminate\Http\Request;

class GetAccreditationAreaFiltersRequest
{
    public function rules(): array
    {
        return [
            'page' => ['required', 'integer', 'between:1,500'],
            'perPage' => ['required', 'integer', 'between:1,500'],
            'user_columns' => ['required', 'array', 'min:1'],
            'user_columns.*' => ['required', 'string']
        ];
    }
}
