import axios from 'axios';
import router from 'vue-router'
import isAppOnline from '../../helpers/isOnline';

// state list
const state = {
    auth_information: {},
    auth_tokens: null,
    check_auth: false,
}

// get state
const getters = {
    get_auth_information: state => state.auth_information,
    get_auth_tokens: state => state.auth_tokens,
    get_check_auth: state => state.check_auth,
}

// actions
const actions = {
    fetch_check_auth: async function (state) {
        let check_internet = await isAppOnline();
        if(check_internet){
            axios.post('/user/check-auth')
                .then((res) => {
                    // console.log(res.data);
                    this.commit('set_check_auth', true);
                })
                .catch((err)=>{
                    this.commit('set_check_auth', false);
                    window.localStorage.removeItem('token');
                    console.log('user not authenticated');
                    window.location.href = '#/login';
                })
        }else{
            this.commit('set_check_auth', true);
        }
    },
    fetch_auth_information: async function (state) {
        let check_internet = await isAppOnline();
        await axios.get('/user/user_info')
            .then((res) => {
                // console.log(res.data);
                this.commit('set_auth_information', res.data);
            })
            .catch((err)=>{
                window.s_alert('something went wrong, reload window to fix it. '+(err.response?.data?.err_message || err.response?.data?.message), 'error');
            })
    },
    check_app_theme:  function(state, value){
        let body = document.querySelector('body');
        let check = localStorage.getItem('app_theme');

        if(value == 'light'){
            body.setAttribute('main-theme-layout', "");
            localStorage.removeItem('app_theme');
            return "";
        }
        else if(value == 'main-theme-layout-4'){
            body.setAttribute('main-theme-layout', value);
            localStorage.setItem('app_theme', value);
            return value;
        }
        else if(check){
            body.setAttribute('main-theme-layout', check);
            return check;
        }
        else{
            body.setAttribute('main-theme-layout',"");
            return "";
        }
    }
}

// mutators
const mutations = {
    set_auth_information: function (state, auth_information) {
        state.auth_information = auth_information;
    },
    set_auth_tokens: function (state, auth_tokens) {
        state.auth_tokens = auth_tokens;
    },
    set_check_auth: function (state, check_auth) {
        state.check_auth = check_auth;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
