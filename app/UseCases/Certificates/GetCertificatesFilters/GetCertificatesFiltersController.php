<?php

namespace App\UseCases\Certificates\GetCertificatesFilters;

use Illuminate\Http\Request;
use App\Services\TableFilterService;
use Illuminate\Http\JsonResponse;
use App\Models\AccreditationArea;

class GetCertificatesFiltersController
{
    public function __invoke()
    {
        $filters = [
            [
                'header' => "ral_short_info_view__RegNumber",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'multi',
                ],
            ],
            [
                'header' => "technicalReglaments",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'multiVariants',
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
                'header' => "certificate_name",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'multi'
                ],
            ],
            [
                'header' => "certificate_status",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'checkBox',
                    'checkboxValues' => ["Приостановлен", "Прекращён", "Действует", "Продлен", "Недействителен", "Архивный"]
                ],
            ],
            [
                'header' => "status_change__status_changes_by",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'checkBox',
                    'checkboxValues' => [
                        "По решению органа по сертификации",
                        "По решению национального органа по аккредитации",
                        "None"
                    ]
                ],
            ],
            [
                'header' => "update_status_date",
                'headerType' => 'varchar',
                'sortValues' => [
                    'type' => 'date',
                ],
            ],
            [
                'header' => "date",
                'headerType' => 'datetime',
                'sortValues' => [
                    'type' => 'date',
                ],
            ],
            [
                'header' => "endDate",
                'headerType' => 'datetime',
                'sortValues' => [
                    'type' => 'date',
                ],
            ],

        ];
        return new JsonResponse($filters);
    }
}
