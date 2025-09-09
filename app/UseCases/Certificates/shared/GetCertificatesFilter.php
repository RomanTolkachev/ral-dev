<?php

namespace App\UseCases\Certificates\shared;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Filters\AbstractFilter;
use App\Models\CertificatesShortInfo;
use Illuminate\Support\Facades\DB;
use App\Models\StatusChange;
use Illuminate\Http\Request;

class GetCertificatesFilter extends AbstractFilter
{

    protected $model;

    public function __construct(CertificatesShortInfo $model, Request $request)
    {
        $this->model = $model;
        parent::__construct($request->input());
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
        $formattedColumn = preg_replace('/_desc$/', "", $value);
        $query = $this->builder->whereNotNull($formattedColumn);
        if (str_ends_with($value, 'desc')) {
            $query = $query->orderByDesc($formattedColumn);
            return $query;
        } else {
            $query = $query->orderBy($formattedColumn);
            return $query;
        }
    }

    protected function statusChangeStatusChangesBy(array $values): Builder
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
                return $this->builder->where('update_status_date', '<=', $values[1]);
            case (!empty($values[0]) && empty($values[1])):
                return $this->builder->where('update_status_date', '>=', $values[0]);
            default:
                return $this->builder->whereBetween('update_status_date', $values);
        }
    }

    protected function date(array $values): Builder
    {
        switch (true) {
            case empty($values[0]) && empty($values[1]):
                return $this->builder;
            case (empty($values[0]) && !empty($values[1])):
                return $this->builder->where('date', '<=', $values[1]);
            case (!empty($values[0]) && empty($values[1])):
                return $this->builder->where('date', '>=', $values[0]);
            default:
                return $this->builder->whereBetween('date', $values);
        }
    }
    protected function endDate(array $values): Builder
    {
        switch (true) {
            case empty($values[0]) && empty($values[1]):
                return $this->builder;
            case (empty($values[0]) && !empty($values[1])):
                return $this->builder->where('endDate', '<', $values[1]);
            case (!empty($values[0]) && empty($values[1])):
                return $this->builder->where('endDate', '>', $values[0]);
            default:
                return $this->builder->whereBetween('endDate', $values);
        }
    }

    protected function technicalReglaments(array $values): Builder
    {
        return $this->builder->whereHas('techReglaments', function ($query) use ($values) {
            $query->where(function ($q) use ($values) {
                foreach ($values as $value) {
                    $q->orWhere('tech_reg_code', 'like', "%{$value}%");
                }
            });
        }, '>=', count($values)); // третий параметр ищет количество связей. На самом деле, если поставить = 2, то все равно будет искать >=
    }

    protected function ralShortInfoViewRegNumber(array $values): Builder
    {
        return $this->builder->where(function ($query) use ($values) {
            foreach ($values as $value) {
                $query->whereHas('ralShortInfoView', function ($q) use ($value) {
                    $q->where('RegNumber', 'LIKE', "%$value%")
                        ->orWhere('fullName', 'LIKE', "%$value%");
                });
            }
        });
    }
}
