<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModaratorSugessionToUser extends Model
{
    protected $guarded = [];
    public function modarator(){
        return $this->belongsTo('App\User','modarator_id','id');
    }
    public function user(){
        return $this->belongsTo('App\Models\User','user_id','id');
    }
}
