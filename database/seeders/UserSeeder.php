<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        User::truncate();

        $user = new User();
        $user->first_name = 'masum';
        $user->last_name = 'shefat';
        $user->user_name = 'shefat';
        $user->mobile_number = '01646376015';
        $user->email = 'myphoto204@gmail.com';
        $user->password = Hash::make('@12345678');
        $user->save();

        $user = new User();
        $user->first_name = 'masum';
        $user->last_name = 'shefat';
        $user->user_name = 'shefat2';
        $user->mobile_number = '01646376014';
        $user->email = 'myphoto240@gmail.com';
        $user->password = Hash::make('@12345678');
        $user->save();
    }
}
