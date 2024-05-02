<template>
    <div class="report_data_cell_wrapper text-center">
        <div v-for="days in days_in_month" :key="days">
            <div

                :class="`
                    report_data_cell_body
                    ${date_day(days)['is_friday']?'report_data_cell_body_friday':''}
                    ${date_day(days)['is_today']?'report_data_cell_body_today':''}
                    d-flex flex-wrap`">

                <div class="date_width_2 report_data_cell" style="width: 80px;">
                    <span>
                        {{ date_day(days)['day'] }}
                    </span>
                </div>
                <div class="d-flex">
                    <div v-for="(cell, cell_index) in report_columns" :key="cell_index" :class="`${cell.en_name + cell.id}_width_2 report_data_cell_group`" :data-parent_class="`${cell.en_name + cell.id}_width_1`">
                        <div v-if="cell.childrens.length" >
                            <div class="d-flex">
                                <div v-for="cell_child in cell.childrens" :key="cell_child.id" class="report_data_cell_parent">
                                    <div :class="`${cell_child.en_name + cell_child.id}_width_2 ${cell_child.visibility==0?'remove_cell':''} report_data_cell`" :data-parent_class="`${cell_child.en_name + cell_child.id}_width_1`">

                                        <report-cell
                                            :col_id="cell_child.id"
                                            :input_type="cell_child.value_type"
                                            :days="days"
                                        />

                                        <div class="responsive_edit_in_modal_trigger">
                                            <i class="fa fa-search-plus" @click="open_modal(days)"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="report_data_cell_parent">
                            <div  :class="`${cell.en_name + cell.id}_width_2 ${cell.visibility==0?'remove_cell':''} report_data_cell`" :data-parent_class="`${cell.en_name + cell.id}_width_1`">
                                <report-cell
                                    :col_id="cell.id"
                                    :input_type="cell.value_type"
                                    :days="days"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <responsive-single-cell-input></responsive-single-cell-input> -->
    </div>
</template>

<script>
import moment from 'moment';
import { mapMutations, mapState } from 'vuex';
import convert_to_bn from '../helpers/convert_to_bn';
import ReportCell from './ReportCell.vue';
import ResponsiveSingleCellInput from './ResponsiveSingleCellInput.vue';
export default {
    components: { ReportCell, ResponsiveSingleCellInput },
    methods: {
        ...mapMutations([
            'set_selected_day',
        ]),
        convert_to_bn,
        date_day: function(day){
            let is_friday = false;
            let is_today = false;
            if(Number.isInteger(day)){
                day = day.toString().padStart(2,0);
            }

            let {year, month_no} = this.selected_date;
            let full_date = `${year}-${month_no}-${day}`;
            let date = new moment(full_date).format('DD');
            date = this.convert_to_bn(date);

            if(full_date == new moment().format('YYYY-MM-DD')){
                is_today = true;
            }

            let fullday = new moment(full_date).format('ddd');
            if(fullday == 'Fri'){
                is_friday = true;
            }
            fullday = this.convertToBanglaDay(fullday);

            return {
                day: date+', '+fullday,
                is_friday,
                is_today,
            };
        },
        convertToBanglaDay: function(englishDay) {
            const dayMapping = {
                'Sun': 'রবি',
                'Mon': 'সোম',
                'Tue': 'মঙ্গল',
                'Wed': 'বুধ',
                'Thu': 'বৃহ',
                'Fri': 'শুক্র',
                'Sat': 'শনি'
            };

            return dayMapping[englishDay] || 'Invalid Day';
        },
        open_modal: function(day){
            // console.log(item, window.innerWidth);

            // if(window.innerWidth <= 767.9){
                this.set_selected_day(day);
                $('#reportSmModal').modal('show');
            // }
        },
    },
    computed: {
        ...mapState({
            'selected_date': ({daily_report_module_client: d})=> d.selected_date,

            'report_columns': ({daily_report_module_client: d})=> d.report_columns,
            'report_column_values_by_date': ({daily_report_module_client: d})=> d.report_column_values_by_date,
            'days_in_month': ({daily_report_module_client: d})=> d.days_in_month,
        }),
    }
}
</script>

<style>

</style>
