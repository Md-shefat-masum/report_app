<template>
    <div class="report_cells d-flex flex-wrap mt-1">
        <div class="cell_heading date_width_1">
            <span>
                মোট : 
            </span>
        </div>
        <div v-for="heading in report_columns" :key="heading.id"
            :class="`cell_heading ${heading.en_name+heading.id}_width_1 total_group`" :data-parent_class="`${heading.en_name + heading.id}_width_1`">
            <!-- <span>{{ heading.bn_name }}</span> -->
            <div v-if="heading.childrens.length" class="d-flex justify-content-center">
                <div v-for="child in heading.childrens"
                    :key="child.id"
                    :class="`cell_heading_body`">
                    <div :class="`${child.en_name+child.id}_width_1 ${child.visibility==0?'remove_cell':''} cell_sub_heading_total cell_sub_heading`" :data-parent_class="`${child.en_name + child.id}_width_1`">
                        <span v-if="child.value_type == 'time'">
                            {{ convert_to_bn(secondsToHms(report_column_values_total[child.id])) }}
                        </span>
                        <span v-else>
                            {{ convert_to_bn(report_column_values_total[child.id]) }}
                        </span>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="cell_heading_body justify-content-center">
                    <div class="cell_sub_heading_total cell_sub_heading" :data-parent_class="`${heading.en_name + heading.id}_width_1`">
                        <span v-if="heading.value_type == 'time'">
                            {{ convert_to_bn(secondsToHms(report_column_values_total[heading.id])) }}
                        </span>
                        <span v-else>
                            {{ convert_to_bn(report_column_values_total[heading.id]) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import convert_to_bn from '../helpers/convert_to_bn';
import secondsToHms from '../helpers/secondsToHms'
export default {
    methods: {
        convert_to_bn,
        secondsToHms,
    },
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
