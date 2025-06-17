<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read integer $page
 * @property-read integer $perPage
 * @property-read array $user_columns
 */
class GetCertificatesListRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => ['required', 'integer', 'between:1,100000'],
            'perPage' => ['required', 'integer', 'between:1,500'],
            'user_columns' => ['required', 'array', 'min:1'],
            'user_columns.*' => ['required', 'string']
        ];
    }

}