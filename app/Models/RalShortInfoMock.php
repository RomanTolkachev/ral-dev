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

    public function scopeAddIsRelevant(Builder $query): Builder
    {
        return $query->addSelect(DB::raw(
            "CASE 
                when NPstatus is not null then 'релевантно' 
                when NPstatus is null and status_change_date is not null then 'релевантно' else 'не релевантно' 
            END as is_relevant"
        ));
    }
}
