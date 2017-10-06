<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;

class Student extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at'
    ];

    public function scopeColumns() {
        $student = new Student();
        
        $columns = Schema::getColumnListing($student->getTable());

        $exceptNames = [];
        array_push($exceptNames, array_search("columns_summ", $columns),
                                array_search("columns_amount", $columns),
                                array_search("created_at", $columns),
                                array_search("updated_at", $columns),
                                array_search("id", $columns)
        );
        foreach ($exceptNames as $name) {
            if (false !== $name) {
                unset($columns[$name]);
            }
        }

        $settings = new Collection();
        foreach ($columns as $key => $value) {
            $settings->push(['name' => $value, 'type' => Schema::getColumnType('students', $value)]);
        }
        return $settings;
    }

    // public function scopeForfillable() {
    //     $student = new Student();
    //     $columns = Schema::getColumnListing($student->getTable());;
    //     $fillable = [];

    //     $fillable = array_except($columns, [
    //             'id',
    //             'created_at',
    //             'updated_at',
    //     ]);

    //     return $fillable;
    // }


    // protected $fillable = [
    // 	'all_name',
    // 	'current_rating',
    // 	'visually',
    // 	'code',
    // 	'explanation',
    // 	'stability',
    // 	'presentation',
    // 	'questions',
    // 	'favorite_place',
    // 	'favoritism',
    // 	'print_out',
    // 	'english_pd',
    // 	'git',
    // 	'notes',
    //     'columns_summ',
    //     'columns_amount',
    // ];

}
