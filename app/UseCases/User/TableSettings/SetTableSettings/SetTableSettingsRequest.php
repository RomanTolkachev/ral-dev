<?php

namespace App\UseCases\User\TableSettings\SetTableSettings;

use Illuminate\Foundation\Http\FormRequest;

class SetTableSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'table_name' => ['required', 'string'],
            'settings' => ['required', 'array'],
        ];
    }
}
