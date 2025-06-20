<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasQueryFilters;
use App\Models\CertificateTestinglab;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

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

    // public function certificateTestinglab(): HasOne
    // {
    //     // return $this->belongsTo(CertificateTestinglab::class, 'id', 'id_cert');
    //     return $this->hasOne(CertificateTestinglab::class, 'id_cert');
    // }

    public function ralShortInfoView(): HasOneThrough
    {
        return $this->hasOneThrough(
            RalShortInfoView::class, 
            CertificateTestinglab::class, 
            'id_cert', 
            'id', 
            'id', 
            'id_ral'
        );
    }
}
