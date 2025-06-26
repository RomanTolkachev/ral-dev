<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use App\Models\AccreditationArea;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Filters\AbstractFilter;
use App\Models\RalShortInfoView;
use Illuminate\Support\Facades\DB;


class GetAccreditationAreaListFilter extends AbstractFilter
{

    protected $model;
    // protected $request;
    public function __construct(AccreditationArea $model, GetAccreditationAreaListRequest $request)
    {
        $this->model = $model;
        parent::__construct($request);
    }

    /**
     * Фильтрация по Ссылке
     *
     * @param array $value
     * @return Builder
     */
    protected function fullGost(array $value): Builder
    {
        $query = $this->builder;
        $query = $query->where('full_gost', 'like', "$value[0]%");
        return $query;
    }

    protected function tnVed(array $value): Builder
    {
        $query = $this->builder;
        $query = $query->where( function($q) use ($value) {
            foreach($value as $item) {
                $q->orWhere('tn_ved', 'like', "%$item%");
            }
        });
        foreach ($value as $item) {
            $query = $query->orWhere('gost', 'like', "$item%");
        }
        return $query;
    }

    protected function sourceFileLabel(array $value): Builder
    {
        $query = $this->builder;
        foreach ($value as $item) {
            $query = $query->orWhere('source_file_label', '=', $item);
        }
        return $query;
    }
    protected function ralShortInfoViewFullName(array $value): Builder
    {
        $query = $this->builder;

        $matchedIds = RalShortInfoView::select('id')
            ->where(function ($q) use ($value) {
                foreach ($value as $item) {
                    $q->orWhere('applicantFullName', 'like', "%$item%");
                }
            })
            ->pluck('id')
            ->toArray();

        if (empty($matchedIds)) {
            return $query->whereRaw('1 = 0');
        }

        // Создаем временную таблицу
        $tempTable = '##temp_ids_' . uniqid();
        DB::statement("CREATE TABLE {$tempTable} (id INT PRIMARY KEY)");

        // Вставляем данные пачками
        foreach (array_chunk($matchedIds, 1000) as $chunk) {
            DB::table($tempTable)->insert(
                array_map(fn($id) => ['id' => $id], $chunk)
            );
        }

        // Используем JOIN вместо WHERE IN
        return $query->join(DB::raw("{$tempTable} tmp1"), 'acreditation_area.id_ral', '=', 'tmp1.id');
    }

    protected function ralShortInfoViewRegNumber(array $value): Builder
    {
        $query = $this->builder;

        $matchedIds = RalShortInfoView::select('id')
            ->where(function ($q) use ($value) {
                foreach ($value as $item) {
                    $q->orWhere('RegNumber', 'like', "%$item%");
                }
            })
            ->pluck('id')
            ->toArray();

        if (empty($matchedIds)) {
            return $query->whereRaw('1 = 0');
        }

        // Создаем временную таблицу
        $tempTable = '##temp_ids_' . uniqid();
        DB::statement("CREATE TABLE {$tempTable} (id INT PRIMARY KEY)");

        // Вставляем данные пачками
        foreach (array_chunk($matchedIds, 1000) as $chunk) {
            DB::table($tempTable)->insert(
                array_map(fn($id) => ['id' => $id], $chunk)
            );
        }

        // Используем JOIN вместо WHERE IN
        return $query->join(DB::raw("{$tempTable} tmp2"), 'acreditation_area.id_ral', '=', 'tmp2.id');
    }
}
