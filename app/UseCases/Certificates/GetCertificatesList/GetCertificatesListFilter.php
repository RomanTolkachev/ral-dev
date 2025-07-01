<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Filters\AbstractFilter;
use App\Models\CertificatesShortInfo;
use Illuminate\Support\Facades\DB;


class GetCertificatesListFilter extends AbstractFilter
{

    protected $model;
    // protected $request;
    public function __construct(CertificatesShortInfo $model, GetCertificatesListRequest $request)
    {
        $this->model = $model;
        parent::__construct($request);
    }

    protected function certificateName(array $values): Builder
    {
        $query = $this->builder;
        $query->where(function(Builder $q) use ($values) {
            foreach($values as $value) {
                $q->orWhere("certificate_name", 'like', "%$value%");
            }
        }); 
        return $query;
    }

    protected function certificateStatus(array $value): Builder
    {
        $query = $this->builder;
        foreach ($value as $valueItem) {
            $query->where(fn(Builder $q) => $q->orWhere("certificate_status",  $valueItem));
        }
        return $query;
    }

    protected function order(string $value): Builder
    {
        // $query = $this->builder;
        $query = $this->builder->whereNotNull(preg_replace('/_(asc|desc)$/i', '', $value));
        // $formattedColumn = preg_replace('/_desc$/', "", $value);
        // if (str_ends_with($value, 'desc')) {
        //     $query = $query->orderByRaw("
        //     CASE 
        //         WHEN {$formattedColumn} IS NULL THEN 1
        //         ELSE 0
        //     END,
        //     CASE 
        //         WHEN {$formattedColumn} IS NULL THEN 
        //             CASE 
        //                 WHEN ISDATE({$formattedColumn}) = 1 THEN '1800-12-31'
        //                 ELSE '~'
        //             END
        //         ELSE {$formattedColumn}
        //     END DESC
        // ");
        // } else {
        //     $query = $query->orderByRaw("
        //     CASE 
        //         WHEN {$formattedColumn} IS NULL THEN 1
        //         ELSE 0
        //     END,
        //     CASE 
        //         WHEN {$formattedColumn} IS NULL THEN 
        //             CASE 
        //                 WHEN ISDATE({$formattedColumn}) = 1 THEN '9999-12-31'
        //                 ELSE '~~'
        //             END
        //         ELSE {$formattedColumn}
        //     END ASC
        // ");
        // }
        return $query;
    }
}
