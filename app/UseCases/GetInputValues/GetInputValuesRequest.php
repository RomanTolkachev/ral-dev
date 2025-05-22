<?php

namespace App\UseCases\GetInputValues;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read integer $page
 * @property-read integer $perPage
 * @property-read array $user_columns
 */
class GetInputValuesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'where' => ['required', 'string',],
            'column' => ['required', 'string',],
            'like' => ['required', 'string',],
        ];
    }

    public function after()
    {
        return function(){};
    }
}
