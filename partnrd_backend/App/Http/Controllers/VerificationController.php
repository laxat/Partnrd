<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\APIController;
use App\Models\User; 
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;


class VerificationController extends ApiController
{
    use VerifiesEmails; 

    public function __construct()
    {
        //$this->middleware('auth');
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    public function show()
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json('Email Verified');
        }
        else {
            return response()->json('Email not verified');
        } 
    }
    
    
    public function verify(Request $request): RedirectResponse
    {   
        $user = User::find($request->route('id')); 
        
        if($user->hasVerifiedEmail())
        {
            return redirect(config('frontend.url'). '/email/verify/failed'); 
        }
        
        if ($user->markEmailAsVerified()) {
            event(new Verified($request->user()));
            
        }
        return redirect(config('frontend.url') . '/email/verify/success');
        
    }


    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail())
        {
            return $this->responseUnprocessable('User has already been verified');
        }

        $request->user()->sendEmailVerificationNotification(); 

        return $this->responseSuccess('The notification has been resubmitted'); 
    }
}
