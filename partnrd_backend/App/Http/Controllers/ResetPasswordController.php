<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\APIController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Foundation\Auth\ResetsPasswords;
use App\Models\User;


class ResetPasswordController extends ApiController
{
    use ResetsPasswords;

    public function __construct()
    {
        $this->middleware('guest');
    }


    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    public function reset(Request $request)
    {

        if ($request->id) {
            // If request contains an id, we'll use that to fetch email.
            $user = User::where('id', $request->id)->first();
            if ($user) {
                $request->request->add(['email' => $user->email]);
            }
        }

        $validator = Validator::make(
            $request->all(),
            $this->rules(),
            $this->validationErrorMessages()
        );

        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $response = $this->broker()->reset(
            $this->credentials($request),
            function ($user, $password) {
                $this->resetPassword($user, $password);
            }
        );

        if ($response == Password::PASSWORD_RESET) {
            return $this->responseSuccess('Password reset successful.');
        } else {
            return $this->responseServerError('Password reset failed.');
        }
    }

}
