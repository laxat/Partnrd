<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; 
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\APIController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use App\Http\Controllers\VerificationController;

use Carbon\Carbon; 

class AuthController extends ApiController
{
    use ThrottlesLogins; 

    public function client_register(Request $request)
    {

        $validator = Validator::make(
            $request->only('name', 'email', 'password' ),[
            'name' => 'required|string',
            'email' => 'required|email|unique:users', 
            'password' => 'required|string|min:8'
        ]);
        
        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        try {
            $user = $this->create($request->all(), 'Client');
            $user->sendEmailVerificationNotification(); 
            return $this->responseSuccess('Registered successfully.');
        } catch (Exception $e) {
            return $this->responseServerError('Registration error.');
        }
    }

    public function  law_register()
    {
        $validator = Validator::make(
            $request->only('name', 'email', 'password' ),[
            'name' => 'required|string',
            'email' => 'required|email|unique:users', 
            'password' => 'required|string|min:8'
        ]);
        
        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        try {
           $user = $this->create($request->all(), 'Lawyer');
           $user->sendEmailVerificationNotification(); 
           return $this->responseSuccess('Registered successfully.');
        } catch (Exception $e) {
            return $this->responseServerError('Registration error.');
        }  

    }
    
      protected function create(array $data, $role)
    {
        if ($role == 'Lawyer'){
            $verified = 0; 
        }
        else{
            $verified = 1; 
        }
        
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'verified' => $verified, 
            'role' => $role

        ]);
    }

    public function login(Request $request)
    {
        
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            return $this->responseUnprocessable('Account Locked, Too many Logins'); 
    }
        
        $request->validate([
           'email' => 'required|email|exists:users,email',
           'password' => 'required',
        ]); 

        $credentials = request(['email', 'password']); 


        if(!Auth::attempt($credentials))
        {
            $this->incrementLoginAttempts($request);

            return $this->responseUnauthorized("Invalid Credentials");
        }

        $user = $request->user();

        if(!$user->hasVerifiedEmail()){

            $user->sendEmailVerificationNotification(); 
            return $this->responseUnauthorized("This email is unverified, 
            verification email has been resent", "verified");

        }

        $tokenResult = $user->createToken('Personal Access Token'); 
        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addWeeks(1); 
        $token->save(); 

        $this->clearLoginAttempts($request);

        return response()->json([
            'user' => Auth::user(), 
            'access_token' =>$tokenResult->accessToken,
            'token_type' => 'Bearer', 
            'expires_at' => Carbon::parse($tokenResult->token->expires_at)
        ]);

    }

    public function username()
    {
        return 'email';
    }  
    
    public function maxAttempts()
    {
        //Lock out on 5th Login Attempt
        return 5;
    }

    public function decayMinutes()
    {
        //Lock for a day
        return 3600;
    }

 }
