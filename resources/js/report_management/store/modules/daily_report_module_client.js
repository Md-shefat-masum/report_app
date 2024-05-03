import axios from 'axios';
import moment from 'moment';
import isAppOnline from '../../helpers/isOnline';

// state list
const state = {

    report_loaded: false,
    selected_date: {
        date: new moment().format('YYYY-MM-DD'),
        month: new moment().format('MMMM'),
        month_no: new moment().format('MM'),
        day: new moment().format('DD'),
        year: new moment().format('YYYY'),
        year_month: new moment().format('YYYY-MM'),
    },
    selected_date_bangla: {
        date: new moment().format('YYYY-MM-DD'),
        month: new moment().format('MMMM'),
        month_no: new moment().format('MM'),
        day: new moment().format('DD'),
        year: new moment().format('YYYY'),
    },
    days_in_month: 30,
    report_columns: [],

    selected_day: 1,
    selected_col: 0,
    selected_cell_value: {},

    report_column_values: [],
    report_column_values_updated: [], // update after modified
    report_column_values_by_date: {},
    report_column_values_total: {},

}

// get state
const getters = {

}

// actions
const actions = {
    fetch_report_columns: async function ({ state }, payload) {
        let check_internet = await isAppOnline();
        let data = [];

        let cache = await caches.open('api_cache');
        let cache_url = location.origin + `/api/v1/report/get-report-columns`;
        let match = await cache.match(cache_url);
        if (match) {
            let cache_data = await match.json();
            data = cache_data;
        }

        if (check_internet) {
            if(!match){
                let res = await axios.get('/report/get-report-columns');
                data = res.data;
            }else{
                axios.get('/report/get-report-columns');
            }
        }

        state.report_columns = data.filter(i => {
            i.childrens = i.childrens.filter(j => {
                if (j.user_col_visibility && j.user_col_visibility.visibility == 1) {
                    return j;
                }
                else if (!j.user_col_visibility && j.visibility == 1) {
                    return j
                };
            });
            if (i.user_col_visibility && i.user_col_visibility.visibility == 1) {
                return i;
            }
            else if (!i.user_col_visibility && i.visibility == 1) {
                return i;
            };
        });

        // console.log(state.report_columns);
        // state.report_columns = res.data;
    },

    fetch_report_column_values: async function ({ state, dispatch }, payload) {
        state.report_loaded = false;
        let check_internet = await isAppOnline();

        let cache = await caches.open('api_cache');
        let cache_url = location.origin + `/api/v1/report/get-report-column-values?date=${state.selected_date.year_month}-01`;
        let match = await cache.match(cache_url);

        if (match) {
            let data = await match.json();
            state.report_column_values = data;
        } else {
            state.report_column_values = state.report_column_values.map(i => {
                i.value = 0;
                return i;
            })
        }

        if (check_internet) {
            var url = new URL(location.origin + '/api/v1/report/get-report-column-values');
            let { year, month_no } = state.selected_date;
            url.searchParams.set('date', `${year}-${month_no}-01`);

            if(!match){
                let res = await axios.get(url.href);
                state.report_column_values = res.data;
                state.report_column_values_updated = res.data;
            }else{
                axios.get(url.href);
            }
        }

        await dispatch('calc_col_value_by_date');
        await dispatch('calc_col_values');

        setTimeout(() => {
            state.report_loaded = true;
        }, 250);
    },

    calc_col_value_by_date: function ({ state }) {
        let temp = {};
        state.report_column_values.forEach(i => {
            let date = new moment(i.date).format('YYYY-MM-DD');
            if (i.value) {
                temp[date + i.column_id] = {
                    ['column_id']: i.column_id,
                    ['value']: i.value,
                    ['type']: i.col_info.value_type,
                    ['cell_id']: i.id,
                }
            }
        });
        state.report_column_values_by_date = temp;
    },

    calc_col_values: function ({ state }) {
        let temp_total = {};

        state.report_columns.forEach(i => {
            temp_total[i.id] = 0;
            i.childrens.forEach(j => {
                temp_total[j.id] = 0;
            })
        });

        state.report_column_values.forEach(i => {
            if (temp_total[i.column_id]) {
                temp_total[i.column_id] += +i.value;
            } else {
                temp_total[i.column_id] = +i.value;
            }
        });

        state.report_column_values_total = temp_total;
    },

    save_report_data: async function ({ state, dispatch }, payload) {

        let value = +payload.value;
        let report_column_value = {
            "user_id": '',
            "updated_at": "",
            "created_at": "",
            "column_id": payload.column_id,
            "date": payload.date,
            "value": value,
            "id": payload.cell_id || (parseInt(Math.random()) * 1000 + payload.date),
            "col_info": {
                "id": payload.column_id,
                "input_type": "text",
                "value_type": "number"
            }
        };

        let col_value = state.report_column_values.find(i => i.id == payload.cell_id);

        if (col_value) {
            col_value.value = value;
        } else {
            state.report_column_values.push(report_column_value);
        }

        try {
            let cache = await caches.open('api_cache');
            let cache_url = location.origin + `/api/v1/report/get-report-column-values?date=${state.selected_date.year_month}-01`;
            // let match = await cache.match(cache_url);
            // if(match){
            // }else{
            // }
            let temp_res = new Response(JSON.stringify(state.report_column_values));
            await cache.put(cache_url, temp_res);

        } catch (error) {
            console.log(error);
        }

        await dispatch('calc_col_values');
        await dispatch('calc_col_value_by_date');

        let check_internet = await isAppOnline();
        if (check_internet) {
            let res = await axios.post('/report/set-report-col-data', payload);
        } else {
            console.log('app running offline');
            var offline_cell_data = await localforage.getItem('offline_cell_data');
            if (!offline_cell_data) {
                offline_cell_data = [];
            } else {
                offline_cell_data = JSON.parse(offline_cell_data);
            }
            offline_cell_data.push(report_column_value);
            await pwa_services.register_sync("report_saved_offline");
            await localforage.setItem("offline_cell_data", JSON.stringify(offline_cell_data));
        }

    },

    convertToBanglaMonth: function (context, englishMonth) {
        const monthMapping = {
            'January': 'জানুয়ারি',
            'February': 'ফেব্রুয়ারি',
            'March': 'মার্চ',
            'April': 'এপ্রিল',
            'May': 'মে',
            'June': 'জুন',
            'July': 'জুলাই',
            'August': 'অগাস্ট',
            'September': 'সেপ্টেম্বর',
            'October': 'অক্টোবর',
            'November': 'নভেম্বর',
            'December': 'ডিসেম্বর'
        };
        return monthMapping[englishMonth] || '';
    },

    convertToBanglaDigit(context, englishNumber) {
        const digitMapping = {
            '0': '০',
            '1': '১',
            '2': '২',
            '3': '৩',
            '4': '৪',
            '5': '৫',
            '6': '৬',
            '7': '৭',
            '8': '৮',
            '9': '৯'
        };

        let converted = englishNumber.split('').map(digit => digitMapping[digit] || digit).join('');
        // console.log(converted);
        return converted;
    },

}

