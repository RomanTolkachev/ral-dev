<?php

namespace App\UseCases\GetAvailableColumns;

use Illuminate\Foundation\Http\FormRequest;

class GetAvailableColumnsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'for' => ['required', 'string'],
        ];
    }

    public function after(): array
    {
        return [];
    }
}