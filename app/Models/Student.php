<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
    	'all_name',
    	'current_rating',
    	'visually',
    	'code',
    	'explanation',
    	'stability',
    	'presentation',
    	'questions',
    	'favorite_place',
    	'favoritism',
    	'print_out',
    	'english_pd',
    	'git',
    	'notes',
        'columns_summ',
        'columns_amount',
    ];

}
