export default function(value){
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
}
