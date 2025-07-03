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
        $query->where(function (Builder $q) use ($values) {
            foreach ($values as $value) {
                $q->orWhere("certificate_name", 'like', "%$value%");
            }
        });
        return $query;
    }

    protected function certificateStatus(array $values): Builder
    {
        $query = $this->builder;
        return $query->whereIn("certificate_status", $values);
    }

    protected function order(string $value): Builder
    {
        // $query = $this->builder;
        $formattedColumn = preg_replace('/_desc$/', "", $value);
        $query = $this->builder->whereNotNull($formattedColumn);
        if(str_ends_with($value, 'desc')) {
            $query = $query->orderByDesc($formattedColumn);
            return $query;
        } else {
            $query = $query->orderBy($formattedColumn);
            return $query;
        }
        // ->where(preg_replace('/_(asc|desc)$/i', '', $value), '<>', '');
        // $formattedColumn = preg_replace('/_desc$/', "", $value);
        // dd("зашли");
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
        // return $query;
    }
    protected function statusChangesBy(array $values): Builder
    {
        $query = $this->builder;
        $ids = StatusChange::where(function ($q) use ($values) {
            foreach ($values as $value) {
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

    protected function updateStatusDate(array $values): Builder
    {
        switch (true) {
            case empty($values[0]) && empty($values[1]):
                return $this->builder;
            case (empty($values[0]) && !empty($values[1])):
                return $this->builder->where('update_status_date', '<', $values[1]);
            case (!empty($values[0]) && empty($values[1])):
                return $this->builder->where('update_status_date', '>', $values[0]);
            default:
                return $this->builder->whereBetween('update_status_date', $values);
        }
    }
}
