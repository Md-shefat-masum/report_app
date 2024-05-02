<?php
function class_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row->user_id);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();

        if ($row->class > 0) {
            $col = ReportColumn::find(21); // class amount
            $check_col = ReportData::whereDate('date', $row->report_date)->where('column_id', $col->id)->first();
            if (!$check_col) {
                ReportData::create([
                    'date' => Carbon::parse($row->report_date)->toDateTimeString(),
                    'column_id' => $col->id,
                    'value' => $row->class,
                    'user_id' => $new_db_user->id,
                ]);
            }
        }

        if ($row->attendance > 0) {
            $col = ReportColumn::find(22); // attendance
            $check_col = ReportData::whereDate('date', $row->report_date)->where('column_id', $col->id)->first();
            if (!$check_col) {
                ReportData::create([
                    'date' => Carbon::parse($row->report_date)->toDateTimeString(),
                    'column_id' => $col->id,
                    'value' => $row->attendance,
                    'user_id' => $new_db_user->id,
                ]);
            }
        }
    }
}



function con_to_milisec($time){
    $time = strval($time);
    $parts = explode('.', $time);
    $hour = (int) $parts[0] * 60 * 60 * 1000;
    $min = 0;

    if(isset($parts[1])){
        $min = (int) $parts[1] * 60 * 1000;
    }

    return $hour + $min;
}

function backup_and_save_reports($cols, $row, $new_db_user){
    foreach ($cols as $col_id => $col_name) {

        if ($row[$col_name] > 0) {
            $check_col = ReportData::where('user_id',$new_db_user->id)
                ->whereDate('date', $row["report_date"])->where('column_id', $col_id)
                ->orderBy('id','DESC')->first();
            if ($check_col == false) {
                // dd($check_col, 'check', $row[$col_name], $col_name, $row);
                ReportData::create([
                    'date' => Carbon::parse($row["report_date"])->toDateTimeString(),
                    'column_id' => $col_id,
                    'value' => con_to_milisec($row[$col_name]),
                    // 'value' => +$row[$col_name],
                    // 'value' => 1,
                    'user_id' => $new_db_user->id,
                ]);

                // dd('ok');
            }
        }
    }
}

function class_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row["user_id"]);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();
        $cols = [
            "21" => "class",
            "22" => "attendance",
        ];
        backup_and_save_report($cols, $row, $new_db_user);
    }
}

function contacts_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row["user_id"]);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();

        $cols = [
            "28" => "member",
            "29" => "associate",
            "30" => "worker",
            "31" => "supporter",

            "33" => "friend",
            "34" => "brl_student",
            "35" => "well_wisher",

            "48" => "schl_student",
            "49" => "teacher",
            "50" => "vip",
        ];

        backup_and_save_report($cols, $row, $new_db_user);
    }
}

function dawat_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row["user_id"]);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();

        $cols = [
            "43" => "dawat_total_hours",
        ];

        backup_and_save_reports($cols, $row, $new_db_user);
    }
}

function hadith_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row["user_id"]);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();

        $cols = [
            "10" => "hadith_dars",
            "11" => "hadith_read",
            "12" => "hadith_memorize",
        ];

        backup_and_save_reports($cols, $row, $new_db_user);
    }
}

function literature_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row["user_id"]);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();

        $cols = [
            "15" => "literature_islamic",
            "16" => "literature_others",
            "17" => "literature_note",
        ];

        backup_and_save_reports($cols, $row, $new_db_user);
    }
}

function miscellaneouses_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row["user_id"]);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();

        $cols = [
            "45" => "misc_newspaper",
            "46" => "misc_physical_exercise",
            "47" => "misc_self_analysis",
        ];

        backup_and_save_reports($cols, $row, $new_db_user);
    }
}

function monthly_plans_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row["user_id"]);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();

        $date = explode('/',$row["month"]);
        $date = $date[1].'-'.$date[0].'-01';

        unset($row["id"]);
        $row['user_id'] = $new_db_user->id;
        $row['month'] = $date;
        $tt = MonthlyPlan::where('user_id',$new_db_user->id)->whereDate('month', $date)->first();

        if($tt == false){
            try {
                $p = MonthlyPlan::create($row);
            } catch (\Throwable $th) {
                dd( $tt, $date, $new_db_user->toArray());
            }
        }
    }
}

function org_works_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row["user_id"]);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();

        $cols = [
            "44" => "org_work_total_hours",
        ];

        backup_and_save_reports($cols, $row, $new_db_user);
    }
}

function quran_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row["user_id"]);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();

        $cols = [
            "3" => "quran_read",
            "4" => "quran_dars",
            "5" => "quran_memorize",
        ];

        backup_and_save_reports($cols, $row, $new_db_user);
    }
}

function salats_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row["user_id"]);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();

        $cols = [
            "24" => "jamaat",
            "25" => "kadha",
        ];

        backup_and_save_reports($cols, $row, $new_db_user);
    }
}

function stadies_bc($row, $conn)
{
    $o_user = $conn->query("SELECT * FROM users WHERE `id`=" . $row["user_id"]);
    if ($o_user->num_rows > 0) {
        $o_user_data = $o_user->fetch_object();
        $new_db_user = User::where('email', $o_user_data->email)->first();

        $cols = [
            "19" => "total_hours",
        ];

        backup_and_save_reports($cols, $row, $new_db_user);
    }
}

