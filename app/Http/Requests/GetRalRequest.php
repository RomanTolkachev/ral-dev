<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read integer $page
 * @property-read integer $perPage
 */
class GetRalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => ['required', 'integer', 'between:1,500'],
            'perPage' => ['required', 'integer', 'between:1,500']
        ];
    }
}
