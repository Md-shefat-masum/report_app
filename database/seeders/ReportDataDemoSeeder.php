<?php

namespace Database\Seeders;

use App\Models\ReportColumn;
use App\Models\ReportData;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ReportDataDemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_id = 1;
        $col_ids = ReportColumn::where('default',1)->get();

        ReportData::truncate();
        for ($i=0; $i < 24; $i++) {
            $date = Carbon::parse('2022-03-'.($i+1))->toDateTimeString();
            foreach ($col_ids as $col) {
                $report = new ReportData();
                $report->user_id = $user_id;
                $report->column_id = $col->id;
                $report->date = $date;
                if($col->value_type == 'number'){
                    $report->value = rand(5,10);
                }
                if($col->value_type == 'time'){
                    $report->value = rand(30*60,60*60);
                }
                if($col->value_type == 'boolean'){
                    $report->value = rand(0,1);
                }
                $report->save();
            }
        }
    }
}
