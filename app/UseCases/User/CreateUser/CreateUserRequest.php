<?php

namespace App\UseCases\User\CreateUser;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'unique:users,name'],
            'email' => ['required', 'string', 'unique:users,email'],
            'password' => ['required', 'string'],
        ];
    }
}
