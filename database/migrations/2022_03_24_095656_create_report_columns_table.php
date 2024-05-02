<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportColumnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report_columns', function (Blueprint $table) {
            $table->id();
            // $table->integer('user_id')->nullable();
            $table->tinyInteger('default')->default(0);
            $table->bigInteger('creator')->nullable();
            $table->bigInteger('parent')->nullable();
            $table->string('en_name',100)->nullable();
            $table->string('bn_name',100)->nullable();
            $table->tinyInteger('visibility')->default(1);
            $table->string('input_type',100)->nullable();
            $table->string('value_type',100)->nullable();

            $table->string('slug',50)->nullable();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();

            // $table->string('surah',100)->nullable();
            // $table->integer('ayat_amount')->nullable();

            // $table->string('hadith_sub',100)->nullable();
            // $table->integer('hadith_amount')->nullable();

            // $table->integer('islami_sahitto')->nullable();
            // $table->integer('other_sahitto')->nullable();

            // $table->float('reading_time')->nullable();
            // $table->tinyInteger('class_present')->default(0);

            // $table->integer('salat_jamat')->nullable();
            // $table->integer('salat_kaja')->nullable();

            // $table->integer('member')->nullable();
            // $table->integer('associate')->nullable();
            // $table->integer('worker')->nullable();
            // $table->integer('supporter')->nullable();

            // $table->integer('friend')->nullable();
            // $table->integer('merit_student')->nullable();
            // $table->integer('book_distribution')->nullable();
            // $table->integer('good_wishers')->nullable();

            // $table->float('dawati_kaj')->nullable();
            // $table->float('sangothonik_kaj')->nullable();

            // $table->tinyInteger('newspaper')->default(0);
            // $table->tinyInteger('exercise')->default(0);
            // $table->tinyInteger('self_analysis')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('report_columns');
    }
}
