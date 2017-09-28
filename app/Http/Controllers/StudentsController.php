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
    		'visually' => 'nullable|regex:/^[0-5]$/',
    		'code' => 'nullable|regex:/^[0-5]$/',
    		'explanation' => 'nullable|regex:/^[0-5]$/',
    		'stability' => 'nullable|regex:/^[0-5]$/',
    		'presentation' => 'nullable|regex:/^[0-5]$/',
    		'questions' => 'nullable|regex:/^[0-5]$/',
    		'favorite_place' => 'nullable|regex:/^[0-5]$/',
    		'favoritism' => 'nullable|regex:/^[!@#$%^&*_+=<>?-]/',
    		'print_out' => 'nullable|string',
    		'english_pd' => 'nullable|string',
    		'git' => 'nullable|string',
    		'notes' => 'nullable|string'
    	];

        foreach ($request->marks as $mark) {
            $validator = Validator::make($mark, $rules);

            if ($validator->fails()) {
            	return response()->json($validator->errors(), 422);
            }

            $student = new Student();
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
            $studentAttributesForSumm = array_only($mark, [
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
            $student->fill($studentAttributesForSumm);
            // $student->all_name = $request->allName;
            $student->columns_summ = $result['columnSumm'];
            $student->columns_amount = $result['amountColumns'];
            $student->current_rating = $result['columnSumm'] / $result['amountColumns'];
            
            $student->save();
        }

    	return response()->json(['success' => true]);
    }

    public function sendStudents() {
        $students = Student::all();
        return response()->json($students);
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
    	return compact('columnSumm', 'amountColumns');
    }
}
