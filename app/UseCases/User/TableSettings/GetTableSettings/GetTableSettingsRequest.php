<?php

namespace App\UseCases\User\TableSettings\GetTableSettings;

use Illuminate\Foundation\Http\FormRequest;

class GetTableSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'userId' => ['required', 'string'],
            'tableName' => ['required', 'string'],
        ];
    }
}
