<template>
    <form class="report_search_form">
        <input
            :value="selected_date.year_month"
            @change="change_date($event.target.value)"
            @click="$event.target.showPicker()"
            type="month"
            class="form-control" />
    </form>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    methods: {
        ...mapMutations([
            'change_date'
        ]),
    },
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
