<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentsSettings;
use Illuminate\Support\Facades\Validator;

class StudentsSettingsController extends Controller
{
    public function sendStudentsWeigth()
    {
        $weigth = StudentsSettings::all();
        return response()->json($weigth);
    }

    public function getWeigth($id)
    {
    	$weigth = StudentsSettings::find($id);
    	return response()->json($weigth);
    }

    public function storeWeigth(Request $request)
    {
    	$rules = [
    		'weigth' => 'required|regex:/^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/'
    	];

    	$validator = Validator::make(['weigth' => $request->weigth], $rules);

    	if ($validator->fails()) {
        	return response()->json($validator->errors(), 422);
        }

        $studentsSettings = StudentsSettings::find($request->id);

		$studentsSettings->weigth = $request->weigth;

		$studentsSettings->save();

		return response()->json(['success' => true]);
    }
}
