<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportColumn extends Model
{
    use HasFactory;

    protected function getVisibilityAttribute($value)
    {
        $check = ReportColumnVisibility::where('user_id', request()->user_id)
            ->where('column_id', $this->id)
            ->where('visibility', 1)
            ->first();
        if ($check) {
            return 1;
        }
        return $value;
    }

    public function childrens()
    {
        return $this->hasMany(ReportColumn::class, 'parent', 'id');
    }

    public function onday_report_data()
    {
        return $this->hasOne(ReportData::class, 'column_id', 'id');
    }
    public function sum_of_report_data()
    {
        return $this->hasMany(ReportData::class, 'column_id', 'id');
    }

    public function user_col_visibility()
    {
        return $this->hasOne(ReportColumnVisibility::class, 'column_id', 'id');
    }
}
