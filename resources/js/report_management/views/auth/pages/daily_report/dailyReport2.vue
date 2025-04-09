<template>
    <div>
        <div style="width: calc(100% - 10px); margin: 0px auto;">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <top-right-date></top-right-date>
                        </div>
                        <div class="col-6">
                            <div class="d-flex flex-wrap justify-content-end align-items-center">
                                <div>
                                    <month-filter></month-filter>
                                </div>
                                <div>
                                    <!-- <button class="btn btn-outline-primary ms-3 btn-sm px-2">
                                        <i class="fa fa-gear" style="font-size: 19px;"></i>
                                    </button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body ">
                    <div class="report_cell_body">
                        <div class="report_loader" v-if="!report_loaded">
                            <div class="loader-box">
                                <span class="rotate dotted"></span>
                            </div>
                        </div>

                        <report-heading></report-heading>
                        <report-body></report-body>
                        <report-footer></report-footer>

                    </div>
                </div>

            </div>
        </div>

        <responsive-report></responsive-report>
    </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapMutations, mapState } from 'vuex'
import TopRightDate from './components/TopRightDate.vue';
import MonthFilter from './components/MonthFilter.vue';
import ReportHeading from './components/ReportHeading.vue';
import ReportFooter from './components/ReportFooter.vue';
import ReportBody from './components/ReportBody.vue';
import ResponsiveReport from './components/ResponsiveReport.vue';
export default {
    components: { TopRightDate, MonthFilter, ReportBody, ReportHeading, ReportFooter, ResponsiveReport },
    data: ()=>({

    }),
    created: async function(){
        if(this.report_columns.length){
            this.fetch_report_columns();
        }else{
            await this.fetch_report_columns();
        }
        await this.change_date(new moment());
        await this.calc_width();
        setTimeout(() => {
            $('.report_data_cell_body_today')[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 600);
    },
    watch: {
        selected_date: {
            handler: async function(){
                await this.calc_width();
                // setTimeout(() => {
                //     this.set_report_load(true);
                // }, 400);
            }
        },
        report_column_values_by_date: {
            handler: async function(){

            },
            deep: true,
        },
        report_column_values_total: {
            handler: async function(){

            },
            deep: true,
        },
    },
    methods: {
        ...mapMutations([
            'change_date',
            'set_report_load',
        ]),
        ...mapActions([
            'fetch_report_columns',
        ]),

        calc_width: function (){
            var that = this;
            return new Promise((resolve)=>{
                setTimeout(async () => {
                    $('.remove_cell').parents('.cell_heading_body').remove();
                    $('.remove_cell').parents('.report_data_cell_parent').remove();
                    var date_width = $(`.date_width_1`).outerWidth();
                    $(`.date_width_1`).css('width',date_width);
                    $(`.date_width_2`).css('width',date_width);

                    await that.set_header_cols_width();
                    await that.set_report_cols_width();

                    $('.report_data_cell_parent input').off().on('focus', function(){
                        $('.report_data_cell_parent').removeClass('input_loading');
                        $(this).parents('.report_data_cell_parent').addClass('input_loading');
                    });
                    resolve(1)
                }, 10000);
            })
        },

        set_report_cols_width: function(){
            return new Promise((resolve, reject)=>{
                var cels = [...document.querySelectorAll('.report_data_cell')];
                cels.forEach(el=>{
                    var parent_el = el.dataset.parent_class;
                    if(parent_el){
                        // parent_el = parent_el.replaceAll(' ', '_');

                        try {
                            if(cels.length == 2){
                                $(el).css('width','100%')
                            }else{
                                let p_el = $('.'+parent_el)[0];
                                if(p_el){
                                    $(el).css('width', p_el.style.width);
                                }else{
                                    reject(parent_el);
                                }
                            }
                        } catch (error) {
                            console.log(error, el, parent_el, '.report_data_cell');
                            return reject(0);
                        }
                    }
                });

                var cels = [...document.querySelectorAll('.report_data_cell_group')];
                cels.forEach(el=>{
                    var parent_el = el.dataset.parent_class;
                    if(parent_el){
                        try {
                            $(el).css('width', $('.'+parent_el)[0].style.width);
                        } catch (error) {
                            console.log(error, parent_el, '.report_data_cell_group');
                        }
                    }
                });

                var cels = [...document.querySelectorAll('.cell_sub_heading_total')];
                cels.forEach(el=>{
                    var parent_el = el.dataset.parent_class;
                    if(parent_el){
                        try {
                            $(el).css('width', $('.'+parent_el)[0].style.width);
                        } catch (error) {
                            console.log(error, parent_el, '.cell_sub_heading_total');
                        }
                    }
                });

                var cels = [...document.querySelectorAll('.total_group')];
                cels.forEach(el=>{
                    var parent_el = el.dataset.parent_class;
                    if(parent_el){
                        try {
                            $(el).css('width', $('.'+parent_el)[0].style.width);
                        } catch (error) {
                            console.log(error, parent_el, '.total_group');
                        }
                    }
                });

                resolve(1);
            })
        },

        set_header_cols_width: function(){
            return new Promise((resolve, reject)=>{

                var cels = [...document.querySelectorAll('.cell_sub_heading')];
                cels.forEach(el=>{
                    if(el){
                        if(!el.style.width){
                            var parent_width = $(el).width();
                            parent_width <= 50 ? parent_width = 50 : parent_width = parent_width;

                            if(el.parentNode.parentNode.childNodes.length == 1)
                                parent_width = "100%";
                            $(el).css('width', parent_width);
                        }
                    }
                });

                var cels = [...document.querySelectorAll('.cell_heading')];
                cels.forEach(el=>{
                    if(el){
                        if(!el.style.width){
                            var parent_width = $(el).width();
                            parent_width <= 50 ? parent_width = 50 : parent_width = parent_width;
                            $(el).css('width', parent_width);
                        }
                    }
                });
                resolve(1);
            })
        },

    },
    computed: {
        ...mapState({
            'report_loaded': ({daily_report_module_client: d})=> d.report_loaded,
            'selected_date': ({daily_report_module_client: d})=> d.selected_date,
            'selected_date_bangla': ({daily_report_module_client: d})=> d.selected_date_bangla,

            'report_columns': ({daily_report_module_client: d})=> d.report_columns,
            'report_column_values': ({daily_report_module_client: d})=> d.report_column_values,
            'report_column_values_by_date': ({daily_report_module_client: d})=> d.report_column_values_by_date,
            'report_column_values_total': ({daily_report_module_client: d})=> d.report_column_values_total,

            'days_in_month': ({daily_report_module_client: d})=> d.days_in_month,
        }),
    }
}
</script>

<style></style>
