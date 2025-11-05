<?php

namespace App\UseCases\GetDefaultColumns;

use Illuminate\Foundation\Http\FormRequest;

class GetDefaultColumnsRequest extends FormRequest
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