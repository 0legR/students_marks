<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\StudentsSettings;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;

class StudentsController extends Controller
{
    public function storeStudent(Request $request)
    {
        $settings = Student::columns();
    	$rules = [
    		// 'all_name' => 'required|regex:/^[a-zA-Z ]+$/',
    		// 'visually' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		// 'code' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		// 'explanation' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		// 'stability' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		// 'presentation' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		// 'questions' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		// 'favorite_place' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		// 'favoritism' => 'nullable|regex:/^[!@#$%^&*_+=<>?-]/',
    		// 'print_out' => 'nullable|boolean',
    		// 'english_pd' => 'nullable|boolean',
    		// 'git' => 'nullable|boolean',
    		// 'notes' => 'nullable|string'
    	];

                
            
        foreach ($request->marks as $mark) {
            $floatColumnsNames = [];
            foreach ($settings as $set) {
                if (array_key_exists($set['name'], $mark)) {
                    if ($set['type'] === 'float' && $set['name'] !== 'current_rating') {
                        $rules = [
                            $set['name'] => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/'
                        ];
                        array_push($floatColumnsNames, $set['name']);
                    }
                    if ($set['type'] === 'string' && $set['name'] === 'all_name') {
                        $rules = [
                            $set['name'] => 'required|regex:/^[a-zA-Z ]+$/'
                        ];
                    }
                    if ($set['type'] === 'string') {
                        $rules = [
                            $set['name'] => 'nullable|string'
                        ];
                    }
                    if ($set['type'] === 'text') {
                        $rules = [
                            $set['name'] => 'nullable|regex:/^[!@#$%^&*_+=<>?-]/'
                        ];
                    }
                    if ($set['type'] === 'boolean') {
                        $rules = [
                            $set['name'] => 'nullable|boolean'
                        ];
                    }
                }
            }

            $validator = Validator::make($mark, $rules);

            if ($validator->fails()) {
            	return response()->json($validator->errors(), 422);
            }

            $studentAttributes = array_except($mark, [
                'id',
                'current_rating',
                'columns_summ',
                'columns_amount',
                'created_at',
                'updated_at',
                'isChecked',
                'current_rating_class'
            ]);

            $student = Student::updateOrCreate(['id' => $mark['id']], $studentAttributes);

            $studentAttributesForSumm = array_only($mark, $floatColumnsNames);

            $result = self::summColumns($studentAttributesForSumm);

            $student->fill($studentAttributes);
            
            if ($result) {
                $student->columns_summ = $result['columnSumm'];
                $student->columns_amount = $result['weigthSumm'];
                $student->current_rating = $result['columnSumm'] / $result['weigthSumm'];
            }

            $student->save();
        }

    	return response()->json(['success' => true]);
    }

    public function sendStudents() {
        $students = Student::all();
        return response()->json($students);
    }

    public function destroyStudents(Request $request)
    {
        try {
            foreach ($request->marks as $mark) {
                Student::destroy($mark['id']);            
            }
        } catch(\Illuminate\Database\QueryException $exception) {
                return response()->json($exception->errorInfo, 422);
        }
        return response()->json(['success' => true]);
    }

    protected function summColumns($attributes)
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

    public function sendStudentsSettings() {
        $settings = Student::columns();

        return response()->json(compact('settings'));
    }

    public function storeColumn(Request $request) {
        $rules = [
            'name' => 'required|regex:/^[a-z_]+$/',
            'type' => 'required_with:name|regex:/^[a-z_]+$/'
        ];

        $validator = Validator::make(['name' => $request->name, 'type' => $request->type], $rules);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (Schema::hasColumn('students', $request->prevName)) {
            try {
                if ($request->prevName !== $request->name) {
                    $validator = Validator::make(['name' => $request->name, 'type' => $request->type], $rules);

                    if ($validator->fails()) {
                        return response()->json($validator->errors(), 422);
                    }
                    Schema::table('students', function($table) use ($request){
                        $table->renameColumn($request->prevName, $request->name);
                    });
                    if ($request->prevType === $request->type && $request->prevType === 'float' && $request->prevName !== 'current_rating' && $request->name !== 'current_rating') {
                        $studentsSettings = StudentsSettings::where('name', $request->prevName)->first();
                        $studentsSettings->name = $request->name;
                        $studentsSettings->save();
                    }
                }
                if ($request->prevType !== $request->type) {
                    $validator = Validator::make(['name' => $request->name, 'type' => $request->type], $rules);

                    if ($validator->fails()) {
                        return response()->json($validator->errors(), 422);
                    }

                    Schema::table('students', function($table) use ($request){
                       
                        $table->{$request->type}($request->name)->nullable()->change();
                    });
                }

            } catch(\Illuminate\Database\QueryException $exception) {
                return response()->json($exception->errorInfo, 422);
            }
            return response()->json(['success' => true]);
        } else {
            try {
                Schema::table('students', function($table) use ($request){
                    $table->{$request->type}($request->name)->nullable();
                });
                $studentsSettings = new StudentsSettings();
                $studentsSettings->name = $request->name;
                $studentsSettings->save();
            } catch(\Illuminate\Database\QueryException $exception) {
                return response()->json($exception->errorInfo, 422);
            }
            return response()->json(['success' => true]);
        }
    }

    public function getColumn($identifier) {
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
            if ($columns[$key] === $identifier) {
                $settings->push(['name' => $value, 'type' => Schema::getColumnType('students', $value)]);
            }
        }
        return response()->json(compact('settings'));
    }

    public function destroyColumn(Request $request) {

        try {
            Schema::table('students', function ($table) use ($request) {
                $table->dropColumn($request->name);
            });
            StudentsSettings::where('name', $request->name)->delete();
        } catch(\Illuminate\Database\QueryException $exception) {
                return response()->json($exception->errorInfo, 422);
        }
        return response()->json(['success' => true]);
    }
}
