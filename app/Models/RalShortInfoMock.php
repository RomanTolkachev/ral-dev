<?php

namespace App\Models;

use App\Models\Traits\HasColumnsHelp;
use App\Models\Traits\HasQueryFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Laravel\Scout\Searchable;

class RalShortInfoMock extends Model
{
    use HasFactory, HasColumnsHelp, HasQueryFilters, Searchable;

    protected $table = 'ral_short_info_mock';
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
                when NPstatus is null and status_change_date is not null then 'нет' 
                else 'не релевантно' 
            END
            as NPstatus"
        ));
    }
}
