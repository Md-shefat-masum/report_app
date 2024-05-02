<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\ViewServiceProvider;

class WebsiteController extends Controller
{
    public function index()
    {
        return view('report.report_wrapper');
    }
}
