import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import basic_information from './modules/course_content_module';
import auth_modules from './modules/auth_modules';
import daily_report_module from './modules/daily_report_module';
import daily_report_module_client from './modules/daily_report_module_client';

const store = new Vuex.Store({
    modules: {
        basic_information,
        auth_modules,
        daily_report_module,
        daily_report_module_client,
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    // plugins: [createPersistedState()],
});

export default store;
