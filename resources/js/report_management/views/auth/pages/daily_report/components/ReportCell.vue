<template>
    <!-- time " -->
    <input type="text"
        v-if="input_type == 'time'"
        @change="update_cell($event.target)"
        @focus="set_selected_day_col({days, col_id})"
        :value="convert_to_bn(secondsToHms(cell_value))"
        placeholder="0:0"
        :class="`text-center bn ${days}_${col_id}`">

    <!-- boolean -->
    <input
        v-else-if="input_type == 'boolean'"
        @change="update_cell({value: $event.target.checked?1:0})"
        type="checkbox"
        :checked="cell_value"
        :class="`${days}_${col_id}`">

    <!-- number -->
    <input type="text"
        @change="update_cell($event.target)"
        @focus="set_selected_day_col({days, col_id})"
        v-else
        placeholder="-"
        :value="convert_to_bn(cell_value)"
        :class="`text-center bn ${days}_${col_id}`">
</template>

<script>
import secondsToHms from '../helpers/secondsToHms'
import check_is_num from '../helpers/check_is_num'
import { mapActions, mapMutations, mapState } from 'vuex'
import digit_to_english from '../helpers/digit_to_english';
import convert_to_bn from '../helpers/convert_to_bn';
var _ = require('lodash');
export default {
    props: [
        'col_id',
        'input_type',
        'days',

        'value',
        'day_index',
        'parent_index',
    ],
    methods: {
        ...mapActions([
            'save_report_data',
        ]),
        ...mapMutations([
            'set_selected_day',
            'set_selected_day_col',
        ]),
        secondsToHms,
        check_is_num,
        convert_to_bn,
        update_cell: _.debounce(async function(target){
            let value = target.value;
            let {year, month_no} = this.selected_date;
            let date = `${year}-${month_no}-${this.days.toString().padStart(2,0)}`;

            if(!['time', 'boolean'].includes(this.input_type) ){
                value = digit_to_english(value);
                if(value > 0){
                    value = parseInt(value);
                }else{
                    target.value = '';
                    value = '';
                }
                $(`.${this.days}_${this.col_id}`).val(this.convert_to_bn(value));
            }
            else if(this.input_type == 'time'){
                value = digit_to_english(value, 'time');
                let time = value;
                if(!( /\d{1,2}[:|,|.]\d{1,2}/.test(time) )){
                    time = "0:0";
                    window.s_alert('time pattern should be 00:00 or 00:0 or 0:0 or 0,0 or 0.0','warning')
                    target.value = time;
                    return 0;
                }

                let hour = parseInt( parseFloat(time) ) * 60 * 60;
                let min  = parseInt( (time.split('.')[1] || time.split(':')[1] || time.split(',')[1] || time.split(' ')[1] ) || 0 ) * 60;
                let total_sec = hour + min;
                value = total_sec;
                // target.value = this.convert_to_bn(this.secondsToHms(value));
                $(`.${this.days}_${this.col_id}`).val(this.convert_to_bn(this.secondsToHms(value)));
            }
            else if(this.input_type == 'boolean'){
                $(`.${this.days}_${this.col_id}`).prop('checked',value);
            }

            await this.save_report_data({
                value,
                date,
                column_id: this.col_id,
                cell_id: this.get_value().cell_id,
            });

        },200),
        get_value: function(){
            let {year, month_no} = this.selected_date;
            let days = this.days || 1;
            days = this.days.toString().padStart(2,0);
            let index = `${year}-${month_no}-${days}`+this.col_id;
            let col_info = this.report_column_values_by_date[index];
            if(col_info && col_info.value){
                return col_info;
            }
            return {
                value: '',
                id: '',
            };
        }
    },
    computed: {
        ...mapState({
            'selected_date': ({daily_report_module_client: d})=> d.selected_date,

            'report_columns': ({daily_report_module_client: d})=> d.report_columns,
            'report_column_values_by_date': ({daily_report_module_client: d})=> d.report_column_values_by_date,
            'days_in_month': ({daily_report_module_client: d})=> d.days_in_month,
        }),
        cell_value: function(){
            return this.get_value().value;
        },
        cell_id: function(){
            return this.get_value().id;
        },
    }
}
</script>

<style></style>

