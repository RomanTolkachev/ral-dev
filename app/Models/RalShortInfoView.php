<?php

namespace App\Models;

use App\Models\Traits\HasColumnsHelp;
use App\Models\Traits\HasQueryFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class RalShortInfoView extends Model
{
    use HasFactory, HasColumnsHelp, HasQueryFilters, Searchable;

    protected $table = 'ral_short_info_view';
    public $timestamps = false;

    /**
     * форматирование дат
     */
    protected function casts(): array
    {
        return [
            'NP_status_change_date' => 'datetime:d.m.Y',
            'status_change_date' => 'datetime:d.m.Y',
            'regDate' => 'datetime:d.m.Y',
        ];
    }

    /**
     * реализация полнотекстового поиска по 3 колонкам 
     */
    // #[SearchUsingPrefix([])]
    // #[SearchUsingFullText(['RegNumber', 'oaDescription', 'fullName'])]
    public function toSearchableArray()
    {
        return [
            'RegNumber' => $this->RegNumber,
            'applicantINN' => $this->applicantINN,
            'fullName' => $this->fullName,
        ];
    }

    public function regulationaAndTnved()
    {
        return $this->hasOne(NpRegulationsTnved::class, 'link');
    }
}
