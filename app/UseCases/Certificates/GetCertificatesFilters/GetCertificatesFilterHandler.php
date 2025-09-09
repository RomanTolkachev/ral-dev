<?php

namespace App\UseCases\Certificates\GetCertificatesFilters;

use App\Models\User;
use App\Services\GetTableSettings;
use App\UseCases\Certificates\shared\GetCertificatesFilter;
use App\Models\CertificatesShortInfo;

class GetCertificatesFilterHandler
{
    public function execute(User | null $currentUser, User $defaultUser, $query, GetCertificatesFilter $filter)
    {
        $requestedColumns = GetTableSettings::for($currentUser, $defaultUser, "certificates_short_info");

        $filters = $this->availableFilters;

        // Подставляем динамические значения
        foreach ($filters as &$filterItem) {
            if ($filterItem['headerLabel'] === 'technicalReglaments') {
                $filterItem['values']['checkboxValues'] = $this->getTechReglamentCodes($filter);
            }
        }

        // Фильтруем доступные фильтры по пользовательским настройкам
        $handledColumns = array_filter($filters, function ($value) use ($requestedColumns) {
            return in_array($value["headerLabel"], $requestedColumns);
        });

        return array_values($handledColumns);
    }

    /**
     * Получить список уникальных кодов техрегламентов
     */
    protected function getTechReglamentCodes(GetCertificatesFilter $filter): array
    {
        $res = CertificatesShortInfo::with(["ralShortInfoView", "certificateApplicant", 'certificationAuthority', "statusChange"])
            ->filter($filter, exclude: ['technicalReglaments'])
            ->join('certificate_tech_reglaments_link', 'certificates_short_info.id', '=', 'certificate_tech_reglaments_link.certificate_id')
            ->join('dictionary_regulations', 'certificate_tech_reglaments_link.tech_reg_id', '=', 'dictionary_regulations.id')
            ->distinct()
            ->pluck('dictionary_regulations.tech_reg_code') // ← сразу получаем массив
            ->toArray();

            return $res;
    }


    /**
     * Статическое описание доступных фильтров (без динамических значений)
     */
    protected array $availableFilters = [
        [
            'headerLabel' => "ral_short_info_view__RegNumber",
            'type' => 'multi',
            'defaultValue' => [],
        ],
        [
            'headerLabel' => "technicalReglaments",
            'type' => 'checkBox',
            'defaultValue' => [],
            'values' => [
                'checkboxValues' => [], // будет подставлено в execute()
            ],
        ],
        [
            'headerLabel' => "certificate_name",
            'type' => 'multi',
            'defaultValue' => [],
        ],
        [
            'headerLabel' => "certificate_status",
            'type' => 'checkBox',
            'defaultValue' => [],
            'values' => [
                'checkboxValues' => ["Приостановлен", "Прекращён", "Действует", "Продлен", "Недействителен", "Архивный"]
            ],
        ],
        [
            'headerLabel' => "status_change__status_changes_by",
            'type' => 'checkBox',
            'defaultValue' => [],
            'values' => [
                'checkboxValues' => [
                    "По решению органа по сертификации",
                    "По решению национального органа по аккредитации",
                    "None"
                ]
            ],
        ],
        [
            'headerLabel' => "update_status_date",
            'type' => 'date',
            'defaultValue' => ["", ""],
        ],
        [
            'headerLabel' => "date",
            'type' => 'date',
            'defaultValue' => ["", ""],
        ],
        [
            'headerLabel' => "endDate",
            'type' => 'date',
            'defaultValue' => ["", ""],
        ],
    ];
}
