<?php

namespace App\Models;

use App\Models\Traits\HasColumnsHelp;
use App\Models\Traits\HasQueryFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Laravel\Scout\Searchable;
use Illuminate\Support\Carbon;

class RalShortInfo extends Model
{
    use HasFactory, HasColumnsHelp, HasQueryFilters, Searchable;

    protected $table = 'ral_short_info';
    public $timestamps = false;

    /**
     * форматирование дат
     */
    protected function casts(): array
    {
        return [
            'NP_status_change_date' => 'datetime:Y-m-d',
            'status_change_date' => 'datetime:Y-m-d',
            'regDate' => 'datetime:Y-m-d',
        ];
    }

    /**
     * реализация полнотекстового поиска по 3 колонкам 
     */
    // #[SearchUsingPrefix([])]#
    // #[SearchUsingFullText(['RegNumber', 'oaDescription', 'fullName'])]
    public function toSearchableArray()
    {
        return [
            'RegNumber' => $this->RegNumber,
            'applicantINN' => $this->applicantINN,
            'fullName' => $this->fullName,
        ];
    }

    /**
     * реализация добавления статуса релевантности нац. части в колонке NPstatus
     */
    public function scopeModifyNPStatus(Builder $query): Builder
    {
        return $query->addSelect(DB::raw(
            "CASE 
                when NPstatus is not null then NPstatus 
                when NPstatus is null and NP_status_change_date is not null then 'нет' 
                else 'не применимо' 
            END
            as NPstatus"
        ));
    }

    /**
     * (понять и простить) Эта функция модифицирует колонку NP_status_change_date
     * если для АЛ не релевантен статус нахождения в Национальной части реестра, то колонка возвращает NULL
     * если релевантно, то мы смотрим в табличку NP и достаем из нее самую позднюю дату смены статуса
     * если дата есть в исходной таблице, то возвращаем ее
     */
    public function scopeModifyNPStatusChangeDate(Builder $query): Builder
    {
        return $query->addSelect(DB::raw(
            "COALESCE(
                NP_status_change_date, 
                (
                    SELECT MAX(GREATEST(
                        try_convert(datetime,include_date,120), 
                        try_convert(datetime,exclude_date,120)                      
                    )) 
                FROM np WHERE np.link = ral_short_info.link)
            ) AS NP_status_change_date"
        ));
    }

    public function scopeWhereRawDateTime(Builder $query, string $column, string $action, string $rawValue): Builder
    {
        return $query->where($column, $action, Carbon::parse($rawValue)->toIso8601ZuluString());
    }

    public function scopeWhereRawDateTimeBetween(Builder $query, string $column, array $rawValues): Builder
    {
        return $query->whereBetween($column, collect($rawValues)->transform(fn($item) => Carbon::parse($item)->toIso8601ZuluString())->toArray());
    }
}
