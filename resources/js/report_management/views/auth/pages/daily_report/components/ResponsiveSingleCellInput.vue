<template>
    <div class="responsive_single_cell">
        <input type="text" @change="update_report($event)" :value="selected_cell_value.value" class="data_input_cell">
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import secondsToHms from '../helpers/secondsToHms';
import convert_to_bn from '../helpers/convert_to_bn';
import check_is_num from '../helpers/check_is_num';
import digit_to_english from '../helpers/digit_to_english';
export default {
    data: ()=>({
        secondsToHms,
        check_is_num,
        convert_to_bn,
    }),
    methods: {
        ...mapActions([
            'save_report_data'
        ]),
        update_report: async function(e){
            let value = e.target.value;
            let date = this.selected_date.year_month + `-${this.selected_day}`;

            value = digit_to_english(value);

            await this.save_report_data({
                value,
                date,
                column_id: this.selected_col,
                cell_id: this.get_value().cell_id,
            });

            $(`.${parseInt(this.selected_day)}_${this.selected_col}`).val(this.convert_to_bn(value));
        },
        get_value: function(){
            let {year, month_no} = this.selected_date;
            let days = this.selected_day || "01";
            let index = `${year}-${month_no}-${days}`+this.selected_col;
            let col_info = this.report_column_values_by_date[index];
            console.log(col_info, index);
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
            'report_column_values_by_date': ({daily_report_module_client: d})=> d.report_column_values_by_date,
            'selected_cell_value': ({daily_report_module_client: d})=> d.selected_cell_value,

            'selected_date': ({daily_report_module_client: d})=> d.selected_date,
            'selected_day': ({daily_report_module_client: d})=> d.selected_day,
            'selected_col': ({daily_report_module_client: d})=> d.selected_col,
        })
    }
}
</script>

<style>

</style>
