import React from 'react';
import './ReportBody.css';
import ReportCells from './ReportCells';
import $ from 'jquery';
import axios from 'axios';
import SearchReport from './SearchReport';
import ModalData from './ModalData';


export default class table extends  React.Component<{},any> {
    constructor(props){
        super(props);
        this.state ={
            cells : [],
            user_id: sessionStorage.getItem('user_id'),
            today_bn_date:'',
            time: '',
            day: '',
            month: '',
            year: '',
            tempKeys:[],
            keys: [],
            data: [],
            field_changed: 0,
            total_reading_time: 0,
            total_sangothonik_time: 0,
            total_dawati_time: 0,
            modal_data: '',
        }
    }

    componentDidMount(){
        this.renderAllCell();
        let date = new Date();
        this.setState({
            //get month leading zero
            month : `${date.getMonth() + 1}`.padStart(2, "0"),
            year : date.getFullYear(),
        },()=>{
            if(this.state.user_id > 0){
                this.initializeState();
            }
        });
    }

    initializeState=()=>{
        axios.get(process.env.REACT_APP_BASE_URL+`/report/month-wise-report?year=${this.state.year}&month=${this.state.month}&userid=${this.state.user_id}`)
        .then((response)=>{
            // console.log(response.data);
            this.setState({
                data: response.data.sura,
                keys: response.data.keys,
                today_bn_date: response.data.today_bn_date,
                cells: [],
            },function() {
                this.setTotalAmount();
                this.renderAllCell();
            })
        })
    }

    setTotalAmount=()=>{
        let temp = [...this.state.data];
        let temp_keys = this.state.keys;
        temp.map((item,key)=>{
            for (const keys in item) {
                if (item.hasOwnProperty(keys)) {
                    const element = item[keys];
                    if(element != null && typeof element != 'string'){
                        temp_keys[keys] += item[keys];
                        // if(keys === 'dawati_kaj'){
                        //     console.log(`keys ${keys} ${temp_keys[keys]}`);
                        // }
                    }
                }
            }
            return temp_keys;
        });

        this.setState({
            keys:temp_keys,
            total_reading_time : parseInt(temp_keys.hour + (+temp_keys.minute>0?+temp_keys.minute/60:0)) +':'+ (+temp_keys.minute>0?+temp_keys.minute%60:0),
            total_dawati_time : parseInt(temp_keys.d_hour + (+temp_keys.d_minute>0?+temp_keys.d_minute/60:0)) +':'+ (+temp_keys.d_minute>0?+temp_keys.d_minute%60:0),
            total_sangothonik_time : parseInt(temp_keys.s_hour + (+temp_keys.s_minute>0?+temp_keys.s_minute/60:0)) +':'+ (+temp_keys.s_minute>0?+temp_keys.s_minute%60:0),
        },()=>{
            // console.log(this.state.keys);
        });
    }

    resetTotalAmount=()=>{
        let temp_keys = this.state.keys;
        for(const item in temp_keys){
            temp_keys[item] = 0;
        }
        this.setState({
            keys:temp_keys
        },()=>{
            this.setTotalAmount();
        });
    }

