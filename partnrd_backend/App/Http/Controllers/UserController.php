<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\User; 
use Illuminate\Support\Facades\Hash;
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
       $input  = $request->all(); 
       $validator = Validator::make($input, [
            'name' => 'required|string',
            //'email' => 'required|email|unique:users', 
            'password' => 'required|string|min:8'
       ]); 

       if($validator->fails())
       {
           return $this->responseUnprocessable($validator->errors()); 
       }
    
       $user = User::find($id); 

       $user->name = $input['name']; 
       $user->email = $input['email']; 
       $user->password = Hash::make($input['password']);
       $user->verified = $input['verified'];
       $user->role = $input['role']; 
       $user->save(); 


       return $this->sendResponse(new UserResource($user), 'User Saved');
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
