<template>
    <div>
        <i class="fa fa-calendar"></i>
        <span class="report_bn_date">
            {{ selected_date_bangla.month }}
            {{ selected_date_bangla.year }}
        </span>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState({
            'selected_date': ({daily_report_module_client: d})=> d.selected_date,
            'selected_date_bangla': ({daily_report_module_client: d})=> d.selected_date_bangla,
        }),
    }
}
</script>

<style>

</style>
