<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Models\MonthlyPlan;
use App\Models\YearlyPlan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportPlanController extends Controller
{
    protected $date;
    public function __construct() {
        $this->date = Carbon::parse(request()->date);
    }

    public function get_yearly_plan(Request $request)
    {
        $plan = YearlyPlan::where('user_id',Auth::user()->id)->whereYear('year',$this->date->format('Y'))->first();
        if(!$plan){
            $plan = new YearlyPlan();
        }

        return response()->json($plan);
    }

    public function set_yearly_plan(Request $request)
    {
        $plan = YearlyPlan::where('user_id',Auth::user()->id)->whereYear('year',$this->date->format('Y'))->first();
        $data = $request->except('date');
        $data['user_id'] = Auth::user()->id;
        $data['year'] = $this->date->toDateTimeString();
        if(!$plan){
            $plan = YearlyPlan::create($data);
        }else{
            $plan->fill($data)->save();
        }
        return $plan;
    }
    public function get_monthly_plan(Request $request)
    {
        $plan = MonthlyPlan::where('user_id',Auth::user()->id)->whereMonth('month',$this->date->month)->whereYear('month',$this->date->year)->first();
        if(!$plan){
            $plan = new MonthlyPlan();
        }

        return response()->json($plan);
    }

    public function set_monthly_plan(Request $request)
    {
        $plan = MonthlyPlan::where('user_id',Auth::user()->id)->whereMonth('month',$this->date->month)->whereYear('month',$this->date->year)->first();
        $data = $request->except('date');
        $data['user_id'] = Auth::user()->id;
        $data['month'] = $this->date->toDateTimeString();
        if(!$plan){
            $plan = MonthlyPlan::create($data);
        }else{
            $plan->fill($data)->save();
        }
        return $plan;
    }
}
