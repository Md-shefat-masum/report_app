<template>
    <div style="width: calc(100% - 65px);margin: 0 auto;">
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-6">
                        <i class="fa fa-calendar"></i>
                        <span class="report_bn_date">
                            <!-- {{report_data.bn_day}} -->
                            {{report_data.bn_month_name}},
                            {{report_data.bn_year_name}}
                        </span>
                    </div>
                    <div class="col-6 d-flex justify-content-end align-items-center">
                        <div>
                            <form name="report_search_form" class="report_search_form">
                                <input type="month" class="form-control" name="month" v-model="selected_month" @click="$event.target.showPicker()">
                                <!-- <button type="submit"><i class="fa fa-sign-in"></i></button> -->
                            </form>
                        </div>
                        <div>
                            <!-- <button class="btn btn-outline-primary ms-3 btn-sm px-2" >
                                <i style="font-size: 19px;" class="fa fa-gear"></i>
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="card-body">
                <ul>
                    <li v-for="heading in report_data.report_column" :key="heading.id">
                        {{ heading.bn_name }}
                        <ul class="ps-5" v-if="heading.childrens.length">
                            <li v-for="child in heading.childrens" :key="child.id">
                                {{ child.bn_name }}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div> -->
            <div class="card-body ">
                <div class="report_cell_body">
                    <div class="report_loader" v-if="!get_report_loaded">
                        <div class="loader-box">
                            <span class="rotate dotted"></span>
                        </div>
                    </div>

                    <div class="report_cells d-flex flex-wrap">
                        <div class="cell_heading date_width_1">
                            <span>
                                তারিখ
                            </span>
                        </div>
                        <div v-for="heading in report_data.report_column" :key="heading.id"
                            :class="`cell_heading ${heading.en_name+heading.id}_width_1`">
                            <span>{{ heading.bn_name }}</span>
                            <div v-if="heading.childrens.length" class="d-flex justify-content-center">
                                <div v-for="child in heading.childrens"
                                    :key="child.id"
                                    :class="`cell_heading_body`">
                                    <div :class="`${child.en_name+child.id}_width_1 ${child.visibility==0?'remove_cell':''} cell_sub_heading`">
                                        <span>
                                            {{ child.bn_name }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="report_data_cell_wrapper text-center">
                        <div v-for="(report, day_index) in report_data.report_body" :key="report.id">
                            <div
                                @click="open_modal(report)"
                                :class="`
                                report_data_cell_body
                                ${report.is_friday?'report_data_cell_body_friday':''}
                                ${report.is_today?'report_data_cell_body_today':''}
                                d-flex flex-wrap`">

                                <div class="date_width_2 report_data_cell">
                                    <span>
                                        {{ report.bn_day }},
                                        {{ report.bn_day_name }}
                                    </span>
                                </div>
                                <div v-if="report.report.length" class="d-flex">
                                    <div v-for="(cell, parent_index) in report.report" :key="cell.id" :class="`${cell.en_name + cell.id}_width_2 report_data_cell_group`">
                                        <div v-if="cell.childrens.length" class="d-flex">
                                            <div v-for="(item, child_index) in cell.childrens" :key="item.id" class="report_data_cell_parent">
                                                <div :class="`${item.en_name + item.id}_width_2 ${item.visibility==0?'remove_cell':''} report_data_cell`">

                                                    <input @change="check_is_num(item,$event, day_index, parent_index, child_index)"
                                                        type="text"
                                                        min="0"
                                                        v-if="item.value_type=='time'"
                                                        :value="secondsToHms(item.onday_report_data.value)" placeholder="-" class="text-center">

                                                    <input v-else-if="item.value_type=='boolean' && item.onday_report_data.value == '1'"
                                                        @change="update_cell(item, $event, day_index, parent_index, child_index)"
                                                        type="checkbox"
                                                        checked
                                                        placeholder="-" class="text-center">

                                                    <input v-else-if="item.value_type=='boolean' && item.onday_report_data.value == '0'"
                                                        @change="update_cell(item,$event, day_index, parent_index, child_index)"
                                                        type="checkbox"
                                                        placeholder="-" class="text-center">

                                                    <input v-else-if="item.value_type=='boolean' && (item.onday_report_data.value == null || cell.onday_report_data.value == '') "
                                                        @change="update_cell(item,$event, day_index, parent_index, child_index)"
                                                        type="checkbox"
                                                        placeholder="-" class="text-center">

                                                    <input v-else
                                                        @change="check_is_num(item,$event, day_index, parent_index, child_index)"
                                                        type="text"
                                                        min="0"
                                                        v-model="item.onday_report_data.value" placeholder="-" class="text-center">
                                                    <!-- <span>
                                                        {{ item.value || '-' }}
                                                    </span> -->
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="report_data_cell_parent">
                                            <div :class="`${cell.en_name + cell.id}_width_2 ${cell.visibility==0?'remove_cell':''} report_data_cell`">
                                                <input type="text"
                                                    @change="check_is_num(cell,$event, day_index, parent_index)"
                                                    v-if="cell.value_type == 'time'"
                                                    :value="secondsToHms(cell.onday_report_data.value)" placeholder="-" class="text-center">

                                                <input v-else-if="cell.value_type=='boolean' && cell.onday_report_data.value == '1'"
                                                    @change="update_cell(cell,$event, day_index, parent_index)"
                                                    type="checkbox"
                                                    checked
                                                    class="text-center">

                                                <input v-else-if="cell.value_type=='boolean' && cell.onday_report_data.value == '0'"
                                                    @change="update_cell(cell,$event, day_index, parent_index)"
                                                    type="checkbox"
                                                    class="text-center">

                                                <input v-else-if="cell.value_type=='boolean' && (cell.onday_report_data.value == null || cell.onday_report_data.value == '')"
                                                    @change="update_cell(cell,$event, day_index, parent_index)"
                                                    type="checkbox"
                                                    class="text-center">

                                                <input type="text"
                                                    @change="check_is_num(cell,$event, day_index, parent_index)"
                                                    v-else
                                                    v-model="cell.onday_report_data.value" placeholder="-" class="text-center">
                                                <!-- <span>
                                                    {{ cell.value || '-' }}
                                                </span> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="report_cells d-flex flex-wrap mt-1">
                        <div class="cell_heading date_width_1">
                            <span>
                                মোট :
                            </span>
                        </div>
                        <div v-for="heading in report_data.report_column" :key="heading.id"
                            :class="`cell_heading ${heading.en_name+heading.id}_width_1`">
                            <!-- <span>{{ heading.bn_name }}</span> -->
                            <div v-if="heading.childrens.length" class="d-flex justify-content-center">
                                <div v-for="child in heading.childrens"
                                    :key="child.id"
                                    :class="`cell_heading_body`">
                                    <div :class="`${child.en_name+child.id}_width_1 ${child.visibility==0?'remove_cell':''} cell_sub_heading_total cell_sub_heading`">
                                        <span v-if="child.value_type == 'time'">
                                            {{ convert_to_bn(secondsToHms(child.sum_of_report_data_sum_value)) }}
                                        </span>
                                        <span v-else>
                                            {{ convert_to_bn(child.sum_of_report_data_sum_value) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="cell_heading_body justify-content-center">
                                    <div class="cell_sub_heading_total cell_sub_heading">
                                        <span v-if="heading.value_type == 'time'">
                                            {{ convert_to_bn(secondsToHms(heading.sum_of_report_data_sum_value)) }}
                                        </span>
                                        <span v-else>
                                            {{ convert_to_bn(heading.sum_of_report_data_sum_value) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="reportSmModal" tabindex="-1" role="dialog" aria-labelledby="reportSmModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content" id="report_content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="reportSmModalLabel">
                                {{ selected_date_data.bn_day }},
                                {{ selected_date_data.bn_month_name }}
                                {{ selected_date_data.bn_day_name+'বার' }}
                                {{ selected_date_data.bn_year_name }}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <div class="row my-2" v-for="(cell) in selected_date_data.report" :key="cell.id">
                                    <div :class="`${cell.value_type=='boolean'?'col-4':'col-12'} text-center`">
                                        <h6>{{cell.bn_name}}</h6>
                                    </div>
                                    <div class="col-12" v-if="cell.childrens.length">
                                        <div class="row justify-content-center">
                                            <div :class="`col-4 modal_cols mb-4 ${item.visibility==0?'d-none':''}`" v-for="(item) in cell.childrens" :key="item.id">
                                                <label for="">{{item.bn_name}}</label>
                                                <input @change="check_is_num(item,$event)"
                                                    type="text"
                                                    min="0"
                                                    v-if="item.value_type=='time'"
                                                    :value="secondsToHms(item.onday_report_data.value)" placeholder="-" class="form-control">

                                                <input v-else-if="item.value_type=='boolean' && item.onday_report_data.value == '1'"
                                                    @change="update_cell(item,$event)"
                                                    type="checkbox"
                                                    checked >

                                                <input v-else-if="item.value_type=='boolean' && item.onday_report_data.value == '0'"
                                                    @change="update_cell(item,$event)"
                                                    type="checkbox" >

                                                <input v-else-if="item.value_type=='boolean' && (item.onday_report_data.value == null || cell.onday_report_data.value == '') "
                                                    @change="update_cell(item,$event)"
                                                    type="checkbox" >

                                                <input v-else
                                                    @change="check_is_num(item,$event)"
                                                    type="text"
                                                    min="0"
                                                    v-model="item.onday_report_data.value" placeholder="-" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else :class="`${cell.value_type=='boolean'?'col-4':'col-12'} ${cell.visibility==0?'d-none':''}`">
                                        <div class="row justify-content-center">
                                            <div :class="`${cell.value_type=='boolean'?'col-12':'col-4'} mb-4`">
                                                <input type="text"
                                                    @change="check_is_num(cell,$event)"
                                                    v-if="cell.value_type == 'time'"
                                                    :value="secondsToHms(cell.onday_report_data.value)" placeholder="-" class="form-control">

                                                <input v-else-if="cell.value_type=='boolean' && cell.onday_report_data.value == '1'"
                                                    @change="update_cell(cell,$event)"
                                                    type="checkbox"
                                                    checked >

                                                <input v-else-if="cell.value_type=='boolean' && cell.onday_report_data.value == '0'"
                                                    @change="update_cell(cell,$event)"
                                                    type="checkbox" >

                                                <input v-else-if="cell.value_type=='boolean' && (cell.onday_report_data.value == null || cell.onday_report_data.value == '')"
                                                    @change="update_cell(cell,$event)"
                                                    type="checkbox" >

                                                <input type="text"
                                                    @change="check_is_num(cell,$event)"
                                                    v-else
                                                    v-model="cell.onday_report_data.value" placeholder="-" class="form-control">

                                            </div>
                                        </div>
                                    </div>
                                    <div :class="`col-12 ${cell.visibility==0?'d-none':''}`">
                                        <hr>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
var _ = require('lodash');

export default {
    data: function(){
        return {
            selected_month: '',
            user_id: 0,
            selected_date_data: {},
            report_data: {},
            // selected_month: "2022-03",
        }
    },
    created: async function(){
        this.selected_month =  new Date().toISOString().substring(0, 7);
        this.user_id = this.get_auth_information?.id;
        setTimeout(() => {
            $('.report_data_cell_body_today')[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    },
    watch:{
        selected_month: {
            handler: async function(newV) {
                if(this.get_check_auth){
                    await this.fetch_report();
                }
            },
            deep: true,
        },
        get_auth_information: {
            handler: async function(newV){
                this.user_id = newV.id;
                await this.fetch_report();
            },
            deep: true,
        },
        get_report_details: {
            handler: function(newv) {
                this.report_data = newv;
                this.calc_width();
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions([
            'fetch_report_details',
        ]),

        ...mapMutations([
            'update_report_column',
            'set_report_first_time_loaded',
            'calc_report_column',
            'set_report_details_params',
        ]),

        fetch_report: async function(){
            this.set_report_details_params({month: this.selected_month, user_id: this.user_id})
            await this.fetch_report_details();
        },

        update_cell: async function(item, event, day_index = null, parent_index = null, child_index = null){
            // console.log(item, item.onday_report_data.value);
            let form_data = {...item.onday_report_data};
            if(item.value_type == 'time'){
                // let time = item.onday_report_data.value;
                let time = event.target.value;
                let hour = parseInt( parseFloat(time) ) * 60 * 60;
                let min  = parseInt( (time.split('.')[1] || time.split(':')[1] || time.split(',')[1] || time.split(' ')[1] ) || 0 ) * 60;
                let total_sec = hour + min;
                form_data.value = total_sec;
                item.onday_report_data.value = total_sec;
            }
            if(item.value_type == 'boolean'){
                item.onday_report_data.value = form_data.value = event.target.checked ? 1 : 0;
            }

            if(navigator.onLine){
                await axios.post('/report/update-daily-report',form_data)
                    .then(res=>{
                        // console.log(res.data);
                        // this.update_report_column({report_column: res.data.report_column});
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
            }else{
                var offline_cell_data = await localforage.getItem('offline_cell_data');
                if(!offline_cell_data){
                    offline_cell_data = [];
                }else{
                    offline_cell_data = JSON.parse(offline_cell_data);
                }
                offline_cell_data.push(form_data);
                console.log('data saved offline');
                await pwa_services.register_sync("report_saved_offline");
                await localforage.setItem("offline_cell_data", JSON.stringify(offline_cell_data));
            }

            this.calc_report_column({day_index, parent_index, child_index, form_data, report_data: this.report_data, item})
        },

        open_modal: function(item){
            // console.log(item, window.innerWidth);
            if(window.innerWidth <= 575){
                this.selected_date_data = item;
                $('#reportSmModal').modal('show');
            }
        },

        check_is_num: _.debounce(function(item, event, day_index = null, parent_index = null, child_index = null){
            let val = item.onday_report_data.value;
            if( item.value_type == 'number' && !( /^\d+$/.test(val) ) ){
                item.onday_report_data.value = null;
            }
            if( item.value_type == 'time' ){
                val = event.target.value;
                if(!( /\d{1,2}[:|,|.]\d{1,2}/.test(val) )){
                    item.onday_report_data.value = "0";
                    event.target.value = "0:0";
                    window.s_alert('time pattern should be 00:00 or 00:0 or 0:0','warning')
                }
            }
            this.update_cell(item,event,day_index,parent_index, child_index);
        },10),

        convert_to_bn: function(value){
            // console.log(value);
            let temp_text = ``;
            if(value){
                [...value.toString()].forEach(j=>{
                    let bn_nums = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
                    // console.log(typeof +j);
                    if(typeof +j == 'number' && ( +j >= 0 && +j < 10) ){
                        temp_text += bn_nums[+j];
                    }
                    if(j == '.'){
                        temp_text += '.';
                    }
                    if(j == ':'){
                        temp_text += ':';
                    }
                });

                if(temp_text){
                    return temp_text;
                }else{
                    return 0;
                }
            }
        },

        secondsToHms: function(secs) {
            var hours = Math.floor(secs / (60 * 60));

            var divisor_for_minutes = secs % (60 * 60);
            var minutes = Math.floor(divisor_for_minutes / 60);

            var divisor_for_seconds = divisor_for_minutes % 60;
            var seconds = Math.ceil(divisor_for_seconds);

            return `${hours}:${minutes}`;
        },

        calc_width: function (){
            var that = this;
            setTimeout(() => {
                $('.remove_cell').parents('.cell_heading_body').remove();
                $('.remove_cell').parents('.report_data_cell_parent').remove();
                var date_width = $(`.date_width_1`).outerWidth();
                $(`.date_width_1`).css('width',date_width);
                $(`.date_width_2`).css('width',date_width);

                that.get_report_details?.report_column?.forEach(element => {
                    element.childrens.forEach(element2 => {
                        var width = $($(`.${element2.en_name+element2.id}_width_1`)[0]).outerWidth();
                        if(width){
                            width <= 50 ? width = 50 : width = width;
                            // console.log(`${element2.en_name+element2.id}_width_1: ${width}`);
                            $(`.${element2.en_name+element2.id}_width_1`).css('width', width);
                            $(`.${element2.en_name+element2.id}_width_2`).css('width', width);
                        }
                    });

                    var width = $($(`.${element.en_name+element.id}_width_1`)[0]).outerWidth(); //7
                    if(width){
                        $(`.${element.en_name+element.id}_width_1`).css('width', width);
                        $(`.${element.en_name+element.id}_width_2`).css('width', width);
                    }
                });

                $('.report_data_cell_parent input').off().on('focus', function(){
                    $('.report_data_cell_parent').removeClass('input_loading');
                    $(this).parents('.report_data_cell_parent').addClass('input_loading');
                })
            }, 400);
        },

    },
    computed: {
        ...mapGetters([
            'get_report_details',
            'get_auth_information',
            'get_report_loaded',
            'get_report_first_time_loaded',
            'get_check_auth',
        ]),
    }
}
</script>

<style>

</style>
