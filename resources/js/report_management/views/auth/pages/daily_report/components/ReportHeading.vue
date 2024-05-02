<template>
    <div class="report_cells d-flex flex-wrap">
        <div class="cell_heading date_width_1">
            <span>
                তারিখ
            </span>
        </div>
        <div v-for="heading in report_columns" :key="heading.id"
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
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            'report_columns': ({daily_report_module_client: d})=> d.report_columns,
            'report_column_values_total': ({daily_report_module_client: d})=> d.report_column_values_total,
       }),
    }
}
</script>

<style>

</style>

