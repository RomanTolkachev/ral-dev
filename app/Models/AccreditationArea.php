<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasColumnsHelp;
use App\Models\Traits\HasQueryFilters;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccreditationArea extends Model
{
    use HasFactory, HasColumnsHelp, HasQueryFilters;
    public $table = "acreditation_area";
    public $timestamps = false;

    public function ralShortInfoView(): BelongsTo
    {
        return $this->belongsTo(RalShortInfoView::class, 'id_ral', 'id');
    }

}
