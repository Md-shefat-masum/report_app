<template>
    <div>
        <!--Page Header Start-->
        <div class="page-main-header noprint">
            <div class="main-header-left">
                <div class="logo-wrapper">
                    <router-link :to="{name:'dailyReport'}">
                        <img src="/logo.png" class="image-dark" alt=""/>
                        <img src="/logo_white.png" class="image-light" alt=""/>
                    </router-link>
                </div>
            </div>
            <div class="main-header-right">
                <div class="mobile-sidebar col-lg-1 col-4 ps-0">
                    <i class="fa switch-nav fa-align-left btn btn-primary btn-sm p-2"></i>
                    <!-- <div class="text-start switch-sm">
                        <label class="switch">
                            <input type="checkbox" id="sidebar-toggle" checked>
                            <span class="switch-state"></span>
                        </label>
                    </div> -->
                </div>
                <div class="nav-right col responsive_nav_right d-flex align-items-center">
                    <div>
                        <i v-if="app_theme == ''" @click.prevent="check_app_theme('main-theme-layout-4'),app_theme='dark'" class="fa fa-2x fa-moon-o"></i>
                        <i v-else @click.prevent="check_app_theme('light'),app_theme=''" class="fa fa-2x fa-lightbulb-o"></i>
                    </div>
                    <ul class="nav-menus d-lg-flex d-none">
                        <li>
                            <!-- <a href="#!" onclick="javascript:toggleFullScreen()" class="text-dark">
                                <img class="align-self-center pull-right me-2" src="/contents/admin/assets/images/dashboard/browser.png" alt="header-browser">
                            </a> -->
                        </li>
                        <li class="onhover-dropdown d-none">
                            <a href="#!" class="txt-dark">
                                <img class="align-self-center pull-right me-2" src="/contents/admin/assets/images/dashboard/notification.png" alt="header-notification">
                                <span class="badge rounded-pill badge-primary notification">
                                    28
                                </span>
                            </a>
                            <ul class="notification-dropdown onhover-show-div">
                                <li>
                                    Notification
                                    <span class="badge rounded-pill badge-secondary text-white text-uppercase pull-right">
                                        28 New
                                    </span>
                                </li>
                                <li>
                                    <div class="d-flex">
                                        <i class="flex-shrink-0 align-self-center notification-icon icofont icofont-recycle bg-success"></i>
                                        <div>
                                            <h6 class="mt-0">Assignment Mark</h6>
                                            <p class="mb-0">Project: company website: 60/60 </p>
                                            <span>
                                                <i class="icofont icofont-clock-time p-r-5"></i>
                                                1 month ago
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li class="text-center">
                                    Check
                                    <a href="#">all</a>
                                    notification
                                </li>
                            </ul>
                        </li>
                        <li class="onhover-dropdown d-none d-lg-block">
                            <div class="d-flex align-items-center">
                                <img class="align-self-center pull-right flex-shrink-0 me-2" src="/contents/admin/assets/images/dashboard/user.png" alt="header-user"/>
                                <div>
                                    <h6 class="m-0 txt-dark f-16">
                                        My Account
                                        <i class="fa fa-angle-down pull-right ms-2"></i>
                                    </h6>
                                </div>
                            </div>
                            <ul class="profile-dropdown onhover-show-div p-20">
                                <li>
                                    <a href="#/report/user-profile">
                                        <i class="icon-user"></i>
                                        Edit Profile
                                    </a>
                                </li>
                                <li>
                                    <a @click.prevent="logout()" href="/logout">
                                        <i class="icon-power-off"></i>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div class="d-none mobile-toggle">
                        <i class="icon-more"></i>
                    </div>
                </div>
            </div>
        </div>
        <!--Page Header Ends-->

        <!--Page Body Start-->
        <div class="page-body-wrapper">
            <!--Page Sidebar Start-->
            <div class="page-sidebar custom-scrollbar page-sidebar-open noprint">

                <div class="sidebar-user text-center">
                    <div>
                        <img class="img-50 rounded-circle" :src="`/${get_auth_information.photo || 'avatar.png'}`" alt="#">
                    </div>
                    <h6 class="mt-3 f-12">
                        {{ get_auth_information.first_name }}
                        {{ get_auth_information.last_name }} <br>

                        <small v-if="get_auth_information.user_name">
                            #{{ get_auth_information.user_name }}
                        </small>
                    </h6>
                </div>
                <ul class="sidebar-menu ">
                    <li>
                        <router-link :to="{name: 'dailyReport'}">
                            <i class="fa fa-calendar"></i>
                            <span class="report_bn_date"> রিপোর্ট পূরন করুন</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link  class="sidebar-header" :to="{name: 'userProfile'}">
                            <i class="icon-user"></i>
                            <span class="report_bn_date"> প্রোফাইল </span>
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link  class="sidebar-header" :to="{name: 'yearlyPlan'}">
                            <i class="icon-calendar"></i>
                            <span class="report_bn_date"> বার্ষিক পরিকল্পনা</span>
                        </router-link>
                    </li> -->
                    <li>
                        <router-link  class="sidebar-header" :to="{name: 'monthlyPlan'}">
                            <i class="icon-calendar"></i>
                            <span class="report_bn_date"> মাসিক পরিকল্পনা</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link  class="sidebar-header" :to="{name: 'monthlyReport'}">
                            <i class="icofont icofont-chart-line"></i>
                            <span class="report_bn_date"> মাসিক রিপোর্ট</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link  class="sidebar-header" :to="{name: 'reportDetails'}">
                            <i class="icofont icofont-chart-flow"></i>
                            <span class="report_bn_date"> বিস্তারিত রিপোর্ট </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link  class="sidebar-header" :to="{name: 'mentorList'}">
                            <i class="icofont icofont-user-suited"></i>
                            <span class="report_bn_date"> মেন্টর লিস্ট</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link  class="sidebar-header" :to="{name: 'followerList'}">
                            <i class="icofont icofont-ui-user-group"></i>
                            <span class="report_bn_date"> ফলোয়ার লিস্ট</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link  class="sidebar-header" :to="{name: 'advice'}">
                            <i class="icon-comment"></i>
                            <span class="report_bn_date"> পরামর্শ</span>
                        </router-link>
                    </li>
                    <li>
                        <a class="sidebar-header" @click.prevent="logout()" href="/logout">
                            <i class="fa fa-sign-out"></i>
                            <span class="report_bn_date"> লগ আউট</span>
                        </a>
                    </li>

                    <!-- <li>
                        <a href="javascript:void(0)" class="sidebar-header">
                            <i class="icon-layout"></i> <span>Page layout</span>
                            <i class="fa fa-angle-right pull-right"></i>
                        </a>
                        <ul class="sidebar-submenu">
                            <li><a href="box-layout.html"><i class="fa fa-angle-right"></i>Boxed</a></li>
                            <li><a href="layout-rtl.html"><i class="fa fa-angle-right"></i>RTL</a></li>
                            <li><a href="1-column.html"><i class="fa fa-angle-right"></i>1 Column</a></li>
                        </ul>
                    </li> -->
                </ul>


            </div>
            <!--Page Sidebar Ends-->

            <div class="page-body">

                <!-- Container-fluid starts -->
                <div class="container-fluid noprint">
                    <div class="page-header">
                        <div class="row">
                            <div class="col-lg-6">
                                <h3 class="report_bn_date">
                                    ব্যক্তিগত রিপোর্ট
                                </h3>
                            </div>
                            <div class="col-lg-6">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Container-fluid Ends -->
                <router-view></router-view>

            </div>
        </div>
        <!--Page Body Ends-->
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data: ()=>({
        app_theme: "",
    }),
    created: async function(){
        this.app_theme = this.check_app_theme();
        await this.fetch_check_auth();
        setTimeout(() => {
            this.init_sidebar();
        }, 500);
    },
    watch: {
        get_check_auth: {
            handler: async function(oldv,newv){
                if(this.get_check_auth){
                    await this.fetch_auth_information();
                }
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions([
            'fetch_check_auth',
            'fetch_auth_information',
            'check_app_theme',
        ]),
        logout: function(){
            if(confirm('sure want to logout.')){
                window.localStorage.removeItem('token');
                window.axios.defaults.headers.common["Authorization"] = null;
                this.$router.push({name: 'login'});
            }
        },
        init_sidebar: function(){
            var animationSpeed = 300,
            subMenuSelector = '.sidebar-submenu';
            let menu = $('.sidebar-menu');
            $('.page-sidebar.custom-scrollbar').addClass('page-sidebar-open');
            $(menu).off().on('click', 'li a', function (e) {
                var $this = $(this);
                var checkElement = $this.next();
                if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
                    checkElement.slideUp(animationSpeed, function () {
                        checkElement.removeClass('menu-open');
                    });
                    checkElement.parent("li").removeClass("active");
                } else if ((checkElement.is(subMenuSelector)) && (!checkElement.is(':visible'))) {
                    var parent = $this.parents('ul').first();
                    var ul = parent.find('ul:visible').slideUp(animationSpeed);
                    ul.removeClass('menu-open');
                    var parent_li = $this.parent("li");
                    checkElement.slideDown(animationSpeed, function () {
                        checkElement.addClass('menu-open');
                        parent.find('li.active').removeClass('active');
                        parent_li.addClass('active');
                    });
                }
            });

            $(".mobile-sidebar .switch-nav").off().on('click',function () {
                // console.log('close',window.innerWidth);
                $(".page-body-wrapper").toggleClass("sidebar-close");
            });

            if(window.innerWidth <= 575){
                $('.page-body').off().on('click',function(){
                    $(".page-body-wrapper").addClass("sidebar-close");
                })
            }
        }
    },
    computed: {
        ...mapGetters([
            'get_auth_information',
            'get_check_auth',
        ]),
    }
}
</script>

<style>

</style>
