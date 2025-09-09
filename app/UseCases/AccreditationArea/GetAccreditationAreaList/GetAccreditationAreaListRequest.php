<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read integer $page
 * @property-read integer $perPage
 * @property-read array $user_columns
 * @method array query() Получить все query параметры
 * @method array input() Получить все query
 * @method void merge(array $attributes) Объединить данные с запросом
 * @method mixed user() Получить пользователя
 */ 
class GetAccreditationAreaListRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => ['required', 'integer', 'between:1,20000'],
            'perPage' => ['required', 'integer', 'between:1,500'],
        ];
    }

}