<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use App\Models\StudentsSettings;

class Student extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at'
    ];

    public function scopeColumns()
    {
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
    
    public static function calculation($attributes)
    {
        $columnsWeigth = StudentsSettings::all();
        $attributesWeigth = [];
        foreach ($columnsWeigth as $columnWeigth) {
            $attributesWeigth[$columnWeigth->name] = $columnWeigth->weigth;
        }
        $weigthSumm = array_sum($attributesWeigth);
        
        $attrForSumm = [];
        $amountColumns = 0;

        foreach($attributes as $key => $attr) {
            if (!empty($attr)) {
                $attrForSumm[$key] = $attributesWeigth[$key] * $attr;
                $amountColumns++;
            }
        }
    
        $columnSumm = array_sum($attrForSumm);
        return $amountColumns !== 0 ? compact('columnSumm', 'weigthSumm') : false;
    }

    public static function calculationUpdate()
    {
        $students = Student::all();
        $settings = Student::columns();
        
        foreach ($students as $student) {
            $floatColumnsNames = [];
            $studentAttributes = [];
            foreach ($settings as $set) {
                $studentArray = $student->toArray();
                if (array_key_exists($set['name'], $studentArray)) {
                    if ($set['type'] === 'float' && $set['name'] !== 'current_rating') {
                        array_push($floatColumnsNames, $set['name']);
                    }
                }
            }
            $studentAttributes = array_except($studentArray, [
                'id',
                'current_rating',
                'columns_summ',
                'columns_amount',
                'created_at',
                'updated_at',
                'isChecked',
                'current_rating_class'
            ]);

            $student = Student::updateOrCreate(['id' => $studentArray['id']], $studentAttributes);

            $studentAttributesForSumm = array_only($studentArray, $floatColumnsNames);

            $result = $student->calculation($studentAttributesForSumm);

            $student->fill($studentAttributes);
            
            if ($result) {
                $student->columns_summ = $result['columnSumm'];
                $student->columns_amount = $result['weigthSumm'];
                $student->current_rating = $result['columnSumm'] / $result['weigthSumm'];
            }

            $student->save();
        }
    }

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
