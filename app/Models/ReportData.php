<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportData extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function col_info()
    {
        return $this->belongsTo(ReportColumn::class,'column_id','id');
    }
}
