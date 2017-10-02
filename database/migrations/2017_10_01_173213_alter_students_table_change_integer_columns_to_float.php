<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterStudentsTableChangeIntegerColumnsToFloat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->float('visually', 2, 2)->nullable()->change();
            $table->float('code', 2, 2)->nullable()->change();
            $table->float('explanation', 2, 2)->nullable()->change();
            $table->float('stability', 2, 2)->nullable()->change();
            $table->float('presentation', 2, 2)->nullable()->change();
            $table->float('questions', 2, 2)->nullable()->change();
            $table->float('favorite_place', 2, 2)->nullable()->change();
            $table->boolean('print_out')->nullable()->change();
            $table->boolean('english_pd')->nullable()->change();
            $table->boolean('git')->nullable()->change();
            $table->float('columns_summ', 2, 2)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->integer('visually')->nullable()->change();
            $table->integer('code')->nullable()->change();
            $table->integer('explanation')->nullable()->change();
            $table->integer('stability')->nullable()->change();
            $table->integer('presentation')->nullable()->change();
            $table->integer('questions')->nullable()->change();
            $table->integer('favorite_place')->nullable()->change();
            $table->string('print_out')->nullable()->change();
            $table->string('english_pd')->nullable()->change();
            $table->string('git')->nullable()->change();
            $table->integer('columns_summ')->nullable()->change();
        });
    }
}
