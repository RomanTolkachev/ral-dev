<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasQueryFilters;
use App\Models\CertificateTestinglab;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

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

    public function techReglaments()
    {
        return $this->belongsToMany(
            DictionaryRegulation::class,
            'certificate_tech_reglaments_link',
            'certificate_id',  // FK в промежуточной таблице для сертификата
            'tech_reg_id'      // FK в промежуточной таблице для регламента
        );
    }



    public function ralShortInfoView(): HasManyThrough
    {
        return $this->hasManyThrough(
            RalShortInfoView::class,
            CertificateTestinglab::class,
            'id_cert',
            'id',
            'id',
            'id_ral'
        );
    }

    public function certificateApplicant(): HasOne
    {
        return $this->hasOne(
            CertificateApplicant::class,
            "certificate_id"
        );
    }

    public function certificationAuthority(): HasOne
    {
        return $this->hasOne(
            CertificationAuthority::class,
            "certificate_id"
        );
    }

    public function statusChange(): HasMany
    {
        return $this->hasMany(
            StatusChange::class,
            "certificate_id",
            "id",
        );
    }
}