Route::get('/bc', function () {
    ini_set('max_execution_time', 0);
    echo "<style>html,body{background: black; color: white;}</style>";

    $servername = "localhost";
    $username = "root";
    $password = "1234";
    $dbname = "myreportxbd_report";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM studies WHERE `report_date` > '2023-01-01 00:00:00' AND  `total_hours` > 0 ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $k = 1;
        while ($row = $result->fetch_assoc()) {
            stadies_bc($row, $conn);
            echo ($k++) ." ";
        }
    }

    // $sql = "SELECT * FROM salats WHERE `report_date` > '2023-01-01 00:00:00' AND `report_date` < '2023-09-01 00:00:00' ";
    // $result = $conn->query($sql);
    // if ($result->num_rows > 0) {
    //     $k = 1;
    //     while ($row = $result->fetch_assoc()) {
    //         salats_bc($row, $conn);
    //         echo ($k++) ." ";
    //     }
    // }

    // $sql = "SELECT * FROM qurans WHERE `report_date` > '2023-01-01 00:00:00' AND `report_date` < '2023-09-01 00:00:00' ";
    // $result = $conn->query($sql);
    // if ($result->num_rows > 0) {
    //     $k = 1;
    //     while ($row = $result->fetch_assoc()) {
    //         quran_bc($row, $conn);
    //         echo ($k++) ." ";
    //     }
    // }

    // $sql = "SELECT * FROM org_works WHERE `report_date` > '2023-09-01 00:00:00' AND  `org_work_total_hours` > 0 ";
    // $result = $conn->query($sql);
    // if ($result->num_rows > 0) {
    //     $k = 1;
    //     while ($row = $result->fetch_assoc()) {
    //         org_works_bc($row, $conn);
    //         echo ($k++) ." ";
    //     }
    // }

    // $sql = "SELECT * FROM monthly_plans";
    // $result = $conn->query($sql);
    // if ($result->num_rows > 0) {
    //     $k = 1;
    //     while ($row = $result->fetch_assoc()) {
    //         // monthly_plans_bc($row, $conn);
    //         echo ($k++) ." ";
    //     }
    // }

    // $sql = "SELECT * FROM miscellaneouses WHERE `report_date` > '2022-12-30 00:00:00' AND  (`misc_self_analysis` = 'on'  OR `misc_physical_exercise` = 'on' OR `misc_newspaper` = 'on') ";
    // $result = $conn->query($sql);
    // if ($result->num_rows > 0) {
    //     $k = 1;
    //     while ($row = $result->fetch_assoc()) {
    //         miscellaneouses_bc($row, $conn);
    //         echo ($k++) ." ";
    //     }
    // }

    // $sql = "SELECT * FROM literatures WHERE `report_date` > '2022-12-30 00:00:00' AND  (`literature_islamic` > 0  OR `literature_others` > 0 OR `literature_note` > 0) ";
    // $result = $conn->query($sql);
    // if ($result->num_rows > 0) {
    //     $k = 1;
    //     while ($row = $result->fetch_assoc()) {
    //         literature_bc($row, $conn);
    //         echo ($k++) ." ";
    //     }
    // }

    // $sql = "SELECT * FROM hadiths WHERE `report_date` > '2022-12-30 00:00:00' AND  (`hadith_read` > 0  OR `hadith_memorize` > 0 OR `hadith_dars` > 0) ";
    // $result = $conn->query($sql);
    // if ($result->num_rows > 0) {
    //     $k = 1;
    //     while ($row = $result->fetch_assoc()) {
    //         hadith_bc($row, $conn);
    //         echo ($k++) ." ";
    //     }
    // }

    // $sql = "SELECT * FROM dawats WHERE `report_date` > '2023-06-30 00:00:00' AND  `dawat_total_hours` > 0 ";
    // $result = $conn->query($sql);
    // if ($result->num_rows > 0) {
    //     $k = 1;
    //     while ($row = $result->fetch_assoc()) {
    //         dawat_bc($row, $conn);
    //         echo ($k++) ." ";
    //     }
    // }

    // $sql = "SELECT * FROM contacts WHERE `member` > 0 OR `associate` > 0 OR `worker` > 0 OR `supporter` > 0
    //     OR `friend` > 0 OR `well_wisher` > 0 OR `schl_student` > 0 OR `brl_student` > 0 OR `teacher` > 0 OR `vip` > 0";
    // $result = $conn->query($sql);
    // if ($result->num_rows > 0) {
    //     $k = 1;
    //     while ($row = $result->fetch_assoc()) {
    //         // contacts_bc($row, $conn);
    //         echo ($k++) ." ";
    //     }
    // }

    // $sql = "SELECT * FROM clas WHERE `class` > 0 OR `attendance` > 0";
    // $result = $conn->query($sql);
    // if ($result->num_rows > 0) {
    //     $k = 1;
    //     while ($row = $result->fetch_assoc()) {
    //         // class_bc($row, $conn);
    //         echo ($k++) ." ";
    //     }
    // }



    $conn->close();
});
