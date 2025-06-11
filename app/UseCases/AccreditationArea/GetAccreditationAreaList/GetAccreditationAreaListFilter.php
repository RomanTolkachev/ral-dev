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
        // $this->request = $request;
    }

    /**
     * Фильтрация по Ссылке
     *
     * @param array $value
     * @return Builder
     */
    protected function gost(array $value): Builder
    {
        $query = $this->builder;
        foreach ($value as $item) {
            $query = $query->orWhere('gost', 'like', "$item%");
        }
        return $query;
    }

    protected function tnVed(array $value): Builder
    {
        $query = $this->builder;
        foreach ($value as $item) {
            $query = $query->orWhere('tn_ved', 'like', "%$item%");
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
    protected function idRal(array $value): Builder
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

        return $query->where(function ($q) use ($matchedIds) {
            foreach (array_chunk($matchedIds, 1000) as $chunk) {
                $q->orWhereIn('id_ral', $chunk);
            }
        });
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

        return $query->join(DB::raw("{$tempTable} tmp"), 'acreditation_area.id_ral', '=', 'tmp.id');
    }
}
