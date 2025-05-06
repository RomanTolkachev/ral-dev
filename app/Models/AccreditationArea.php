<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasColumnsHelp;
use App\Models\Traits\HasQueryFilters;

class AccreditationArea extends Model
{
    use HasFactory, HasColumnsHelp, HasQueryFilters;
    public $table = "accreditation_area";
    public $timestamps = false;
}
