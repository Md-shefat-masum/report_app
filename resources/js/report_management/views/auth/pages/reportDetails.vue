<template>
    <div class="container-fluid">
        <div class="report_details plan_body mb-5" >
            <table class="table" style="font-family:bangla,Raleway">
                <thead class="h-100">
                    <tr>
                        <th colspan="14">
                            <div style="text-align: center; font-size: 16px;">Report Details</div>
                            <div class="text-uppercase" style="text-align: center;">Name: {{get_auth_information.first_name}} {{get_auth_information.last_name}}</div>
                            <div id="noprint" class="d-flex noprint justify-content-between search mt-3 no-print">
                                <ul class="d-flex flex-grow-1 justify-content-center">
                                    <li class="d-flex align-items-center"><span>From: </span> <input type="date" v-model="from_date" name="from_date" class="hasDatepicker form-control" value="" /></li>
                                    <li class="d-flex align-items-center"><span> To: </span> <input type="date" v-model="to_date" name="to_date" class="hasDatepicker form-control" value="" /></li>
                                    <li><button type="button" @click="get()" class="btn btn-success ms-3" id="search">Search</button></li>
                                </ul>
                                <button type="button" @click="print()" class="btn btn-warning">Print</button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding-left: 10px; padding-right: 10px;">
                            <table class="table table-bordered table-hover" border="2"
                                v-if="report.length && report[0].column_report">
                                <thead style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);position:sticky;">
                                    <tr>
                                        <td style="font-family:bangla;">তারিখ</td>
                                        <td v-for="(col, index) in report[0].column_report" :key="index" style="vertical-align: top;">
                                            <b style="font-family:bangla;">{{col.bn_name}}</b>
                                            <span v-if="col.childrens.length">
                                                <ul class="ps-3" style="list-style-type:square;">
                                                    <span v-for="(child,index) in col.childrens" :key="child.id">
                                                        <li v-if="child.visibility == 1 ">
                                                            {{child.bn_name}}
                                                        </li>
                                                    </span>
                                                </ul>
                                            </span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody class="report_white_space" style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">
                                    <tr v-for="(item, index) in report" :key="index" >
                                        <td>{{item.date.replaceAll('-','/')}}</td>
                                        <td class="text-center" v-for="(col, index) in item.column_report" :key="index" align="center">
                                            <span v-if="col.childrens.length">
                                                <span v-for="(child,index) in col.childrens" :key="child.id">
                                                    <span v-if="child.visibility == 1">
                                                        <span v-if="child.onday_report_data && child.onday_report_data.value">
                                                            {{convert_to_bn(child.onday_report_data.value)}}
                                                        </span>
                                                        <span v-else>
                                                            {{convert_to_bn(0)}}
                                                        </span>
                                                        {{index<(col.childrens.length-1) && col.childrens[index+1] && col.childrens[index+1].visibility == 1?'-':''}}
                                                    </span>
                                                </span>
                                            </span>
                                            <span v-else>
                                                <span v-if="col.onday_report_data && col.onday_report_data.value">
                                                    {{convert_to_bn(col.onday_report_data.value)}}
                                                </span>
                                                <span v-else>{{convert_to_bn(0)}}</span>
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="font-family:bangla;">মোট:</td>
                                        <td v-for="(col, index) in total" :key="index" style="vertical-align: top;">
                                            <span v-if="col.childrens.length">
                                                <span v-for="(child,index) in col.childrens" :key="child.id">
                                                    <span v-if="child.visibility == 1">
                                                        <div>
                                                            {{child.bn_name}}: {{convert_to_bn(child.onday_report_data_sum_value)}}
                                                        </div>
                                                        <!-- {{index<(col.childrens.length-1) && col.childrens[index+1] && col.childrens[index+1].visibility == 1?'-':''}} -->
                                                    </span>
                                                </span>
                                            </span>
                                            <span v-else>{{col.bn_name}}: {{convert_to_bn(col.onday_report_data_sum_value)}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data:function(){
        return {
            from_date: null,
            to_date: null,
            date: new Date().toISOString().substring(0, 10),
            report: [],
            total: [],
        }
    },
    created: function(){
        this.get();
    },
    watch: {
        get_auth_information: {
            handler: function(){
                this.get();
            }
        },
    },
    methods:{
        get: function(){
            axios.post('/report/get-date-to-date-report-details',{
                from_date: this.from_date,
                to_date: this.to_date,
                user_id: this.get_auth_information.id,
            })
            .then(res=>{
                console.log(res.data);
                this.report = res.data.date_report;
                this.total = res.data.get_report_column_total_sum;
            })
        },
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
                    return '';
                }
            }else if(value == 0){
                return '০';
            }else{

            }
        },
        print: function(){
            window.print();
        }
    },
    computed:{
        ...mapGetters([
            'get_auth_information'
        ])
    }
}
</script>

<style>

</style>
