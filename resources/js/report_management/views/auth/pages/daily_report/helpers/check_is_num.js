var _ = require('lodash');
export default _.debounce(function(item, event, day_index = null, parent_index = null, child_index = null){
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
},10);
