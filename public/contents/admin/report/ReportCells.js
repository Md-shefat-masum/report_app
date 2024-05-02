import React from 'react';
import InputBox from './InputBox';

export default function ReportCells(props) {
    // var d = new Date(dateString);
    // var dayName = days[d.getDay()];
    let cell_background = [];
    if(props.day_no === 5){
        cell_background = {background:'#ff000021'};
    }
    if(props.date_no === new Date().getDate()){
        cell_background = {background:'#00ffff1f'};
    }
    // console.log(props.data);
    return (
        <div style={{height:'36px'}}>
            <section 
                className="head body report_body" 
                id="table1" 
                data-userid="1" 
                data-date={props.date_no} 
                data-month={props.month} 
                data-year={props.year} 
                data-val=""
                style={cell_background}
            >

                <div style={{borderLeft:'1px solid gray'}}>
                    <h6 className="text-left p-1 pl-2">
                        {props.date}, {props.day_name}
                    </h6>
                </div>

                {/* quran */}
                <div>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'surah'} class_name={'brr'} url={'report_add_surah'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'ayat_amount'} class_name={'brr'} url={'report_add_ayat'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'dars'} class_name={'brr'} url={'report_add_dars'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'memories'} url={'report_add_memories'} ></InputBox>
                </div>

                {/* hadis */}
                <div>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'hadith_amount'} class_name={'brr'} url={'report_add_hadith_amount'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'hadith_sub'} url={'report_add_hadith_sub'} ></InputBox>
                    {/* <div className="brr"><input data-url="report_add_hadith_amount" defaultValue="5" type="text" placeholder="-" /></div>
                    <div><input type="text" data-url="report_add_hadith_sub" defaultValue="20" placeholder="-" /></div> */}
                </div>

                {/* sahittyo */}
                <div>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'islami_sahitto'} input_type={'time'} class_name={'brr'} url={'report_add_sahitto'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'other_sahitto'} url={'report_add_onnanno'} ></InputBox>
                    {/* <div className="brr"><input data-url="report_add_sahitto" defaultValue="63" type="text" placeholder="-" /></div>
                    <div><input data-url="report_add_onnanno" type="text" defaultValue="" placeholder="-" /></div> */}
                </div>
                
                {/* pattho pustok */}
                <div>
                {/* <InputBox onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} index_name={'hadith_sub'} class_name={'brr'} url={'report_add_surah'} ></InputBox> */}
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'reading_time'} url={'report_add_reading_time'} ></InputBox>
                    {/* <input type="text" data-url="report_add_reading_time" defaultValue="5.3" placeholder="-" /> */}
                </div>

                {/* class uposthiti */}
                <div>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'class_amount'} class_name={'brr'} url={'report_add_class_amount'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'class_present'} url={'report_add_class_present'} ></InputBox>
                    {/* <select data-url="report_add_class_present">
                        <option defaultValue="0"></option>
                        <option defaultValue="1">yes</option>
                        <option defaultValue="0">no</option>
                    </select> */}
                </div>
                
                {/* namaz */}
                <div>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'salat_jamat'} class_name={'brr'} url={'report_add_jamat'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'salat_kaja'} url={'report_add_kaja'} ></InputBox>
                    {/* <div className="brr"><input type="text" defaultValue="" data-url="report_add_jamat" placeholder="-" /></div>
                    <div><input type="text" data-url="report_add_kaja" defaultValue="" placeholder="-" /></div> */}
                </div>
                
                {/* zogazog */}
                <div>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'member'} class_name={'brr'} url={'report_add_member'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'associate'} class_name={'brr'} url={'report_add_associate'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'worker'} class_name={'brr'} url={'report_add_worker'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'supporter'} url={'report_add_supporter'} ></InputBox>

                    {/* <div className="brr"><input data-url="report_add_member" defaultValue="" type="text" placeholder="-" /></div>
                    <div className="brr"><input data-url="report_add_associate" defaultValue="" type="text" placeholder="-" /></div>
                    <div className="brr"><input data-url="report_add_worker" defaultValue="" type="text" placeholder="-" /></div> */}
                    {/* <div><input type="text" data-url="report_add_supporter" defaultValue="" placeholder="-" /></div> */}
                </div>
                
                {/* jogajog2 */}
                <div>  
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'friend'} class_name={'brr'} url={'report_add_friend'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'merit_student'} class_name={'brr'} url={'report_add_merit_student'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'good_wishers'} class_name={'brr'} url={'report_add_good_wishers'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'muharramah'} url={'report_add_muharramah'} ></InputBox>

                    {/* <div className="brr"><input data-url="report_add_friend" type="text" defaultValue="" placeholder="-" /></div>
                    <div className="brr"><input data-url="report_add_merit_student" type="text" defaultValue="" placeholder="-" /></div>
                    <div className="brr"><input data-url="report_add_book_distribution" type="text" defaultValue="" placeholder="-" /></div>
                    <div><input type="text" data-url="report_add_good_wishers" placeholder="-" defaultValue="" /></div> */}
                </div>

                
                {/* bitoron */}
                <div>  
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'birtoron_sahitto'} class_name={'brr'} url={'report_add_birtoron_sahitto'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'birtoron_magazine'} class_name={'brr'} url={'report_add_birtoron_magazine'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'birtoron_sticker'} class_name={'brr'} url={'report_add_birtoron_sticker'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'birtoron_upohar'} url={'report_add_birtoron_upohar'} ></InputBox>

                    {/* <div className="brr"><input data-url="report_add_friend" type="text" defaultValue="" placeholder="-" /></div>
                    <div className="brr"><input data-url="report_add_merit_student" type="text" defaultValue="" placeholder="-" /></div>
                    <div className="brr"><input data-url="report_add_book_distribution" type="text" defaultValue="" placeholder="-" /></div>
                    <div><input type="text" data-url="report_add_good_wishers" placeholder="-" defaultValue="" /></div> */}
                </div>

                <div>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'dawati_kaj'} class_name={'brr'} url={'report_add_dawati_kaj'} ></InputBox>
                    <InputBox changeReportValue={props.changeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'text'} index_name={'sangothonik_kaj'} url={'report_add_sangothonik_kaj'} ></InputBox>

                    {/* <div className="brr"><input data-url="report_add_dawati_kaj" type="text" placeholder="-" defaultValue="" /></div>
                    <div><input type="text" data-url="report_add_sangothonik_kaj" placeholder="-" defaultValue="" /></div> */}
                </div>

                <div>
                    <InputBox onClickChangeReportValue={props.onClickChangeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'checkbox'} index_name={'newspaper'} url={'report_add_newspaper'} ></InputBox>
                    {/* <select data-url="report_add_newspaper">
                        <option defaultValue="0"></option>
                        <option defaultValue="1">yes</option>
                        <option defaultValue="0">no</option>
                    </select> */}
                </div>

                <div>
                    <InputBox onClickChangeReportValue={props.onClickChangeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'checkbox'} index_name={'exercise'} url={'report_add_exercise'} ></InputBox>
                    {/* <select data-url="report_add_exercise">
                        <option defaultValue="0"></option>
                        <option defaultValue="1">yes</option>
                        <option defaultValue="0">no</option>
                    </select> */}
                </div>

                <div>
                    <InputBox onClickChangeReportValue={props.onClickChangeReportValue} dateNumber={props.dateNumber} onActionClickHandler={props.onActionClickHandler} full_date={props.full_date} data={props.data} type={'checkbox'} index_name={'self_analysis'} url={'report_add_self_analysis'} ></InputBox>
                    {/* <select data-url="report_add_self_analysis">
                        <option defaultValue="0"></option>
                        <option defaultValue="1">yes</option>
                        <option defaultValue="0">no</option>
                    </select> */}
                </div>
                <div className="clearfix" style={{clear:'both'}}></div>
            </section>
            <div className="clearfix" style={{clear:'both'}}></div>
        </div>
    )
}
