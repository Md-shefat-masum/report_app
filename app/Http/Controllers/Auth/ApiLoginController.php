<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\EmailVerifyMail;
use App\Mail\ForgetPasswordMail;
use App\Models\User;
use App\Models\UserCacheClear;
use App\Models\UserEmailVerify;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Intervention\Image\Facades\Image;

class ApiLoginController extends Controller
{
    public function get_token(Request $request)
    {
        // return $request->all();
        $user = User::find($request->id);
        Auth::login($user);
        return $user->createToken('accessToken')->accessToken;
    }

    public function auth_check()
    {
        if (Auth::check()) {
            return response()->json(true, 200);
        } else {
            return response()->json(0, 200);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'exists:users'],
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'data' => $validator->errors(),
            ], 422);
        } else {
            $req_data = request()->only('email', 'password');
            if (Auth::attempt($req_data, true)) {
                $user = User::where('id', Auth::user()->id)->with('role_information')->first();
                $data['access_token'] = $user->createToken('accessToken')->accessToken;
                $data['user'] = $user;
                return response()->json($data, 200);
            } else {
                $data['message'] = 'user not exists!!';
                $data['data']['email'] = ['email or password incorrect'];
                $data['data']['password'] = ['email or password incorrect'];

                return response()->json($data, 401);
            }
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => ['required'],
            // 'last_name' => ['required'],
            // 'user_name' => ['required', 'min:4', 'unique:users'],
            'email' => [
                'required', 'unique:users',
                Rule::exists('user_email_verifies')->where(function ($query) use ($request) {
                    $query->where('email', $request->email)
                        ->where('code', $request->email_verify_code);
                }),
            ],
            'email_verify_code' => ['required', 'exists:user_email_verifies,code'],
            'password' => ['required', 'min:8', 'confirmed'],
            // 'image' => ['required'],
            // 'mobile_number' => ['required'],
            // 'dob' => ['required'],
            // 'street' => ['required'],
            // 'city' => ['required'],
            // 'zip_code' => ['required'],
            // 'country' => ['required'],
        ], [
            'email_verify_code.exists' => ['incorrect email verification code'],
            'email.exists' => ['email and verification code not matched'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'data' => $validator->errors(),
            ], 422);
        } else {
            $data = $request->except(['password', 'password_confirmation', 'image', 'email_verify_code']);
            $data['role_id'] = 4;
            $data['password'] = Hash::make($request->password);
            $user = User::create($data);
            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
                $path = 'uploads/users/pp-' . $user->user_name . '-' . $user->id . rand(1000, 9999) . '.' . $file->getClientOriginalExtension();
                Image::make($file)->fit(200, 200)->save(public_path($path));
                $user->photo = $path;
            }
            $user->name = $user->first_name;
            $user->slug = $user->name . $user->id . rand(1000, 9999);
            $user->save();

            UserEmailVerify::where('email', $request->email)->update(['validated' => 1]);

            Auth::login($user);
            $user = User::where('id', Auth::user()->id)->with('role_information')->first();
            $user->access_token = $user->createToken('accessToken')->accessToken;
            return response()->json($user, 200);
        }
    }

    public function user_info()
    {
        return response()->json(auth()->user(), 200);
    }



    public function logout()
    {
        Auth::user()->token()->revoke();
        return response()->json([
            'message' => 'logout',
        ], 200);
    }

    public function update_profile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => ['required'],
            'last_name' => ['required'],
            // 'user_name' => ['required', 'min:4', 'unique:users'],
            // 'email' => ['required', 'unique:users'],
            'contact_number' => ['required'],
            // 'dob' => ['required'],
            // 'street' => ['required'],
            'city' => ['required'],
            'zip_code' => ['required'],
            'country' => ['required'],
            //
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = $request->only(['name', 'password']);

        if ($request->has('password') && strlen($request->password) > 0) {
            $validator = Validator::make($request->all(), [
                'password' => ['required', 'min:8', 'confirmed'],
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'err_message' => 'validation error',
                    'data' => $validator->errors(),
                ], 422);
            }
        }

        $data['password'] = Hash::make($request->password);
        $user = User::find(Auth::user()->id)->fill($data)->save();

        $data['user'] = User::where('id', Auth::user()->id)->with('role_information')->first();
        return response()->json($data, 200);
    }

    public function update_profile_pic(Request $request)
    {
        if ($request->hasFile('image')) {
            $user = User::find(Auth::user()->id);
            $file = $request->file('image');
            $path = 'uploads/users/pp-' . $user->user_name . '-' . $user->id . rand(1000, 9999) . '.' . $file->getClientOriginalExtension();
            Image::make($file)->fit(200, 200)->save(public_path($path));
            $user->photo = $path;

            // $path = Storage::put('uploads', $request->file('image'));
            // $user->photo = $path;

            $user->save();
            $data['user'] = User::where('id', Auth::user()->id)->select(['photo'])->first();
            return response()->json($data, 200);
        }
    }

    public function forget(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'exists:users'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'data' => $validator->errors(),
            ], 422);
        }
        $user = User::where('email', $request->email)->first();
        $user->forget_token = Hash::make(uniqid(50));
        $user->save();

        // return Mail::to('mshefat924@gmail.com')->send(new ForgetPassword($user->forget_token));
    }

    public function forget_token(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'forget_token' => ['required', 'exists:users'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'data' => $validator->errors(),
            ], 422);
        }

        $temp_pass = Hash::make(uniqid(10));
        $user = User::where('forget_token', $request->forget_token)->first();
        $user->forget_token = null;
        $user->password = Hash::make($temp_pass);
        $user->save();

        // return Mail::to('mshefat924@gmail.com')->send(new ForgetPassword(" your password is:  " . $temp_pass));
    }

    public function check_auth()
    {
        return response()->json(Auth::check());
    }

    public function find_user_info(Request $request)
    {
        $user = User::find($request->id);
        return response()->json($user);
    }

    public function clear_cache()
    {
        $check = UserCacheClear::where("user_id", auth()->user()->id)->first();
        $result = $check ? 1 : 0;
        if (!$result) {
            UserCacheClear::create(["user_id" => auth()->user()->id]);
        }
        return response()->json($result);
    }

    public function forget_mail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'exists:users'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'data' => $validator->errors(),
            ], 422);
        }
        $user = User::where('email', $request->email)->first();
        $password = uniqid('');
        $user->password = Hash::make($password);
        $user->save();
        try {
            Mail::to($user->email)->send(new ForgetPasswordMail($password));
            return [
                "message" => "A message has been sent to your email address. if it does not arrive, check your spam folder."
            ];
        } catch (\Throwable $th) {
            return [
                "message" => "there is an error on sending mail. soon we will notify you through email."
            ];
        }
    }

    public function email_validate()
    {
        $validator = Validator::make(request()->all(), [
            'email' => ['required', 'unique:users,email'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'data' => $validator->errors(),
            ], 422);
        }

        $code = rand(100000, 999999);
        $email = request()->email;
        $check = UserEmailVerify::where('email', $email)->where('validated', 0)->orderBy('id', 'DESC')->first();
        if (!$check) {
            UserEmailVerify::where('email', $email)->delete();
            $check = new UserEmailVerify();
        } else if (Carbon::now()->toDateString() == $check->updated_at->toDateString()) {
            $code = $check->code;
        }
        $check->email = $email;
        $check->code = $code;
        $check->save();
        try {
            Mail::to($email)->send(new EmailVerifyMail($code));
            return response()->json([
                "message" => "A code has been sent to your email."
            ]);
        } catch (\Throwable $th) {
            return [
                "message" => "there is an error on sending mail. soon we will notify you through email."
            ];
        }
    }

    public function users()
    {
        $users = User::where('status', 'active')->get();
        return response()->json($users);
    }
}
