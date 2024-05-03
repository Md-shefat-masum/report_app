<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description" content="My report bd, shibir report, personal report">
    <meta name="keywords" content="My report bd, shibir report, personal report, report management">
    <meta name="author" content="BICS, Bangladesh Islami Chhatra Shibir">

    @include('report.includes.pwa')

    <title>Personal Report App</title>

    <style>
        @font-face {
            font-family: 'bangla';
            src: url('bangla.ttf');
        }
    </style>

    <!--Google font-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" type="text/css" href="{{ asset('contents/admin') }}/assets/css/fontawesome.css">

    <!-- ico-font -->
    <link rel="stylesheet" type="text/css" href="{{ asset('contents/admin') }}/assets/css/icofont.css">

    <!-- Themify icon -->
    <link rel="stylesheet" type="text/css" href="{{ asset('contents/admin') }}/assets/css/themify.css">

    <!-- Bootstrap css -->
    <link rel="stylesheet" type="text/css" href="{{ asset('contents/admin') }}/assets/css/bootstrap.css">

    <!-- App css -->
    <link rel="stylesheet" type="text/css" href="{{ asset('contents/admin') }}/assets/css/style.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('contents/admin') }}/assets/css/custom.css">

    <!-- Responsive css -->
    <link rel="stylesheet" type="text/css" href="{{ asset('contents/admin') }}/assets/css/responsive.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('contents/admin') }}/report/ReportBody.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('contents/admin') }}/report/monthlyPlan.css">
    {{-- <script src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pace-js@latest/pace-theme-default.min.css"> --}}
    <script src="{{ asset('js/sweet_alert.js') }}"></script>
    <script src="{{ asset('js/localforage.min.js') }}"></script>
    <script src="{{ asset('pwa.js') }}" defer></script>
    @stack('ccss')
    <script>
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        window.s_alert = (title="success",icon='success') => {
            Toast.fire({
                icon: icon,
                title: title,
            })
        }
    </script>

</head>

<body>
    <!--page-wrapper Start-->
    <div class="page-wrapper">

        <div id="report_body">
            <report-wrapper></report-wrapper>
        </div>

    </div>
    <!--page-wrapper Ends-->
    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
        @csrf
    </form>
    {{-- <script src="{{ asset('js/app.js') }}"></script> --}}
    <!-- latest jquery-->
    <script src="{{ asset('contents/admin') }}/assets/js/jquery-3.2.1.min.js"></script>
    <script src="/js/vue_report_management.js"></script>

    <!-- Bootstrap js-->
    <script src="{{ asset('contents/admin') }}/assets/js/bootstrap/bootstrap.bundle.min.js" ></script>

    <!-- Theme js-->
    <script src="{{ asset('contents/admin') }}/assets/js/script.js"></script>


    @stack('pjs')

    @stack('cjs')

</body>


</html>
