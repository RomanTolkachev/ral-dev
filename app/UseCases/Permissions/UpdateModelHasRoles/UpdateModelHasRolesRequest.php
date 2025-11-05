<?php

namespace App\UseCases\Permissions\UpdateModelHasRoles;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\User;
use App\Models\Permissions\Role;

class UpdateModelHasRolesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'userId' => ['required', 'integer', Rule::exists(User::class, column: "id")],
            'newRoles' => ['array'],
            'newRoles.*' => ['sometimes', 'required', 'string', Rule::exists(Role::class, column: "name")],
        ];
    }
}
