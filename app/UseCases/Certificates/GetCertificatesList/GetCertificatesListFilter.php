<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Filters\AbstractFilter;
use App\Models\CertificatesShortInfo;
use Illuminate\Support\Facades\DB;
use App\Models\StatusChange;


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
        $query = $this->builder->whereNotNull(preg_replace('/_(asc|desc)$/i', '', $value))
        ->where(preg_replace('/_(asc|desc)$/i', '', $value), '<>', '');
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
    protected function statusChangesBy(array $values): Builder 
    {
        $query = $this->builder;
        $ids = StatusChange::where( function($q) use ($values) {
            foreach($values as $value) {
                $q->orWhere('status_changes_by', $value);
            }
        })->distinct()->pluck('certificate_id')->toArray();

        if (empty($ids)) {
            return $query->whereRaw('1 = 0');
        }

        $tempTable = '##temp_ids_' . uniqid();
        DB::statement("CREATE TABLE {$tempTable} (certificate_id INT PRIMARY KEY)");

        foreach (array_chunk($ids, 1000) as $chunk) {
            DB::table($tempTable)->insert(
                array_map(fn($id) => ['certificate_id' => $id], $chunk)
            );
        }

        return $query->join(DB::raw("{$tempTable} tmp2"), 'certificates_short_info.id', '=', 'tmp2.certificate_id');
    }

    protected function updateStatusDate()
    {
        
    }


}
