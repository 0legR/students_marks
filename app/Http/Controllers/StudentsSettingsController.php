<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentsSettings;
use Illuminate\Support\Facades\Validator;

class StudentsSettingsController extends Controller
{
    public function sendStudentsWeigth()
    {
        StudentsSettings::columns();
        $weigth = StudentsSettings::all();
        return response()->json($weigth);
    }

    public function getWeigth($id)
    {
        StudentsSettings::columns();
    	$weigth = $StudentsSettings::find($id);
    	return response()->json($weigth);
    }

    public function storeWeigth(Request $request)
    {
    	StudentsSettings::columns();
    	$rules = [
    		'weigth' => 'required|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/'
    	];

    	$validator = Validator::make($request, $rules);

    	if ($validator->fails()) {
        	return response()->json($validator->errors(), 422);
        }

        $studentsSettings = StudentsSettings::find($request->id);

		$studentsSettings->weigth = $request->weigth;

		$studentsSettings->save();

		return response()->json(['success' => true]);
    }

    public function destroyWeigth($id)
    {
    	StudentsSettings::columns();
    	$weigth = $StudentsSettings::find($id);
    	try {
    		StudentsSettings::destroy($id);	
    	} catch(\Illuminate\Database\QueryException $exception) {
                return response()->json($exception->errorInfo, 422);
        }
        return response()->json(['success' => true]);
    }
}
