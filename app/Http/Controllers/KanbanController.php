<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class KanbanController extends Controller
{
    public function getUsers()
    {
    	$customers = User::all();

    	return response()->json($customers);
    }
}
