<?php

namespace App\Models;

use App\Models\Traits\HasColumnsHelp;
use App\Models\Traits\HasQueryFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RalShortInfoMock extends Model
{
    use HasFactory, HasColumnsHelp, HasQueryFilters;

    protected $table = 'ral_short_info_mock';
    protected $hidden = ['nameTypeActivity', 'link', 'nameType', 'nameTypeActivity', 'fullName', 'address', 'oaDescription', 'NPstatus', 'id', 'regDate', 'NP_status_change_date', 'applicantFullName'];

}
