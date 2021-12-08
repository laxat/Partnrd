<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\AgreementResource; 
use App\Http\Resources\AgreementCollection; 
use App\Http\Controllers\ApiController;
use App\Models\Agreement; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AgreementController extends ApiController
{

    public function index(Request $request)
    {
        $user = auth()->guard('api')->user()->id; 

        if(!$user){
            return $this->responseUnauthorized(); 
        }
        
        $index = Agreement::where('owner', $user)->get(); 
        return new AgreementCollection($index);
    }
    public function store(Request $request)
   {
       $input  = $request->all(); 

       $agreement = $this->create($input); 
       $result = new AgreementResource($agreement);

    return $this->sendResponse($result, 'Agreement saved'); 
   }

    protected function create(array $data)
    {
        return Agreement::create([
            'name' => $data['name'],
            'owner' => auth()->guard('api')->user()->id,
            'data'=>json_encode($data['data']), 
            'editable'=> true, 
            'status' => 'DRAFTED'
        ]);
    }

    public function show(Request $request, $id)
    {

        $user = auth()->guard('api')->user()->id; 

        if(!$user){
            return $this->responseUnauthorized(); 
        }

        $agreements = Agreement::where('id', $id)->get(); 
        
        if(count($agreements) === 0){
            return $this->responseUnprocessable("Agreement Not Found"); 
        }
        else{

        return $this->sendResponse(new AgreementCollection($agreements), 'Found Stuff'); 
        }
    }

    public function update(Request $request, $id)
    {
        $user = auth()->guard('api')->user()->id; 

        if(!$user){
            return $this->responseUnauthorized(); 
        }

        $validator  = Validator::make($request->all(), [
            'name' => 'string',
            'status'=> 'in:DRAFTED, SIGNED, UNSIGNED',
            'editable' => 'boolean'
        ]); 

        if($validator->fails()){
            return $this->responseUnprocessable($validator->errors()); 

        }

        $agreement = Agreement::where('id', $id)->get()[0]; 

        if($agreement->owner != $user){
            return $this->responseUnauthorized("Hello"); 
        }

        try{
            if($agreement->owner == $user){
                if(request('name')) {
                    $agreement->name = request('name'); 
                }
                if(request('status')){
                    $agreement->status = request('status'); 
                }
                if(request('editable')){
                    $agreement->editable = request('editable');
                }
                $agreement->save(); 
                return $this->responseResourceUpdated(); 

            }else{
                return $this->responseUnauthorized("Hello"); 
            }
        }catch(Exception $e){
            return $this->responseServerError('Error updating error'); 
        }
    }

    public function destroy(Request $request, $id)
    {
        $user = auth()->guard('api')->user()->id; 

        if(!$user){
            return $this->responseUnauthorized(); 
        }

        $agreements = Agreement::where('id', $id)->get(); 
        //print($user);

        if($agreements[0]->owner != $user){
            return $this->responseUnauthorized(); 
        }

        try{
            $agreements[0]->delete(); 
            return $this->responseResourceDeleted("delete"); 
        }catch (Exception $e){
            return $this->responseServerError('Error deleting resources'); 
        }
    }
}
