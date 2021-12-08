<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgreementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agreements', function (Blueprint $table) {
            
            $table->increments('id'); 
            $table->string('name', 255); 
            $table->string('owner', 255);
            $table->json('data')->nullable(); 
            $table->string('status', 255); 
            $table->boolean('editable'); 
            $table->timestamps(); 


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('agreements'); 
    }
}
