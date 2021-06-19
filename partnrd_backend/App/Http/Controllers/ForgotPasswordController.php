<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\APIController;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Validator;
 


class ForgotPasswordController extends ApiController
{
    use SendsPasswordResetEmails;

        public function forgot(Request $request)
        {

            $validator = Validator::make(
            $request->only('email'),
            ['email' => 'required|string|email|max:255|exists:users,email'],
            ['exists' => "We couldn't find an account with that email."]
        );
            if ($validator->fails()) {
                return $this->responseUnprocessable("We couldn't find an account with that email.");
            }

            $response = $this->sendResetLinkEmail($request);

            if ($response) {
                return $this->responseSuccess('Email reset link sent.');
            } else {
                return $this->responseServerError();
            }
        }   



    // public function forgot(Request $request) 
    // {
    //     $credentials = $request->validate(
    //         ['email' => 'required|string|email'],
    //     );

    //     if ($validator->fails()) {
    //         return $this->responseUnprocessable($validator->errors());
    //     }
            
    //     $response = Password::sendResetLink($credentials);

    //     if ($response) {
    //         return $this->responseSuccess('Email reset link sent.');
    //     } else {
    //         return $this->responseServerError();
    //     }
    // }

}
