import Vue from 'vue'
import VueRouter from 'vue-router'
// guest routes
import guestLayout from './views/guest/layouts/guestLayout'
import guestAuthLayout from './views/guest/layouts/guestAuthLayout'
import homePage from './views/guest/pages/frontend/homePage'
import login from './views/guest/pages/auth/login'
import register from './views/guest/pages/auth/register'
import forgetPassword from './views/guest/pages/auth/forgetPassword'

// auth routes
import authLayout from './views/auth/layouts/authLayout'
import dailyReport from './views/auth/pages/daily_report/dailyReport'
import dailyReport2 from './views/auth/pages/daily_report/dailyReport2'
import monthlyPlan from './views/auth/pages/report_plan/monthlyPlan'
import yearlyPlan from './views/auth/pages/report_plan/yearlyPlan'
import userProfile from './views/auth/pages/userProfile'
import monthlyReport from './views/auth/pages/monthlyReport'
import reportDetails from './views/auth/pages/reportDetails'
import seeReportDetails from './views/auth/pages/seeReportDetails'
import mentorList from './views/auth/pages/mentorList'
import followerList from './views/auth/pages/followerList'
import advice from './views/auth/pages/advice'

Vue.use(VueRouter);
window.Fire = new Vue();

const routes = [{
        path: '/',
        component: guestLayout,
        children: [{
            path: '',
            name: 'homePage',
            component: homePage
        }]
    },
    {
        path: '/',
        component: guestAuthLayout,
        children: [{
                path: 'login',
                name: 'login',
                component: login
            },
            {
                path: 'register',
                name: 'register',
                component: register
            },
            {
                path: 'forget-password',
                name: 'forgetPassword',
                component: forgetPassword
            },
        ]
    },
    {
        path: '/report',
        // name: 'report',
        component: authLayout,
        children: [{
                path: '',
                name: 'dailyReport',
                component: dailyReport2
            },
            {
                path: 'r2',
                name: 'dailyReport2',
                component: dailyReport
            },
            {
                path: 'user-profile',
                name: 'userProfile',
                component: userProfile
            },
            {
                path: 'monthly-plan',
                name: 'monthlyPlan',
                component: monthlyPlan
            },
            {
                path: 'yealry-plan',
                name: 'yearlyPlan',
                component: yearlyPlan
            },
            {
                path: 'monthly-report',
                name: 'monthlyReport',
                component: monthlyReport
            },
            {
                path: 'report-details',
                name: 'reportDetails',
                component: reportDetails
            },
            {
                path: 'see-report-details/:user_id',
                name: 'seeReportDetails',
                component: seeReportDetails
            },
            {
                path: 'mentors',
                name: 'mentorList',
                component: mentorList
            },
            {
                path: 'followers',
                name: 'followerList',
                component: followerList
            },
            {
                path: 'advices',
                name: 'advice',
                component: advice
            },
        ]
    },
];

const course_content_router = new VueRouter({
    routes,
    mode: 'hash',
    linkExactActiveClass: 'active',
    // scrollBehavior: function(to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    // }
});

course_content_router.beforeEach((to, from, next) => {
    let isAuthenticated = window.localStorage?.token?.length ? true : false;
    let check_route = (to.path?.split('/').length) && (to.path?.split('/')[1] == 'report') ;

    if(isAuthenticated){
        window.axios.defaults.headers.common["Authorization"] = `Bearer ${window.localStorage?.token}`;
    }

    if (( check_route == true ) && (isAuthenticated == false) ){
        next({
            name: 'login'
        })
    }
    else {
        next()
    }
})

export default course_content_router
