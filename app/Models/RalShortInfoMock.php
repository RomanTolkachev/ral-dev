<?php

namespace App\Models;

use App\Models\Traits\HasColumnsHelp;
use App\Models\Traits\HasQueryFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingFullText;
use Laravel\Scout\Searchable;

class RalShortInfoMock extends Model
{
    use HasFactory, HasColumnsHelp, HasQueryFilters, Searchable;


    // #[SearchUsingPrefix([])]#
    // #[SearchUsingFullText(['RegNumber', 'oaDescription', 'fullName'])]
    public function toSearchableArray()
    {
        // $array = $this->toArray();
        // return $array;
        return [
            'RegNumber' => $this->RegNumber,
            'applicantINN' => $this->applicantINN,
            // 'oaDescription' => $this->oaDescription,
            'fullName' => $this->fullName,
        ];
    }

    protected $table = 'ral_short_info_mock';
    protected $hidden = ['oaDescription', 'address'];
    // protected $hidden = ['nameTypeActivity', 'link', 'nameType', 'nameTypeActivity', 'fullName', 'address', 'oaDescription', 'NPstatus', 'id', 'regDate', 'NP_status_change_date', 'applicantFullName'];
    // protected $visible = ['new_status_AL', 'nameType', 'NP_status_change_date', 'regDate'];
}
