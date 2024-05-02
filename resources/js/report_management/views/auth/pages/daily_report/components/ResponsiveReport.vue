<template>
    <div class="modal fade" id="reportSmModal" tabindex="-1" role="dialog" aria-labelledby="reportSmModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" id="report_content">
                <div class="modal-header">
                    <h5 class="modal-title" id="reportSmModalLabel">
                        ০৪, জানুয়ারি বৃহবার ২০২৪
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div v-for="(cell, cell_index) in report_columns" :key="cell_index" class="row my-2">
                            <div class="col-12 text-center" >
                                <h6>{{ cell.bn_name }}</h6>
                            </div>
                            <div class="col-12" v-if="cell.childrens.length" >
                                <div class="row justify-content-center">
                                    <div v-for="cell_child in cell.childrens" :key="cell_child.id" class="col-4 modal_cols mb-4">
                                        <label for="">{{ cell_child.bn_name }}</label>
                                        <report-cell
                                            :col_id="cell_child.id"
                                            :input_type="cell_child.value_type"
                                            :days="days"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-12" v-else >
                                <div class="row justify-content-center">
                                    <div class="col-4 modal_cols mb-4">
                                        <label v-if="cell.childrens.length"  for="">{{ cell.bn_name }}</label>
                                        <report-cell
                                            :col_id="cell.id"
                                            :input_type="cell.value_type"
                                            :days="days"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-12"><hr /></div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ReportCell from './ReportCell.vue';
export default {
    components: { ReportCell },
    computed: {
        ...mapState({
            'days': ({daily_report_module_client: d})=> d.selected_day,
            'report_columns': ({daily_report_module_client: d})=> d.report_columns,
            'report_column_values_total': ({daily_report_module_client: d})=> d.report_column_values_total,
       }),
    }
}
</script>
