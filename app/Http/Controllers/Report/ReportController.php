<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Models\ModaratorSugessionToUser;
use App\Models\MonthlyReport;
use App\Models\ReportColumn;
use App\Models\ReportData;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    protected $given_date;
    protected $date;
    protected $month;
    protected $year;
    protected $report_body;
    protected $user_id;
    protected $from_date;
    protected $to_date;

    public function __construct()
    {
        if (request()->has('date')) {
            $this->given_date = Carbon::parse(request()->date);
            $this->date = Carbon::parse(request()->date);
            $this->month = $this->given_date->format('m');
            $this->year = $this->given_date->format('Y');
        }
        if (request()->has('month')) {
            $this->given_date = Carbon::parse(request()->month);
            $this->date = Carbon::parse(request()->month);
            $this->month = $this->given_date->format('m');
            $this->year = $this->given_date->format('Y');
        }
        if (request()->has('from_date')) {
            $this->from_date = Carbon::parse(request()->from_date);
        }
        if (request()->has('to_date')) {
            $this->to_date = Carbon::parse(request()->to_date);
        }

        $this->user_id = request()->user_id;
        $this->report_body = [];
    }

    public function update_daily_report(Request $request)
    {
        $report = ReportData::where('user_id',auth()->user()->id)
            ->where('column_id',$request->column_id)
            ->whereDate('date', $request->date)
            ->first();
        if($report){
            $report->fill($request->all());
        }else{
            $report = new ReportData();
            $report->user_id = $request->user_id;
            $report->column_id = $request->column_id;
            $report->date = $request->date;
            $report->value = $request->value;
        }
        if ($request->value >= 0) {
            $report->save();
        }
        return response()->json([
            'message' => 'updated',
            // 'report_column' => $this->get_report_column(),
            'report_column' => [],
        ]);
    }

    public function make_report_body(Request $request)
    {
        $this->make_cell_report();

        $report = [
            'day' => $this->given_date->format('d'),
            'bn_day' => $this->convert($this->given_date->format('d')),

            'day_name' => $this->given_date->format('D'),
            'bn_day_name' => $this->convert($this->given_date->format('D')),

            'month_name' => $this->given_date->format('F'),
            'bn_month_name' => $this->convert($this->given_date->format('F')),

            'year_name' => $this->given_date->format('Y'),
            'bn_year_name' => $this->convert($this->given_date->format('Y')),

            'report_column' => $this->get_report_column(),
            'report_body' => $this->report_body,
        ];

        // dd($report['report_column'][0]->toArray());

        return response()->json($report);
    }

    public function make_cell_report()
    {
        $total_days = cal_days_in_month(CAL_GREGORIAN, $this->month, $this->year);
        for ($i = 1; $i <= $total_days; $i++) {
            $temp_days = [

                'day' => $this->parse_date($i)->format('d'),
                'bn_day' => $this->convert($this->parse_date($i)->format('d')),

                'day_name' => $this->parse_date($i)->format('D'),
                'bn_day_name' => $this->convert($this->parse_date($i)->format('D')),

                'month_name' => $this->parse_date($i)->format('F'),
                'bn_month_name' => $this->convert($this->parse_date($i)->format('F')),

                'year_name' => $this->parse_date($i)->format('Y'),
                'bn_year_name' => $this->convert($this->parse_date($i)->format('Y')),

                'is_friday' => $this->parse_date($i)->format('D') == 'Fri' ? true : false,
                'is_today' => $this->parse_date($i)->format('d-m-y') == Carbon::today()->format('d-m-y') ? true : false,

                'report' => $this->make_day_report($this->year, $this->month, $i, $this->user_id),
            ];
            array_push($this->report_body, $temp_days);
        }
    }

    public function make_day_report($year, $month, $day, $user_id)
    {
        $date = $this->parse_date($day);
        $check = ReportData::where('user_id', $user_id)
            ->whereMonth('date', $date)
            ->whereYear('date', $date)
            ->whereDay('date', $date)
            ->exists();
        if (!$check && $user_id) {
            $this->create_empty_cell($year, $month, $day, $user_id);
        }
        $columns = ReportColumn::where('parent', 0)
            ->where('default', 1)
            ->select(['id', 'default', 'parent', 'en_name', 'bn_name', 'visibility', 'input_type', 'value_type'])
            ->with([
                'childrens' => function ($q) use ($year, $month, $day, $user_id) {
                    $q->where('status', 1)
                        ->select(['id', 'default', 'parent', 'en_name', 'bn_name', 'visibility', 'input_type', 'value_type'])
                        ->with([
                            'onday_report_data' => function ($q) use ($year, $month, $day, $user_id) {
                                $q->whereYear('date', $year)
                                    ->whereMonth('date', $month)
                                    ->whereDay('date', $day)
                                    ->where('user_id', $user_id)
                                    ->select(['id', 'user_id', 'column_id', 'date', 'value']);
                            },
                            'user_col_visibility' => function ($q) use ($year, $month, $day, $user_id) {
                                $q->where('user_id', $user_id)
                                    ->select('id', 'user_id', 'column_id', 'visibility');
                            },
                        ]);
                },
                'onday_report_data' => function ($q) use ($year, $month, $day, $user_id) {
                    $q->whereYear('date', $year)
                        ->whereMonth('date', $month)
                        ->whereDay('date', $day)
                        ->where('user_id', $user_id)
                        ->select(['id', 'user_id', 'column_id', 'date', 'value']);
                },
                'user_col_visibility' => function ($q) use ($year, $month, $day, $user_id) {
                    $q->where('user_id', $user_id)
                        ->select('id', 'user_id', 'column_id', 'visibility');
                },
            ])
            ->get();
        return $columns->toArray();
    }

    public function create_empty_cell($year, $month, $day, $user_id)
    {
        $col_ids = ReportColumn::get();
        foreach ($col_ids as $col) {
            $report = new ReportData();
            $report->user_id = $user_id;
            $report->column_id = $col->id;
            $report->date = $this->parse_date($day)->toDateTimeString();
            $report->value = null;
            $report->save();
        }
        // dd($report, $year, $month, $day, $user_id);
    }

    public function get_report_column()
    {
        $user_id = $this->user_id;
        $year = $this->year;
        $month = $this->month;
        $fields = ['id', 'default', 'parent', 'en_name', 'bn_name', 'visibility', 'input_type', 'value_type'];
        return ReportColumn::where('parent', 0)
            ->where('default', 1)
            ->where('visibility', 1)
            ->select($fields)
            ->with([
                'childrens' => function ($q) use ($year, $month, $user_id, $fields) {
                    $q->where('status', 1)
                        ->select($fields)
                        ->withSum(['sum_of_report_data' => function ($q) use ($year, $month, $user_id) {
                            $q->where('user_id', $user_id)
                                ->whereYear('date', $year)
                                ->whereMonth('date', $month);
                        }], 'value');
                    // ->with([
                    //     'user_col_visibility' => function ($q) use ($user_id) {
                    //         $q->where('user_id', $user_id)
                    //             ->select('id', 'user_id', 'column_id', 'visibility');
                    //     },
                    // ]);
                },
                // 'user_col_visibility' => function ($q) use ($user_id) {
                //     $q->where('user_id', $user_id)
                //         ->select('id', 'user_id', 'column_id', 'visibility');
                // },
            ])
            ->withSum(['sum_of_report_data' => function ($q) use ($year, $month, $user_id) {
                $q->where('user_id', $user_id)
                    ->whereYear('date', $year)
                    ->whereMonth('date', $month)
                    ->where('user_id', $user_id);
            }], 'value')
            ->get();
    }

    public function parse_date($day)
    {
        $date = $this->year . '-' . $this->month . '-' . $day;
        return Carbon::parse($date);
    }

    public function get_report_column_total($date)
    {
        $user_id = $this->user_id;
        return ReportColumn::where('parent', 0)
            ->where('default', 1)
            ->select(['id', 'default', 'parent', 'en_name', 'bn_name', 'visibility'])
            ->with([
                'childrens' => function ($q) use ($date, $user_id) {
                    $q->where('status', 1)
                        ->select(['id', 'default', 'parent', 'en_name', 'bn_name', 'visibility'])
                        ->with(['onday_report_data' => function ($q) use ($date, $user_id) {
                            $q->where('user_id', $user_id)
                                ->whereYear('date', $date->year)
                                ->whereMonth('date', $date->month)
                                ->whereDay('date', $date->day);
                        }])
                        ->with([
                            'user_col_visibility' => function ($q) use ($user_id) {
                                $q->where('user_id', $user_id)
                                    ->select('id', 'user_id', 'column_id', 'visibility');
                            },
                        ]);
                },
                'user_col_visibility' => function ($q) use ($user_id) {
                    $q->where('user_id', $user_id)
                        ->select('id', 'user_id', 'column_id', 'visibility');
                },
            ])
            ->with(['onday_report_data' => function ($q) use ($date, $user_id) {
                $q->where('user_id', $user_id)
                    ->whereYear('date', $date->year)
                    ->whereMonth('date', $date->month)
                    ->whereDay('date', $date->day);
            }])
            ->get();
    }

    public function get_report_column_total_sum_between_two_date()
    {
        $user_id = $this->user_id;
        $from = $this->from_date;
        $to = $this->to_date;
        return ReportColumn::where('parent', 0)
            ->where('default', 1)
            ->select(['id', 'default', 'parent', 'en_name', 'bn_name', 'visibility'])
            ->with([
                'childrens' => function ($q) use ($from, $to, $user_id) {
                    $q->where('status', 1)
                        ->select(['id', 'default', 'parent', 'en_name', 'bn_name', 'visibility'])
                        ->withSum(['onday_report_data' => function ($q) use ($from, $to, $user_id) {
                            $q->where('user_id', $user_id)
                                ->whereBetween('date', [$from, $to]);
                        }], 'value')
                        ->with([
                            'user_col_visibility' => function ($q) use ($user_id) {
                                $q->where('user_id', $user_id)
                                    ->select('id', 'user_id', 'column_id', 'visibility');
                            },
                        ]);
                },
                'user_col_visibility' => function ($q) use ($user_id) {
                    $q->where('user_id', $user_id)
                        ->select('id', 'user_id', 'column_id', 'visibility');
                },
            ])
            ->withSum(['onday_report_data' => function ($q) use ($from, $to, $user_id) {
                $q->where('user_id', $user_id)
                    ->whereBetween('date', [$from, $to]);
            }], 'value')
            ->get();
    }

    public function get_monthly_report(Request $request)
    {
        $report_column = $this->get_report_column();
        $column_report = [];
        foreach ($report_column as $item) {
            if ($item->childrens->count()) {
                foreach ($item->childrens as $child) {
                    $column_report[$item->en_name . '_' . $child->en_name] = ReportData::whereYear('date', $this->year)
                        ->whereMonth('date', $this->month)
                        ->where('user_id', $this->user_id)
                        ->where('column_id', $child->id)
                        ->sum('value');

                    $column_report[$item->en_name . '_' . $child->en_name . '_count'] = ReportData::whereYear('date', $this->year)
                        ->whereMonth('date', $this->month)
                        ->where('user_id', $this->user_id)
                        ->where('column_id', $child->id)
                        ->where('value', '>', 0)
                        ->count();
                }
            } else {
                $column_report[$item->en_name] = ReportData::whereYear('date', $this->year)
                    ->whereMonth('date', $this->month)
                    ->where('user_id', $this->user_id)
                    ->where('column_id', $item->id)
                    ->sum('value');

                $column_report[$item->en_name . '_count'] = ReportData::whereYear('date', $this->year)
                    ->whereMonth('date', $this->month)
                    ->where('user_id', $this->user_id)
                    ->where('column_id', $item->id)
                    ->where('value', '>', 0)
                    ->count();
            }
        }


        $monthly_report = MonthlyReport::whereYear('month', $this->year)
            ->whereMonth('month', $this->month)
            ->where('user_id', $this->user_id)
            ->first();

        if (!$monthly_report) {
            $monthly_report = new MonthlyReport();
        }

        $mentor_sugessions = ModaratorSugessionToUser::whereMonth('month',$this->month)
            ->whereYear('month',$this->year)
            ->where('user_id',$this->user_id)
            ->orderBy('id','DESC')
            ->limit(5)
            ->get();

        $mentor_sugession_text = "";
        $mentor_sugession_text .= "<ol class='d-flex flex-wrap gap-2'>";
        foreach ($mentor_sugessions as $item) {
            $mentor_sugession_text .= "<li class='ms-3'>".$item->sugession."</li>";
        }
        $mentor_sugession_text .= "</ol>";


        $modified_report = [
            'quran_days' =>  $column_report['quran_ayat_count'],
            'quran_avg_ayat' => $column_report['quran_ayat_count'] ? ($column_report['quran_ayat'] / $column_report['quran_ayat_count']) : 0,
            'surah_name' => $monthly_report->surah_name,
            'quran_darz' => $monthly_report->quran_darz,
            'quran_ayat' => $column_report['quran_ayat'],
            'surah_meaning' => $monthly_report->surah_meaning,
            'hadith_days' => $column_report['hadith_quantity_count'],
            'hadith_avg' => $column_report['hadith_quantity_count'] ? ($column_report['hadith_quantity'] / $column_report['hadith_quantity_count']) : 0,
            'hadith_subjects' => $monthly_report->hadith_subjects,
            'hadith_darz' => $monthly_report->hadith_darz,
            'hadith_memorize' => $column_report['hadith_memorise'],
            'hadith_topics' => $monthly_report->hadith_topics,

            'literature_pages' => ($column_report['literature_islamic'] + $column_report['literature_book'] + $column_report['literature_others']),
            'literature_islamic' => $column_report['literature_islamic'],
            'literature_others' => $column_report['literature_others'],
            'literature_book_name' => $monthly_report->literature_book_name,
            'literature_book_note' => $column_report['literature_book_note'],
            'literature_book' => $column_report['literature_book'],
            'literature_discussion' => $column_report['literature_alocona_note'],

            'general_book_days' => $column_report['reading_time_count'],
            'general_book_total_hours' => $this->sec_to_hour($column_report['reading_time']),
            'general_book_avg' => $column_report['reading_time_count'] ? $this->sec_to_hour($column_report['reading_time'] / $column_report['reading_time_count']) : 0,
            'class_attendance' => $column_report['class_class_present'],
            'attendance_total_days' => $column_report['class_class_present_count'],

            'jamayat_namaz' => $column_report['salat_jamat'],
            'jamayat_namaz_avg' => $column_report['salat_jamat_count']>0 ? $column_report['salat_jamat']/$column_report['salat_jamat_count'] : 0,
            'salat_kaja' => $column_report['salat_kaja'],
            'nafal_namaz' => $monthly_report->nafal_namaz,

            'contact_member' => $column_report['contact1_sodossho'],
            'contact_associate' => $column_report['contact1_sathi'],
            'contact_worker' => $column_report['contact1_kormi'],
            'contact_supporter' => $column_report['contact1_somorthok'],
            'contact_friend' => $column_report['contact2_bondhu'],
            'contact_wellwisher' => $column_report['contact2_suvakankhi'],
            'school_student' => $column_report['contact2_medhabi_chatro'],
            'contact_talent' => $column_report['contact2_medhabi_chatro'],
            'contact_teacher' => $monthly_report->contact_teacher,
            'contact_muharramah' => $column_report['contact2_muharramah'],
            'contact_vip' => $monthly_report->contact_vip,
            'dawat_days' => $column_report['sangothonik_dayitto_palon_dawati_kaj_count'],
            'dawat_total_hours' => $this->sec_to_hour($column_report['sangothonik_dayitto_palon_dawati_kaj']),
            'dawat_person' => $monthly_report->dawat_person,
            'org_work_days' => $column_report['sangothonik_dayitto_palon_sangothonik_kaj_count'],
            'org_work_avg_hours' => $column_report['sangothonik_dayitto_palon_sangothonik_kaj_count'] ? $this->sec_to_hour($column_report['sangothonik_dayitto_palon_sangothonik_kaj'] / $column_report['sangothonik_dayitto_palon_sangothonik_kaj_count']) : 0,
            'distribution_islamic_literature' => $monthly_report->distribution_islamic_literature,
            'distribution_kishor_paper' => $monthly_report->distribution_kishor_paper,
            'distribution_english_paper' => $monthly_report->distribution_english_paper,
            'distribution_chhatrasangbad' => $monthly_report->distribution_chhatrasangbad,
            'distribution_perspective' => $monthly_report->distribution_perspective,
            'distribution_porichiti' => $monthly_report->distribution_porichiti,
            'class_routine' => $monthly_report->class_routine,
            'sticker_card' => $monthly_report->sticker_card,
            'gift_sms_email' => $monthly_report->gift_sms_email,
            'increase_member1' => $monthly_report->increase_member1,
            'increase_member2' => $monthly_report->increase_member2,
            'member_elect1' => $monthly_report->member_elect1,
            'member_elect2' => $monthly_report->member_elect2,
            'increase_sathi1' => $monthly_report->increase_sathi1,
            'increase_sathi2' => $monthly_report->increase_sathi2,
            'sathi_elect1' => $monthly_report->sathi_elect1,
            'sathi_elect2' => $monthly_report->sathi_elect2,
            'activist1' => $monthly_report->activist1,
            'activist2' => $monthly_report->activist2,
            'supporter1' => $monthly_report->supporter1,
            'supporter2' => $monthly_report->supporter2,
            'increase_friend1' => $monthly_report->increase_friend1,
            'increase_friend2' => $monthly_report->increase_friend2,
            'card_wisher1' => $monthly_report->card_wisher1,
            'card_wisher2' => $monthly_report->card_wisher2,
            'bm_given_date' => $monthly_report->bm_given_date,
            'student_welfare' => $monthly_report->student_welfare,
            'personal_increase' => $monthly_report->personal_increase,
            'table_bank' => $monthly_report->table_bank,
            'baitulmal_total' => $monthly_report->baitulmal_total,
            'kolsi_hari' => $monthly_report->kolsi_hari,
            'self_criticism' => $column_report['atto_somalocona_count'],
            'physical_exercise' => $column_report['exercise_count'],
            'manifold_newspaper' => $column_report['newspaper_count'],
            'muharama_contact' => $column_report['contact2_muharramah_count'],
            'group_dawat' => $monthly_report->group_dawat,
            'dawat_sms' => $monthly_report->dawat_sms,
            'dawat_email' => $monthly_report->dawat_email,
            'nonmuslim_contact' => $monthly_report->nonmuslim_contact,
            'contact_organization' => $monthly_report->contact_organization,
            'computer_learning' => $monthly_report->computer_learning,
            'language_learning' => $monthly_report->language_learning,
            'manifold_others' => $monthly_report->manifold_others,
            'report_checking' => $monthly_report->report_checking,
            'opinion' => $monthly_report->opinion,

            'mentor_sugession_text' => $mentor_sugession_text,
        ];
        return response()->json([
            'column_report' => $column_report,
            'modified_report' => $modified_report
        ]);
    }

    public function set_monthly_report(Request $request)
    {
        $plan = MonthlyReport::where('user_id', Auth::user()->id)->whereMonth('month', $this->date->month)->whereYear('month', $this->date->year)->first();
        $data = $request->except('date','jamayat_namaz_avg');
        $data['user_id'] = Auth::user()->id;
        $data['month'] = $this->date->toDateTimeString();
        if (!$plan) {
            $plan = MonthlyReport::create($data);
        } else {
            $plan->fill($data)->save();
        }
        return $plan;
    }

    public function get_date_to_date_report_details(Request $request)
    {
        $date_report = [];
        $get_report_column_total_sum = [];
        if ($request->from_date == null && $request->to_date == null) {
            $this->to_date = Carbon::now();
            $this->from_date = Carbon::now()->subDays(30);
            for ($i = 0; $i <= 30; $i++) {
                $date = Carbon::now()->subDays($i);
                $temp['date']  = Carbon::now()->subDays($i)->format('d-M-y');
                $temp['column_report'] = $this->get_report_column_total($date)->toArray();
                $date_report[] = $temp;
            }
            $get_report_column_total_sum = $this->get_report_column_total_sum_between_two_date();
        } else {
            // dd($this->from_date, $this->to_date, $this->from_date->diff($this->to_date)->days);
            $limit = Carbon::parse($request->from_date)->diff($this->to_date)->days;
            $range = Carbon::parse($request->to_date);
            for ($i = 0; $i <= $limit; $i++) {
                $date = $range->copy()->subDays($i);
                $temp['date']  = $range->copy()->subDays($i)->format('d-M-y');
                $temp['column_report'] = $this->get_report_column_total($date)->toArray();
                $date_report[] = $temp;
            }
            $get_report_column_total_sum = $this->get_report_column_total_sum_between_two_date();
        }

        return response()->json([
            'date_report' => $date_report,
            'get_report_column_total_sum' => $get_report_column_total_sum,
        ]);
    }

    public function sec_to_hour($sec)
    {
        // return CarbonInterval::seconds($sec)->cascade()->forHumans();
        return preg_replace(['/ /', '/hours/', '/hour/', '/minutes/', '/minute/', '/seconds/', '/second/'], ['', ':', ':', ':', ':', '', ''], CarbonInterval::seconds($sec)->cascade()->forHumans());
    }

    public function convert($mytime)
    {
        $engDATE = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
        $bangDATE = array('১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '০', 'শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনিবার', 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর');
        $convertedDATE = str_replace($engDATE, $bangDATE, $mytime);
        return $convertedDATE;
    }

    public function get_report_column_names()
    {
        $user_id = auth()->user()->id;
        $fields = ['id', 'default', 'parent', 'en_name', 'bn_name', 'visibility', 'creator', 'input_type', 'value_type'];
        $columns =  ReportColumn::where('parent', 0)
            ->where('default', 1)
            ->where('visibility', 1)
            ->where(function ($q) {
                $q->where('creator', null)
                    ->orWhere('creator', auth()->user()->id);
            })
            ->select($fields)
            ->with([
                'childrens' => function ($q) use ($user_id, $fields) {
                    $q->where('status', 1)
                        ->where('visibility', 1)
                        ->select($fields)
                        ->with([
                            'user_col_visibility' => function ($q) use ($user_id) {
                                $q->where('user_id', $user_id)
                                    ->select('id', 'user_id', 'column_id', 'visibility');
                            },
                        ]);
                },
                'user_col_visibility' => function ($q) use ($user_id) {
                    $q->where('user_id', $user_id)
                        ->select('id', 'user_id', 'column_id', 'visibility');
                },
            ])
            ->orderBy('serial', 'ASC')
            ->get();

        // $final_cols =

        return response()->json($columns);
    }

    public function get_report_column_values()
    {
        $user_id = auth()->user()->id;
        $date = Carbon::parse(request()->date);
        $data = ReportData::where('user_id', $user_id)
            ->whereMonth('date', $date)
            ->whereYear('date', $date)
            ->where('value', '!=', null)
            ->with([
                'col_info' => function ($q) {
                    $q->select('id', 'input_type', 'value_type');
                }
            ])
            ->get();
        return response()->json($data);
    }

    public function set_report_col_data()
    {
        $data = ReportData::where('user_id', auth()->user()->id)
            ->where('column_id', request()->column_id)
            ->whereDate('date', request()->date)
            ->first();

        if ($data) {
            $data->value = request()->value;
            $data->save();
        } else {
            $data = ReportData::create([
                'user_id' => auth()->user()->id,
                'column_id' => request()->column_id,
                'date' => request()->date,
                'value' => request()->value,
            ]);
        }

        $data->col_info = $data->col_info()->select('id', 'input_type', 'value_type')->first();
        return $data;
    }
}
