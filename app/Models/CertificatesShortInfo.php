<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasQueryFilters;

class CertificatesShortInfo extends Model
{
    use HasFactory, HasQueryFilters;

    protected $table = "certificates_short_info";
    public $timestamps = false;

    protected function casts(): array
    {
        return [
            'update_status_date' => 'datetime:d.m.Y',
            'previous_update_status_date' => 'datetime:d.m.Y',
            'date' => 'datetime:d.m.Y',
            'endDate' => 'datetime:d.m.Y',
        ];
    }
    
}
