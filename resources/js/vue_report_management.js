require('./bootstrap');
import axios from "axios";
import Vue from "vue";
window.Vue = require('vue');
window._ = require('lodash');
import router from './report_management/report_management_router';

const init_remove_alert = () => {
    $('input,select,textarea').on('change', function () {
        $(this).siblings(".text-danger").remove();
        $(`.alert_${$(this).attr('name')}`).remove();
        setTimeout(() => {
            init_remove_alert();
        }, 300);
    });
}

axios.defaults.baseURL = location.origin + '/api/v1';

var i = 0;
window.progress_value = (start=1, limit=[30,34,39,42,48,44,49,50,53,54][Math.floor(Math.random() * 10)], loading_type="uploading") => {
    if (i == 0) {
        i = 1;
        var width = start;
        window.request_interval_id = setInterval(frame, 10);
        function frame() {
            if (width >= limit) {
                i = 0;
                if (width == 100) {
                    clearInterval(request_interval_id);
                    setTimeout(() => {
                        $('form .submit_button').prop("disabled",false);
                        $('form .submit_button').attr('type','submit').html('submit');
                        $('form .loader').removeClass('active');
                        $('form .loader .d_progress').html('');
                    }, 1000);
                }
            } else {
                width++;
                $('form .loader .d_progress').html(width + "%");
                $('form .submit_button').prop("disabled",true);
                if(width == limit){
                    $('form .submit_button').attr('type','button').html('processing' + ' ' + width + '%');
                }else{
                    $('form .submit_button').attr('type','button').html(loading_type + ' ' + width + '%');
                }
            }
        }
    }
}



window.onUploadProgress = (progressEvent) => {
    // var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    // console.log('onUploadProgress', percentCompleted);
}

function onDownloadProgress (progressEvent) {
    progress_value(50, 100, 'loading');
    // var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    // console.log('onDownloadProgress');
}

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // Pace.restart();
    progress_value();
    $('form .loader').addClass('active');
    // console.log(config);
    return {
        ...config,
        onUploadProgress,
        onDownloadProgress,
    };
}, function (error) {
    // Do something with request error
    console.log('request error');
    return Promise.reject(error);
});

window.axios.interceptors.response.use(
    (response) => {
        $(`select`).siblings(".text-danger").remove();
        $(`input`).siblings(".text-danger").remove();
        $(`textarea`).siblings(".text-danger").remove();
        $('.form_errors').html('');
        return response;
    },
    (error) => {
        // whatever you want to do with the error
        // console.log(error.response.data.errors);
        let object = error.response?.data?.data;
        $(`select`).siblings(".text-danger").remove();
        $(`input`).siblings(".text-danger").remove();
        $(`textarea`).siblings(".text-danger").remove();
        $('.form_errors').html('');
        init_remove_alert();

        let error_html = ``;

        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                if (document.getElementById(`${key}`)) {
                    $(`#${key}`)
                        .parent("div")
                        .append(`<div class="text-danger">${element[0]}</div>`);
                } else {
                    $(`input[name="${key}"]`)
                        .parent("div")
                        .append(`<div class="text-danger">${element[0]}</div>`);

                    $(`select[name="${key}"]`)
                        .parent("div")
                        .append(`<div class="text-danger">${element[0]}</div>`);

                    $(`input[name="${key}"]`).trigger("focus");

                    $(`textarea[name="${key}"]`)
                        .parent("div")
                        .append(`<div class="text-danger">${element[0]}</div>`);

                    $(`textarea[name="${key}"]`).trigger("focus");
                }
                // console.log({
                //     [key]: element,
                // });

                error_html += `
                    <div class="alert alert_${key} my-1 mx-2 alert-danger pe-5 inverse alert-dismissible fade show" role="alert">
                        <i class="icon-alert txt-dark rounded-0"></i>
                        <div>${element}</div>
                        <button type="button" class="btn-close txt-light" data-bs-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                `;
            }
        }

        $('.form_errors').html(error_html);

        if (typeof error ?.response ?.data === "string") {
            console.log("error", error ?.response ?.data ?error ?.response ?.data : error.response);
        } else {
            console.log(error.response);
        }
        throw error;
    }
);

// import vuex
const {
    default: store
} = require('./report_management/store/index');

// import {
//     mapGetters,
//     mapActions,
//     mapMutations
// } from 'vuex';

Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('ReportWrapper', require('./report_management/reportWrapper').default);

const app = new Vue({
    el: '#report_body',
    router,
    store,

    data: function () {
        return {
            test: 'hi'
        }
    }
});
