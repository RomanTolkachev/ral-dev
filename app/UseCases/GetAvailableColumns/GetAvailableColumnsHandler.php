<?php

namespace App\UseCases\GetAvailableColumns;

use Illuminate\Database\Eloquent\Builder;
use App\Models\AccreditationArea;
use App\Models\CertificatesShortInfo;
use App\Models\RalShortInfoView;

class GetAvailableColumnsHandler
{
    public function execute(string $modelName)
    {
        return $this->getAvailableColumns($this->getModelFromString($modelName));
    }

    private function getAvailableColumns(Builder $builder): array
    {
        $model = $builder->first();

        if (!$model) {
            return [];
        }

        $flatArray = collect([$model])
            ->customToFlat()
            ->first();

        return array_keys($flatArray);
    }

    private function getModelFromString(string $raw): Builder
    {
        switch ($raw) {
            case "certificates_short_info":
                return CertificatesShortInfo::with(["ralShortInfoView", "certificateApplicant", 'certificationAuthority', "statusChange"]);
            case "ral_short_info":
                return RalShortInfoView::query()->leftJoin('np_regulations_tnveds', 'np_regulations_tnveds.link', '=', 'ral_short_info_view.link');
            case "accreditation_area":
                return AccreditationArea::query();
            default:
                throw new \InvalidArgumentException("Unknown model type: {$raw}");
        }
    }
}
