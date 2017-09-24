<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function store(Request $request)
    {

        $rules = [
    		'username' => 'required|unique:users,username|max:200',
    		'email' => 'required|email|unique:users,email',
    		'password' => 'required|min:3',
    		'passwordConfirmation' => 'required|min:3|same:password',
    		'timezone' => 'required'
    	];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
        	return response()->json($validator->errors(), 422);
        }

        $user = new User();
        $userAttributes = $request->only([
        	'username',
        	'email',
        	'timezone'
        ]);
        $user->fill($userAttributes);
        $user->usertype = User::TYPE_ADMIN;
        $user->fill([
        	'password' => Hash::make($request->password)
        ]);

        $user->save();

    	return response()->json(['success' => true]);
    }

    public function sendUser($identifier) {
    	$user = User::where('username', $identifier)->orWhere('email', $identifier)->get();
    	return response()->json($user);
    }

    public function authUser(Request $request) {
    	$user = User::where('username', $request->identifier)->orWhere('email', $request->identifier)->get();
    	foreach ($user as $data) {
	    	if (Hash::check($request->password, $data->password)) {
				$forever = "secretWord";
				$payload = JWTFactory::sub($data->username)->email($data->email)->forever($forever)->make();
				$token = JWTAuth::encode($payload);
	    		return response()->json(['token' => $token->get()]);
	    	}
    	}
    	return response()->json(['errors' => ['form' => 'Invalid Credentials']]);
    }

}

// export default function validateInput(data) {
//   let errors = {};

//   if (Validator.isEmpty(data.email)) {
//     errors.email = 'The email field is required';
//   }
//   if (!Validator.isEmail(data.email)) {
//     errors.email = 'Email is invalid';
//   }

//   if (Validator.isEmpty(data.username)) {
//     errors.username = 'The username field is required';
//   }

//   if (Validator.isEmpty(data.password)) {
//     errors.password = 'The password field is required';
//   }

//   if (Validator.isEmpty(data.passwordConfirmation)) {
//     errors.passwordConfirmation = 'The password confirmation field is required';
//   }

//   if (!Validator.equals(data.password, data.passwordConfirmation)) {
//     errors.passwordConfirmation = 'The password must match';
//   }

//   if (Validator.isEmpty(data.timezone)) {
//     errors.timezone = 'The timezone field is required';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors)
//   }
// }

// function validateInput(data, otherValidations) {
// 	let {errors} =otherValidations(data);
// 	return UserTypes.query({
// 		where: {typeId: data.typeId},
// 		orWhere: {typename: data.typename}
// 	}).fetch().then((type) => {
// 		if (type) {
// 			if (type.get('typename') === data.typename) {
// 				errors.typename = "There is type with such type-name!";
// 			}
// 			if (type.get('typeId') === data.typeId) {
// 				errors.typeId = "There is type with such identifier!";
// 			}
// 		}
// 		return {errors, isValid: isEmpty(errors)};
// 	});
// }

// router.post('/', (req, res) => {
// 	validateInput(req.body, commonValidations)
// 		.then(({errors, isValid}) => {
// 			if (isValid) {
// 				const {typename, typeId} = req.body;
// 				UserTypes.forge(
// 					{typename, typeId},
// 					{hasTimestamps: true}
// 				).save().then(type => res.json({success: true}))
// 				.catch(err => res.status(500).json({error: err}));
// 			} else {
// 				res.status(400).json(errors);
// 			}
// 		});
// });