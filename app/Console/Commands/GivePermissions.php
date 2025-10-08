<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Permissions\Role;
use App\Models\Permissions\Permission;

class GivePermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permissions:give';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        $role = Role::where('name', 'admin')->first();
        $permissions = Permission::all();
        $role->syncPermissions($permissions);

        $this->info("Роли '{$role->name}' назначено {$permissions->count()} разрешений.");

        return Command::SUCCESS;
    }
}
