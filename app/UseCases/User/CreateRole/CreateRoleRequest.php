<?php

namespace App\UseCases\User\CreateRole;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Permissions\Role;

class CreateRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'role_name' => ['required', 'string', Rule::unique(Role::class, 'name')],
        ];
    }
}
