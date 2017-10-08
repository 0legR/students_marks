<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use App\Models\Student;

class StudentsSettings extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at'
    ];

    public function scopeColumns() {
        $student = new Student();
        $studentsSettings = StudentsSettings::all();
        
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
        	if (Schema::getColumnType('students', $value) === 'float') {
        		 if ($studentsSettings->name !== $value) {
        		 	$studentsSettings->name = $value;
        		 	$studentsSettings->save();
        		 }
        	}
        }
    }
}
