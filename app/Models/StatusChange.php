<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatusChange extends Model
{
    public $timestamps = false;
    public $table = "status_change";

    public function casts(): array
    {
        return [
            'publish_date' => 'datetime:d.m.Y',
            'begin_date' => 'datetime:d.m.Y',
            'end_date' => 'datetime:d.m.Y',
        ];
    }
}
