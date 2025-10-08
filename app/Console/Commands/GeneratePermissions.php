<?php

namespace App\Console\Commands;

use App\Models\AccreditationArea;
use App\Models\CertificatesShortInfo;
use App\Models\RalShortInfoView;
use App\Services\CreatePermissionsService;
use Illuminate\Console\Command;

class GeneratePermissions extends Command
{
    protected $signature = 'permissions:generate';

    protected $description = 'генерит список колонок, которые проходят через разрешения для отображения';

    public function handle()
    {
        CreatePermissionsService::forModels([
            CertificatesShortInfo::class,
            RalShortInfoView::class,
            AccreditationArea::class,
        ]);

        $this->info('Permissions generated successfully.');

        return Command::SUCCESS;
    }
}
