<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use App\Models\AccreditationArea;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Filters\AbstractFilter;
use App\Models\RalShortInfoView;
use Illuminate\Support\Facades\DB;

class GetAccreditationAreaListFilter extends AbstractFilter
{
    protected AccreditationArea $model;

    // Хранилище всех подходящих ID из RalShortInfoView (для объединённого JOIN)
    protected array $matchedRalIds = [];

    public function __construct(AccreditationArea $model, GetAccreditationAreaListRequest $request)
    {
        $this->model = $model;
        parent::__construct($request);
    }


    public function apply(Builder $builder): Builder
    {
        parent::apply($builder);

        return $this->applyFinalJoin();
    }

    protected function fullGost(array $values): Builder
    {
        return $this->builder->where(function ($q) use ($values) {
            foreach ($values as $value) {
                $q->orWhere('full_gost', 'like', "%$value%");
            }
        });
    }

    protected function tnVed(array $values): Builder
    {
        return $this->builder->where(function ($q) use ($values) {
            foreach ($values as $item) {
                $q->orWhere('tn_ved', 'like', "%$item%");
            }
        });
    }

    protected function sourceFileLabel(array $value): Builder
    {
        foreach ($value as $item) {
            $this->builder = $this->builder->orWhere('source_file_label', '=', $item);
        }
        return $this->builder;
    }

    protected function ralShortInfoViewFullName(array $value): Builder
    {
        $ids = RalShortInfoView::select('id')
            ->where(function ($q) use ($value) {
                foreach ($value as $item) {
                    $q->orWhere('applicantFullName', 'like', "%$item%");
                }
            })
            ->pluck('id')
            ->toArray();

        $this->matchedRalIds = array_merge($this->matchedRalIds, $ids);

        return $this->builder;
    }

    protected function ralShortInfoViewRegNumber(array $value): Builder
    {
        $ids = RalShortInfoView::select('id')
            ->where(function ($q) use ($value) {
                foreach ($value as $item) {
                    $q->orWhere('RegNumber', 'like', "%$item%");
                }
            })
            ->pluck('id')
            ->toArray();

        $this->matchedRalIds = array_merge($this->matchedRalIds, $ids);

        return $this->builder;
    }

    /**
     * Финальный JOIN по всем собранным matchedRalIds (если есть)
     */
    protected function applyFinalJoin(): Builder
    {
        $query = $this->builder;
        $uniqueIds = array_unique($this->matchedRalIds);

        if (empty($uniqueIds)) {
            return $query;
        }

        // Создаем временную таблицу
        $tempTable = '##temp_ids_' . uniqid();
        DB::statement("CREATE TABLE {$tempTable} (id INT PRIMARY KEY)");

        foreach (array_chunk($uniqueIds, 1000) as $chunk) {
            DB::table($tempTable)->insert(
                array_map(fn($id) => ['id' => $id], $chunk)
            );
        }

        // Выполняем один объединённый JOIN
        return $query->join(DB::raw("{$tempTable} tmp_combined"), 'acсreditation_area.id_ral', '=', 'tmp_combined.id');
    }
}