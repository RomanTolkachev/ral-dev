<?php

namespace App\Models;

use App\Models\Traits\HasColumnsHelp;
use App\Models\Traits\HasQueryFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Attributes\SearchUsingFullText;
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

    public function npMocks(): HasMany
    {
        return $this->hasMany(NPMock::class, 'link', 'link');
    }
}
