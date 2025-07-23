<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DictionaryRegulation extends Model
{
    public $table = 'dictionary_regulations';
    public $timestamps = false;

    public function certificates()
    {
        return $this->belongsToMany(
            CertificatesShortInfo::class,
            'certificate_tech_reglaments_link',
            'tech_reg_id',     // FK в промежуточной таблице для регламента
            'certificate_id'  // FK в промежуточной таблице для сертификата
        );
    }

}
