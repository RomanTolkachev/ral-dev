<?php

namespace App\UseCases\Certificates\GetCertificatesFilters;

use Illuminate\Http\JsonResponse;

class GetCertificatesFiltersController
{
    public function __invoke()
    {
        $filters = [
            [
                'headerLabel' => "ral_short_info_view__RegNumber",
                'type' => 'multi',
                'defaultValue' => [],
            ],
            [
                'headerLabel' => "technicalReglaments",
                'type' => 'multiVariants',
                'defaultValue' => [],
                'values' => [
                    'checkboxValues' => [
                        "ТР ТС 001/2011",
                        "ТР ТС 025/2012",
                        "ТР ТС 028/2012",
                        "ТР ТС 018/2011",
                        "ТР ТС 014/2011",
                        "ТР ТС 010/2011",
                        "ТР ТС 031/2012",
                        "ТР ТС 032/2013",
                        "ТР ТС 012/2011",
                        "ТР ТС 019/2011",
                        "ТР ЕАЭС 043/2017",
                        "ТР ЕАЭС 050/2021",
                        "ТР ТС 006/2011",
                        "ТР ТС 003/2011",
                        "ТР ТС 016/2011",
                        "ТР ТС 011/2011",
                        "ТР ТС 021/2011",
                        "ТР ТС 034/2013",
                        "ТР ТС 013/2011",
                        "ТР ТС 004/2011",
                        "ТР ТС 002/2011",
                        "ТР ТС 020/2011",
                        "ТР ЕАЭС 040/2016",
                        "ТР ТС 015/2011",
                        "ТР ЕАЭС 045/2017",
                        "ТР ТС 023/2011",
                        "ТР ЕАЭС 037/2016",
                        "ТР ТС 030/2012",
                        "ТР ТС 017/2011",
                        "ТР ТС 008/2011",
                        "ТР ТС 009/2011",
                        "ТР ТС 007/2011",
                        "ТР ЕАЭС 042/2017",
                        "ТР ТС 024/2011",
                        "ТР ЕАЭС 046/2018",
                        "ТР ЕАЭС 047/2018",
                        "ТР ТС 005/2011",
                        "ТР ЕАЭС 038/2016",
                        "ТР ТС 022/2011",
                        "ТР ТС 033/2013",
                        "ТР ТС 029/2012",
                        "ТР ЕАЭС 051/2021",
                        "ТР ЕАЭС 044/2017",
                        "ТР ЕАЭС 036/2016",
                        "ТР ТС 027/2012",
                        "ТР ТС 035/2014",
                        "ТР ТС 026/2012",
                        "ТР ЕАЭС 039/2016",
                        "ТР ЕАЭС 041/2017",
                        "ТР ЕАЭС 037/2016"
                    ]
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
        return new JsonResponse($filters);
    }
}
