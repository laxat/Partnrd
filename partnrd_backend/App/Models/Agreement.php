<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agreement extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'owner',
        'editable',
        'data',
        'status'
    ]; 

    protected $hidden = [
        'id'
    ];
    protected $casts = [
        'editable' => 'boolean', 
        'data' => 'array'
    ]; 



}
