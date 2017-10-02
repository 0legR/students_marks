<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;

class StudentsController extends Controller
{
    public function storeStudent(Request $request)
    {
    	$rules = [
    		'all_name' => 'required|regex:/^[a-zA-Z ]+$/',
    		'visually' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		'code' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		'explanation' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		'stability' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		'presentation' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		'questions' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		'favorite_place' => 'nullable|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/',
    		'favoritism' => 'nullable|regex:/^[!@#$%^&*_+=<>?-]/',
    		'print_out' => 'nullable|boolean',
    		'english_pd' => 'nullable|boolean',
    		'git' => 'nullable|boolean',
    		'notes' => 'nullable|string'
    	];

        foreach ($request->marks as $mark) {
            $validator = Validator::make($mark, $rules);

            if ($validator->fails()) {
            	return response()->json($validator->errors(), 422);
            }
            $studentAttributes = array_only($mark, [
                'visually',
                'code',
                'explanation',
                'stability',
                'presentation',
                'questions',
                'favorite_place',
                'all_name',
                'favoritism',
                'print_out',
                'english_pd',
                'git',
                'notes'
            ]);

            $student = Student::updateOrCreate(['id' => $mark['id']], $studentAttributes);

            $studentAttributesForSumm = array_only($mark, [
            	'visually',
            	'code',
            	'explanation',
            	'stability',
            	'presentation',
            	'questions',
            	'favorite_place'
            ]);
            $result = self::summColumns($studentAttributesForSumm);

            $student->fill($studentAttributes);
            
            if ($result) {
                $student->columns_summ = $result['columnSumm'];
                $student->columns_amount = $result['amountColumns'];
                $student->current_rating = $result['columnSumm'] / $result['amountColumns'];
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
    	$attrForSumm = [];
    	$amountColumns = 0;
    	foreach($attributes as $attr) {
    		if (!empty($attr)) {
    			array_push($attrForSumm, intval($attr));
    			$amountColumns++;
    		}
    	}

    	$columnSumm = array_sum($attrForSumm);
    	return $amountColumns !== 0 ? compact('columnSumm', 'amountColumns') : false;
    }
}
