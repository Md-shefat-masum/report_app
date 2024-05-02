<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Models\ModaratorOfUser;
use App\Models\ModaratorSugessionToUser as ModelsModaratorSugessionToUser;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MentorController extends Controller
{
    public function find(Request $request)
    {
        $key = $request->key;
        if ($key && strlen($key)) {
            $users = User::where('name', 'LIKE', '%' . $key . '%')
                ->orWhere('first_name', 'LIKE', '%' . $key . '%')
                ->orWhere('last_name', 'LIKE', '%' . $key . '%')
                ->orWhere('user_name', 'LIKE', '%' . $key . '%')
                ->orWhere('mobile_number', 'LIKE', '%' . $key . '%')
                ->orWhere('email', 'LIKE', '%' . $key . '%')
                ->orderBy('name', 'ASC')
                ->paginate(10);
        } else {
            $users = User::orderBy('name', 'ASC')
                ->whereExists(function ($query) {
                    $query->select(DB::raw(1))
                        ->from('modarator_of_users')
                        ->whereColumn('modarator_of_users.modarator_id', 'users.id');
                })
                ->paginate(10);
        }

        return response()->json($users);
    }

    public function find_by_email(Request $request)
    {
        $key = $request->key;

        $users = User::where('email','3')->paginate(10);
        if ($key && strlen($key)) {
            $users = User::where('email', $key)
                ->orderBy('name', 'ASC')
                ->paginate(10);
        }

        return response()->json($users);
    }

    public function user_followers(Request $request)
    {
        $users = User::where('id', Auth::user()->id)->with(['followers'])->first()
            ->followers()
            ->with('user')
            ->whereExists(function ($q) {
                $q->select(DB::raw(1))
                    ->from('users')
                    ->whereColumn('users.id', 'modarator_of_users.user_id');
            })
            ->paginate(10);
        return response()->json($users);
    }

    public function user_mentors(Request $request)
    {
        $user = ModaratorOfUser::where('user_id', auth()->user()->id)->get();
        $modarators = [];
        foreach ($user as $item) {
            $modarators[] = $item->modarator_id;
        }

        return response()->json($modarators);
    }

    public function follow(Request $request)
    {
        $data = ModaratorOfUser::create([
            'user_id' => $request->user_id,
            'modarator_id' => $request->modarator_id,
        ]);

        return response()->json($data);
    }

    public function unfollow(Request $request)
    {
        $data = ModaratorOfUser::where([
            'user_id' => $request->user_id,
            'modarator_id' => $request->modarator_id,
        ])->delete();

        return response()->json($request->modarator_id);
    }

    public function submit_sugession(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sugession' => ['required'],
        ], [
            'sugession' => ['please write some advice to user.'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'data' => $validator->errors(),
            ], 422);
        }
        $req_data = $request->all();
        $req_data['month'] = Carbon::parse($request->month);
        ModelsModaratorSugessionToUser::create($req_data);
        $data = ModelsModaratorSugessionToUser::where('user_id', $request->user_id)
            ->whereMonth('month', $req_data['month']->month)
            ->whereYear('month', $req_data['month']->year)
            ->with('user')
            ->latest()
            ->get();
        return response()->json($data);
    }

    public function get_all_sugession(Request $request)
    {
        $data = ModelsModaratorSugessionToUser::where('user_id', $request->user_id)
            ->with('user')
            ->latest()
            ->get();
        return response()->json($data);
    }
}
