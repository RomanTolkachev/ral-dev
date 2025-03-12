<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NPMock extends Model
{
    use HasFactory;

    protected $table = 'np_mock';
    public $timestamps = false;
}
