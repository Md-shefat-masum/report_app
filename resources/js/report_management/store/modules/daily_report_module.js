import axios from 'axios';

// state list
const state = {
    report_details: {},
    report_loaded: false,
    report_first_time_loaded: false,
    report_details_params: {
        month: null,
        user_id: null,
    },
}

// get state
const getters = {
    get_report_details: state => state.report_details,
    get_report_loaded: state => state.report_loaded,
    get_report_first_time_loaded: state => state.report_first_time_loaded,
    get_report_details_params: state => state.report_details_params,
}

// actions
const actions = {
    fetch_report_details: async function ({ state }) {
        var url = new URL(location.origin+'/api/v1/report/get-daily-report');
        for (const key in state.report_details_params) {
            if (Object.hasOwnProperty.call(state.report_details_params, key)) {
                const param = state.report_details_params[key];
                url.searchParams.set(key,param);
            }
        }

        var cache_found = false;
        try {
            let cache = await caches.open('api_cache');
            let match = await cache.match(url.href);
            if(match){
                let data = await match.json();
                this.commit('set_report_loaded', true);
                this.commit('set_report_details', data);
                cache_found = true;
            }else{
                this.commit('set_report_loaded', false);
            }

        } catch (error) {
            console.log(error);
            this.commit('set_report_loaded', false);
        }

        if(navigator.onLine){
            await axios.get(url.href)
                .then((res) => {
                    if(!cache_found){
                        this.commit('set_report_details', res.data);
                    }
                    this.commit('set_report_loaded', true);
                })
                .catch((err) => {
                    window.s_alert('something went wrong, reload window to fix it. ' + (err.response?.data?.err_message || err.response?.data?.message), 'error');
                })
        }else{
            window.s_alert('internet connection lost', 'error')
        }
    },
}

// mutators
const mutations = {
    set_report_details: function (state, report_details) {
        state.report_details = report_details;
        this.commit('update_report_column', {report_column: report_details.report_column});
    },
    update_report_column: async function (state, {report_column, updated_data}) {
        if(report_column){
            state.report_details.report_column = report_column;
        }
    },
    set_report_loaded: (state, value) => {
        state.report_loaded = value;
    },
    set_report_first_time_loaded: (state, value) => {
        state.report_first_time_loaded = value;
    },
    set_report_details_params: (state, {month, user_id}) => {
        state.report_details_params = {month, user_id};
    },
    calc_report_column: function(state, payload){
        var {report_body, report_column} = state.report_details;
        var {day_index, parent_index, child_index, form_data} = payload;

        report_column.forEach(function(column){
            column.sum_of_report_data_sum_value = 0;
            column.childrens.forEach(i=>i.sum_of_report_data_sum_value = 0)
        });
        report_column.forEach(function(column, calc_parent_index){
            report_body.forEach(function(report_days){
                var parent_data = report_days.report[calc_parent_index];

                if(parent_data.onday_report_data.value){
                    column.sum_of_report_data_sum_value += +parent_data.onday_report_data.value;
                }
                if(parent_data.childrens.length){
                    var childrens = parent_data.childrens;
                    childrens.forEach(function(children_data, children_index){
                        column.childrens[children_index].sum_of_report_data_sum_value += +children_data.onday_report_data.value;
                    })
                }
            })
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