    onActionClickHandler=(e)=>{
        // console.log(e);
        let full_date = e.target.dataset.full_date;
        let class_name = e.target.dataset.classname;
        let user_id = this.state.user_id;
        let data = [...this.state.data];
        let today_data = [];
        $('#exampleModal input').val('');
        $('#exampleModal .report_modal_title').html( (this.convertBangla(new Date(full_date).getDate())) + ' ' + ($('.report_bn_date').html()));
        this.setState({
            modal_data: ''
        });

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const element = data[key];

                if(element.date === full_date && element.user_id === +user_id){
                    today_data=element;
                    today_data['newspaper_check'] = false;
                    today_data['exercise_check'] = false;
                    today_data['self_analysis_check'] = false;
                    if(today_data['exercise'] === 1){
                        today_data['exercise_check'] = true
                    }
                    if(today_data['newspaper'] === 1){
                        today_data['newspaper_check'] = true
                    }
                    if(today_data['self_analysis'] === 1){
                        today_data['self_analysis_check'] = true
                    }
                }
            }
        }

        // let now = new Date();
        let month = this.state.month;
        let year = this.state.year;
        let dateNumber = new Date(full_date).getDate();

        let cells = <ModalData
                        changeReportValue={this.onChangeReportInputValue.bind(this)}
                        onClickChangeReportValue={this.onClickChangeReportValue.bind(this)}
                        onActionClickHandler={this.onActionClickHandler.bind(this)}
                        dateNumber={dateNumber}
                        data={today_data}
                        full_date={full_date}
                        year={year}
                        month={month}>
                    </ModalData>;

        // console.log(today_data);
        setTimeout(() => {
            this.setState({
                modal_data: cells
            },()=>{
                // console.log(this.state.modal_data);
                $('#exampleModal').show();
                $('#exampleModal').addClass('show');
                $('#exampleModal .'+class_name).focus();
            })
        }, 500);

        // console.log(today_data, data);

    }

    modalHide=()=>{
        $('#exampleModal').hide();
    }

    debounce=(fn, delay)=>{
        var timer = null;
        return function () {
            var context = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    };

    // funtion for textbox
    onChangeReportInputValue=this.debounce((event)=>{
        event.persist();
        let value = event.target.value;
        let user_id = this.state.user_id;
        let url = event.target.dataset.url;
        let date = parseInt(event.target.dataset.datenumber);
        let month = this.state.month;
        let year = this.state.year;
        let input = document.querySelector('.'+event.target.dataset.classname);
        let hour = 0, minute = '';
        input.classList.add('input_loading');

        // console.log(value,url);

        if(url === 'report_add_reading_time' || url === 'report_add_dawati_kaj' || url === 'report_add_sangothonik_kaj' ){
            let time = value.toString();
            let separate;
            if(time.includes('.')){
                separate = time.split('.');
                hour = separate[0] = !isNaN(parseInt(separate[0]))?parseInt(separate[0]):0;
                separate[1] = !isNaN(parseInt(separate[1]))?parseInt(separate[1]):0;
                minute = separate[1]<10?('0'+separate[1]):separate[1];

                // value = (separate[0]<10 && separate[0]>0?'0'+separate[0]:separate[0])+':'+(separate[1]<10 && separate[1]>0?separate[1]+'0':separate[1]);
                value = separate[0]+':'+(separate[1]<10?('0'+separate[1]):separate[1]);
                $(input).val(value);

                // console.log(`separate ${separate}  hour: ${hour}  minute: ${minute}`);

            }
            if(time.includes(':')){
                separate = time.split(':');
                hour = separate[0] = !isNaN(parseInt(separate[0]))?parseInt(separate[0]):0;
                separate[1] = !isNaN(parseInt(separate[1]))?parseInt(separate[1]):0;
                minute = separate[1]<10?('0'+separate[1]):separate[1];

                // value = (separate[0]<10 && separate[0]>0?'0'+separate[0]:separate[0])+':'+(separate[1]<10 && separate[1]>0?separate[1]+'0':separate[1]);
                value = separate[0]+':'+(separate[1]<10?('0'+separate[1]):separate[1]);
                $(input).val(value);
            }
            if(time.includes(',')){
                separate = time.split(',');
                hour = separate[0] = !isNaN(parseInt(separate[0]))?parseInt(separate[0]):0;
                separate[1] = !isNaN(parseInt(separate[1]))?parseInt(separate[1]):0;
                minute = separate[1]<10?('0'+separate[1]):separate[1];

                // value = (separate[0] && separate[0]>0<10?'0'+separate[0]:separate[0])+':'+(separate[1]<10 && separate[1]>0?separate[1]+'0':separate[1]);
                value = separate[0]+':'+(separate[1]<10?('0'+separate[1]):separate[1]);
                $(input).val(value);
            }
            if(value.length > 0 && value.length <= 2){
                hour = value;
                value = value+':00';
                $(input).val(value);
            }
            if(value.length === 0 || value === ''){
                value = '00:00';
                $(input).val(value);
            }
        }else{
            value = parseFloat(event.target.value);
            if(value <= 0 || value == null || isNaN(value) ){
                value = 0;
            }
        }


        if(value !== null && typeof value === 'number'){

            // save state
            let id = event.target.dataset.dataid;
            let index = event.target.dataset.index;
            let tempdata = [...this.state.data];
            let position = tempdata.findIndex((item)=>item.id === parseInt(id));

            // console.log(id,index,tempdata,position);

            if(position < 0 ){
                console.log('new row block');
                // save to server
                let href = process.env.REACT_APP_BASE_URL+`/report/${url}/${value}/${user_id}/${date}/${month}/${year}`;
                axios.get(href)
                    .then((response)=>{
                        // console.log(response.data);
                        input.classList.remove('input_loading');
                        this.initializeState();
                    })
                    .then(()=>{
                        this.resetTotalAmount();
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
            }

            if(position >= 0){

                // save to server
                let href = process.env.REACT_APP_BASE_URL+`/report/${url}/${value}/${user_id}/${date}/${month}/${year}`;

                axios.get(href)
                    .then((response)=>{
                        // console.log(response.data);
                        $(input)[0].value = value;
                        input.classList.remove('input_loading');
                    })
                    .catch((err)=>{
                        console.log(err);
                    });

                if(value === 0){
                    value = null;
                }
                tempdata[position][index] = value;

                this.setState({
                    data:tempdata,
                },()=>{
                    this.resetTotalAmount();
                });
            }
        }

        if(value != null && typeof value === 'string'){

            // save state
            let id = event.target.dataset.dataid;
            let index = event.target.dataset.index;
            let tempdata = [...this.state.data];
            let position = tempdata.findIndex((item)=>item.id === parseInt(id));

            // console.log(value,url,position);
            // console.log("value : "+value, hour, minute);

            if(position < 0 ){
                console.log('new row block');
                // save to server
                let href = process.env.REACT_APP_BASE_URL+`/report/${url}/${value}/${user_id}/${date}/${month}/${year}?hour=${hour}&minute=${minute}`;
                axios.get(href)
                    .then((response)=>{
                        // console.log(response.data);
                        input.classList.remove('input_loading');
                        this.initializeState();
                    })
                    .then(()=>{
                        this.resetTotalAmount();
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
            }

            if(position >= 0){
                // update live total state
                tempdata[position][index] = value;
                if(url === 'report_add_reading_time' ){
                    tempdata[position]['hour'] = hour;
                    tempdata[position]['minute'] = +minute;
                }
                if(url === 'report_add_dawati_kaj'){
                    tempdata[position]['d_hour'] = hour;
                    tempdata[position]['d_minute'] = +minute;
                }
                if(url === 'report_add_sangothonik_kaj'){
                    tempdata[position]['s_hour'] = hour;
                    tempdata[position]['s_minute'] = +minute;
                }

                // save to server
                let href = process.env.REACT_APP_BASE_URL+`/report/${url}/${value}/${user_id}/${date}/${month}/${year}?hour=${hour}&minute=${minute}`;
                axios.get(href)
                    .then((response)=>{
                        // console.log(response.data);
                        input.classList.remove('input_loading');
                    })
                    .catch((err)=>{
                        console.log(err);
                    });

                this.setState({
                    data:tempdata,
                },()=>{
                    this.resetTotalAmount();
                });
            }
        }
    },500);

    // function for checkbox
    onClickChangeReportValue=(event)=>{
        event.persist();
        let value = event.target.value;
        let user_id = this.state.user_id;
        let url = event.target.dataset.url;
        let date = parseInt(event.target.dataset.datenumber);
        let month = this.state.month;
        let year = this.state.year;

        // save state
        let id = event.target.dataset.dataid;
        let index = event.target.dataset.index;

        let tempdata = [...this.state.data];
        let position = tempdata.findIndex((item)=>item.id === parseInt(id));

        if(tempdata[position][index] === 1){
            tempdata[position][index] = 0
        }else{
            tempdata[position][index] = 1
        }
        // console.log(id,index,position,tempdata[position],tempdata[position][index]);

        this.setState({
            data:tempdata,
        },()=>{
            this.resetTotalAmount();
        });

        let input = document.querySelector('.'+event.target.dataset.classname);
        input.classList.add('input_loading');

        let href = process.env.REACT_APP_BASE_URL+`/report/${url}/${value}/${user_id}/${date}/${month}/${year}`;
        axios.get(href)
            .then((response)=>{
                console.log(response.data);
                input.classList.remove('input_loading');
                if(response.data.value === 1){
                    $(input)[0].checked = true;
                    console.log('checked');

                }else{
                    $(input)[0].checked = false
                }
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    // search function
    reportOnSearchHandler=(e)=>{
        e.preventDefault();
        let year = $('#search_year').val();
        let month = $('#search_month').val();
        console.log(year,month);
        axios.get(process.env.REACT_APP_BASE_URL+`/report/month-wise-report?year=${year}&month=${month}`)
            .then((response)=>{
                // console.log();
                $('.input_box_parent input').addClass('input_loading');
                this.setState({
                    data: response.data.sura,
                    keys: response.data.keys,
                    today_bn_date: response.data.today_bn_date,
                    month : response.data.month,
                    year : response.data.year,
                },function() {
                    this.initializeState();
                    this.setTotalAmount();
                })
            })
    }

    // render cells
    renderAllCell=()=>{
        let tempCell = [...this.state.cells];
        let days = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র','শনি'];
        let dates = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

        // let now = new Date();
        let month = this.state.month;
        let year = this.state.year;
        let dateNumber = 1;
        for (let index = 0; index < new Date(year, month, 0).getDate(); index++) {
            let day = new Date( year, month-1, index+1).getDay();
            let num = (index+1)<10?'0'+(index+1).toString():(index+1).toString();
            let bangla_date = num.replace(num[0],dates[parseInt(num[0])]) ;
            bangla_date = bangla_date.replace(bangla_date[1],dates[parseInt(bangla_date[1])]) ;

            let report_date = year+'-'+month+'-'+(index+1<10?'0'+(index+1):index+1);
            // console.log(report_date,index);

            tempCell.push(<ReportCells
                            changeReportValue={this.onChangeReportInputValue.bind(this)}
                            onClickChangeReportValue={this.onClickChangeReportValue.bind(this)}
                            onActionClickHandler={this.onActionClickHandler.bind(this)}
                            key={index}
                            dateNumber={dateNumber++}
                            data={this.state.data}
                            full_date={report_date}
                            date={bangla_date}
                            date_no={index+1}
                            day_name={days[day]}
                            year={year}
                            day_no={day}
                            month={month}>
                        </ReportCells>);
            this.setState({
                cells : tempCell
            });
        }
    }

    // convert to bangla
    convertBangla=(v)=>{
        let bnNumbers = ['০','১','২','৩','৪','৫','৬','৭','৮','৯','.',':'];
        let enNumbers = ['0','1','2','3','4','5','6','7','8','9','.',':'];
        let value = v;
        let string = '';
        // console.log(v);

        if(value > 0){
            value = String(v);
            for (let index = 0; index < value.length; index++) {
                const enumber = value[index];
                for (let ban = 0; ban < bnNumbers.length; ban++) {
                    const bnumber = bnNumbers[ban];
                    const ennum = enNumbers[ban];
                    if(enumber === ennum){
                        string += bnumber;
                    }
                }
                // console.log(value[index] , string);
            }
        }
        if(typeof v === 'string'){
            for (let index = 0; index < value.length; index++) {
                const enumber = value[index];
                for (let ban = 0; ban < bnNumbers.length; ban++) {
                    const bnumber = bnNumbers[ban];
                    const ennum = enNumbers[ban];
                    if(enumber === ennum){
                        string += bnumber;
                    }
                }
                // console.log(value[index] , string);
            }
        }

        return string;
    }


    render() {
        // let tempCell = [];
        // let days = ['শনি','রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র'];
        // let dates = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

        // let now = new Date();
        // let month = this.state.month;
        // let year = this.state.year;
        // let dateNumber = 1;
        // for (let index = 0; index < new Date(now.getFullYear(), now.getMonth()+1, 0).getDate(); index++) {
        //     let day = new Date(now.getFullYear(), now.getMonth()+1, index).getDay();
        //     let num = (index+1)<10?'0'+(index+1).toString():(index+1).toString();
        //     let bangla_date = num.replace(num[0],dates[parseInt(num[0])]) ;
        //     bangla_date = bangla_date.replace(bangla_date[1],dates[parseInt(bangla_date[1])]) ;

        //     let report_date = year+'-'+month+'-'+(index+1);

        //     // console.log(num,bangla_date);
        //     tempCell.push(<ReportCells
        //                     changeReportValue={this.onChangeReportInputValue.bind(this)}
        //                     onClickChangeReportValue={this.onClickChangeReportValue.bind(this)}
        //                     onActionClickHandler={this.onActionClickHandler.bind(this)}
        //                     key={index}
        //                     dateNumber={dateNumber++}
        //                     data={this.state.data}
        //                     full_date={report_date}
        //                     date={bangla_date}
        //                     date_no={index+1}
        //                     day_name={days[day]}
        //                     year={year}
        //                     day_no={day}
        //                     month={month}>
        //                 </ReportCells>);
        //     // this.setState({
        //     //     cells : tempCell
        //     // });
        // }
        return (
            <div>
                <section>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body pb-0">
                                <div className="row">
                                    <div className="col-6">
                                        <i className="fa fa-calendar"></i>
                                        <span className="report_bn_date">{this.state.today_bn_date}</span>
                                    </div>
                                    <div className="col-6 d-flex justify-content-end align-items-center">
                                        <SearchReport reportOnSearchHandler={this.reportOnSearchHandler.bind(this)} year={this.state.year} month={this.state.month}></SearchReport>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body ">
                                <div className="table-report tableReportDiv position-relative">
                                    <div className="head head_h6_margin_control sticky-top bg-light mb-2 overflow-hidden" style={{overflow:'hidden'}}>
                                        <div className="d-flex" style={{borderLeft: '1px solid gray'}}>
                                        <h6 className="align-self-end w-100">তারিখ</h6>
                                        </div>
                                        <div>
                                            <h6>কুরআন অধ্যয়ন</h6>
                                            <div className="brr head_bottom_text_center">সূরা</div>
                                            <div className="brr head_bottom_text_center">আয়াত</div>
                                            <div className="brr head_bottom_text_center">দারস</div>
                                            <div className="head_bottom_text_center">মুখস্ত</div>
                                        </div>
                                        <div>
                                            <h6>হাদিস</h6>
                                            <div className="brr head_bottom_text_center">সংখ্যা</div>
                                            <div className="head_bottom_text_center">বিষয়</div>
                                        </div>
                                        <div>
                                            <h6>সাহিত্য অধ্যয়ন</h6>
                                            <div className="brr head_bottom_text_center">ইসলামী</div>
                                            <div className="head_bottom_text_center">অন্যান্য</div>
                                        </div>
                                        <div className="d-flex">
                                            <h6 className="align-self-end w-100">পাঠ্যপুস্তক <br></br>  অধ্যয়ন</h6>
                                        </div>
                                        {/* <div className="d-flex">
                                            <h6 className="align-self-end w-100">ক্লাসে উপস্থিতি</h6>
                                        </div> */}
                                        <div>
                                            <h6>ক্লাস</h6>
                                            <div className="brr head_bottom_text_center">সংখ্যা</div>
                                            <div className="head_bottom_text_center">উপস্থিতি</div>
                                        </div>
                                        <div>
                                            <h6>নামাজ</h6>
                                            <div className="brr head_bottom_text_center">জামাত</div>
                                            <div className="head_bottom_text_center">কাজা</div>
                                        </div>
                                        <div>
                                            <h6>যোগাযোগ</h6>
                                            <div className="brr head_bottom_text_center">সদস্য</div>
                                            <div className="brr head_bottom_text_center">সাথী</div>
                                            <div className="brr head_bottom_text_center">কর্মী</div>
                                            <div className="head_bottom_text_center">সমর্থক</div>
                                        </div>
                                        <div>
                                            <h6>যোগাযোগ</h6>
                                            <div className="brr head_bottom_text_center">বন্ধু</div>
                                            <div className="brr head_bottom_text_center">মেধাবী ছাত্র</div>
                                            <div className="brr head_bottom_text_center">শুভাকাংখী</div>
                                            <div className="head_bottom_text_center">মুহাররমা</div>
                                        </div>
                                        <div>
                                            <h6>বিতরণ</h6>
                                            <div className="brr head_bottom_text_center">সাহিত্য</div>
                                            <div className="brr head_bottom_text_center">ম্যাগাজিন</div>
                                            <div className="brr head_bottom_text_center">স্টিকার/কার্ড</div>
                                            <div className="head_bottom_text_center">উপহার</div>
                                        </div>
                                        <div>
                                            <h6>সাংগঠনিক দায়িত্ব পালন</h6>
                                            <div className="brr head_bottom_text_center">দাওয়াতী কাজ</div>
                                            <div className="head_bottom_text_center" style={{fontSize:'18px',lineHeight:'20px'}}>অন্যান্য সাংগঠনিক কাজ</div>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center"><h6 className="align-self-end w-100">পত্র পত্রিকা</h6></div>
                                        <div className="d-flex justify-content-center align-items-center"><h6 className="align-self-end w-100">শরীর চর্চা	</h6></div>
                                        <div className="d-flex justify-content-center align-items-center"><h6 className="align-self-end w-100">আত্ন সমালোচনা</h6></div>

                                        <div className="clearfix"></div>
                                    </div>

                                    {this.state.cells}
                                    {/* {tempCell} */}

                                    <section className="head body report_body bg-light" style={{position: 'sticky',bottom:'0',borderBottom: '1px solid gray',overflow:'hidden'}}>

                                        <div style={{borderLeft: '1px solid gray'}}>
                                            <h6> মোট :  </h6>
                                        </div>

                                        <div>
                                            <div className="brr"><h6> {this.convertBangla(this.state.keys.surah) } </h6></div>
                                            <div className="brr"><h6> {this.convertBangla(this.state.keys.ayat_amount) } </h6></div>
                                            <div className="brr"><h6> {this.convertBangla(this.state.keys.dars) } </h6></div>
                                            <div><h6>{this.convertBangla(this.state.keys.memories)} </h6></div>
                                        </div>

                                        <div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.hadith_amount)}</h6></div>
                                            <div><h6>{this.convertBangla(this.state.keys.hadith_sub)}</h6></div>
                                        </div>

                                        <div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.islami_sahitto)}</h6></div>
                                            <div><h6>{this.convertBangla(this.state.keys.other_sahitto)}</h6></div>
                                        </div>

                                        <div>
                                            {/* <h6>{ this.state.keys.reading_time > 0 ? this.convertBangla(Math.round(this.state.keys.reading_time *100)/100) : ''}</h6> */}
                                            <h6>{ this.convertBangla(this.state.total_reading_time) }</h6>
                                        </div>

                                        {/* <div><h6>{this.state.keys.memories}</h6></div> */}

                                        <div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.class_amount)}</h6></div>
                                            <div><h6>{this.convertBangla(this.state.keys.class_present)}</h6></div>
                                        </div>

                                        <div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.salat_jamat)}</h6></div>
                                            <div><h6>{this.convertBangla(this.state.keys.salat_kaja)}</h6></div>
                                        </div>

                                        <div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.member)}</h6></div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.associate)}</h6></div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.worker)}</h6></div>
                                            <div><h6>{this.convertBangla(this.state.keys.supporter)}</h6></div>
                                        </div>

                                        <div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.friend)}</h6></div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.merit_student)}</h6></div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.good_wishers)}</h6></div>
                                            <div><h6>{this.convertBangla(this.state.keys.muharramah)}</h6></div>
                                        </div>

                                        <div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.birtoron_sahitto)}</h6></div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.birtoron_magazine)}</h6></div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.keys.birtoron_sticker)}</h6></div>
                                            <div><h6>{this.convertBangla(this.state.keys.birtoron_upohar)}</h6></div>
                                        </div>
                                        <div>
                                            <div className="brr"><h6>{this.convertBangla(this.state.total_dawati_time)}</h6></div>
                                            <div><h6>{this.convertBangla(this.state.total_sangothonik_time)}</h6></div>
                                        </div>

                                        <div><h6>{this.convertBangla(this.state.keys.newspaper)}</h6></div>

                                        <div><h6>{this.convertBangla(this.state.keys.exercise)}</h6></div>

                                        <div><h6>{this.convertBangla(this.state.keys.self_analysis)}</h6></div>
                                    </section>

                                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h3 className="report_modal_title">date</h3>
                                                    <button type="button" className="close" onClick={this.modalHide.bind(this)} data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body report_body" style={{height:'84vh',overflow:'scroll'}}>
                                                    {this.state.modal_data}
                                                </div>
                                                <div className="modal-footer">
                                                    {/* <button type="button" onClick={this.modalHide.bind(this)} className="close btn btn-primary">Close</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
