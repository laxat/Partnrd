<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AgreementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name, 
            'owner'=>$this->owner, 
            'send-to'=>$this->send_to, 
            'editable'=>$this->editable,
            'data'=>$this->data, 
            'status'=>$this->status,
            'created_at'=>$this->created_at->format('Y-m-d')
        ];
    }
}