// mutators
const mutations = {
    change_date: async function (state, data) {

        state.selected_date = {
            date: new moment(data).format('YYYY-MM-DD'),
            year_month: new moment(data).format('YYYY-MM'),
            month: new moment(data).format('MMMM'),
            month_no: new moment(data).format('MM'),
            day: new moment(data).format('DD'),
            year: new moment(data).format('YYYY'),
        };
        state.selected_date_bangla = {
            date: new moment(data).format('YYYY-MM-DD'),
            month: await this.dispatch('convertToBanglaMonth', new moment(data).format('MMMM')),
            month_no: await this.dispatch('convertToBanglaDigit', new moment(data).format('MM')),
            day: await this.dispatch('convertToBanglaDigit', new moment(data).format('DD')),
            year: await this.dispatch('convertToBanglaDigit', new moment(data).format('YYYY')),
        };
        state.days_in_month = new moment(data).daysInMonth();
        this.dispatch('fetch_report_column_values');
    },

    set_report_load: (state, value) => {
        state.report_loaded = value;
    },

    set_selected_day: (state, value) => {
        state.selected_day = value
    },

    set_selected_day_col: (state, { days, col_id }) => {
        state.selected_day = days.toString().padStart(2, '0');
        state.selected_col = col_id;

        let selected_col_value = state.report_column_values.find((i) => {
            let date = state.selected_date.year_month + `-${state.selected_day}`;
            return (i.date == date && i.column_id == col_id);
        });

        if (selected_col_value) {
            state.selected_cell_value = selected_col_value;
        } else {
            state.selected_cell_value = {};
        }

        // console.log(state.selected_cell_value, days, col_id);

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
