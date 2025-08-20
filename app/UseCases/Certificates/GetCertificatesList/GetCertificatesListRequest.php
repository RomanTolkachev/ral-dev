<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use Illuminate\Http\Request;
use Carbon\Carbon;

/**
 * @property-read integer $page
 * @property-read integer $perPage
 * @property-read array $user_columns
 * @method \App\Models\User|null user()
 * @method array query()
 * @method void merge()
 */
class GetCertificatesListRequest extends Request
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

    public function after(): array
    {
        return [];
    }
}
