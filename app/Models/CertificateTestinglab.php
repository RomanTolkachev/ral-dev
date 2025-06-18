<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CertificateTestinglab extends Model
{
    public $table = "certificate_testinglabs";
    public $timestamps = false;

    public function certificatesShortInfo()
    {
        return $this->hasOne(CertificatesShortInfo::class, 'id');
    }

}
