<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->increments('id');
            $table->string('all_name');
            $table->double('current_rating', 15, 9)->nullable();
            $table->integer('visually')->nullable();
            $table->integer('code')->nullable();
            $table->integer('explanation')->nullable();
            $table->integer('stability')->nullable();
            $table->integer('presentation')->nullable();
            $table->integer('questions')->nullable();
            $table->integer('favorite_place')->nullable();
            $table->string('favoritism')->nullable();
            $table->string('print_out')->nullable();
            $table->string('english_pd')->nullable();
            $table->string('git')->nullable();
            $table->string('notes')->nullable();
            $table->integer('columns_summ')->nullable();
            $table->integer('columns_amount')->nullable();
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
        Schema::dropIfExists('students');
    }
}
