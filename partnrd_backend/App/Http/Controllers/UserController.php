<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\User; 
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UserResource; 
use App\Http\Resources\UserCollection; 

class UserController extends ApiController
{

   public function list(Request $request)
   {
       $users = User::all(); 

        $request->filter;
        $request->order;
        $request->page;
        $request->perPage;
        $request->sort;

       $result = new UserCollection($users); 

       return $this->sendResponse($result, 'Users found');  
   }

   public function show(Request $request, $id)
   {
       $user = User::find($id); 

       if(is_null($user))
       {
           return $this->responseUnprocessable('User not found'); 
       }

       $result = new UserResource($user); 

       return $this->sendResponse($result, 'User found'); 

   }

   public function currUser(Request $request){
       
    $user = Auth::user();

    $result = new UserResource($user); 
    return $this->sendResponse($result, 'User Found'); 
   }

   public function store(Request $request)
   {
       $input  = $request->all(); 
       $validator = Validator::make($input, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users', 
            'password' => 'required|string|min:8'
       ]); 

       if($validator->fails())
       {
           return $this->responseUnprocessable($validator->errors()); 
       }

       $user = $this->create($input); 
       $result = new UserResource($user);

    return $this->sendResponse($result, 'User saved'); 
   }

    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'verified' => $data['verified'], 
            'role' => $data['role']
        ]);
    }

   public function update(Request $request, $id)
   {
       $validator = Validator::make($request->all(), [
            'name' => 'string| min: 1',
            'password' => 'required|string'
       ]); 

       if($validator->fails())
       {
           return $this->responseUnprocessable($validator->errors(), "validation"); 
       }
       $user = User::find($id); 
       
       try{
        if($user){
            if(request('name')){
                if(Hash::check(request('password'), $user->password)) {
                    $user->name = request('name');
                }
                else{
                    return $this->responseUnauthorized("Password is incorrect"); 
                }
            }
            if(request('email')){
                
                if($request->email === $user->email){
                    if(Hash::check(request('password'), $user->password)) {
                        $user->email = request('email');
                    }
                    else{
                        return $this->responseUnauthorized("Password is incorrect"); 
                    }
                }
                else
                {
                    $validator = Validator::make($request->all(), [
                        'email' => 'email|unique:users', 
                    ]); 

                    if($validator->fails())
                    {
                        return $this->responseUnprocessable("This email is already taken", "email"); 
                    }

                    if(Hash::check(request('password'), $user->password)) {
                        $user->email = request('email');
                    }
                    else{
                        return $this->responseUnauthorized("Password is incorrect"); 
                    }
                }

            }
            if(request('new_password')){
                $validator = Validator::make($request->all(), [
                    'password' => 'required|string',
                    'new_password' => 'required|min:8|string|different:password',
                    'conf_password' => 'required|same:new_password'
                ], [
                    'new_password.required' => 'The new password field is required',
                    'conf_password.required' => 'Please repeat the new password',
                    'conf_password.same:new_password' => 'The new password confirmation does not match', 
                ]); 
                if($validator->fails())
                {
                    return $this->responseUnprocessable($validator->errors(), "password"); 
                }
                if(Hash::check($request->password, $user->password)) {
                    $user->password = Hash::make(request('new_password'));
                }
                else{
                    return $this->responseUnauthorized("Password is incorrect "); 
                }
            }
            $user->save(); 
            return $this->sendResponse(new UserResource($user), 'User Saved');
       }
       else {
         return $this->responseUnauthorized("This is not the current user");   
       }
       }catch(Excdeption $e){
           return $this->responseServerError('Error updating user'); 
       }
   
   }

   public function destory(Request $request, $id)
   {
        $user = User::find($id); 

        if(is_null($user))
        {
            return $this->responseUnprocessable('User not found'); 
        }
        $user->delete(); 
        return $this->sendResponse(new UserResource($user), "User Deleted"); 
   }
}
