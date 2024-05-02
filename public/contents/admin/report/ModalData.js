import React, { Component } from 'react'

export default class ModalData extends Component {
    constructor(props) {
        super(props);
        this.state={

        };
    }
    // componentDidMount(){
    //     console.log(this.props);
    // }
    render() {
        return (
            <div>
                <div className="form-group">

                    <div className="row">
                        <div className="col-12">
                            <h6>কুরআন অধ্যয়ন</h6>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">সুরা</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_surah'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['surah']}
                                data-url={'report_add_surah'}  
                                data-dataid={this.props.data.id} 
                                data-index={'surah'} className={'report_add_surah'+this.props.dateNumber+" form-control mb-2"} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">আয়াত</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_ayat'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['ayat_amount']}
                                data-url={'report_add_ayat'}  
                                data-dataid={this.props.data.id} 
                                data-index={'ayat_amount'} className={'report_add_ayat'+this.props.dateNumber+" form-control mb-2"} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">দারস</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_dars'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['dars']}
                                data-url={'report_add_dars'}  
                                data-dataid={this.props.data.id} 
                                data-index={'dars'} className={'report_add_dars'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">মুখস্ত</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_memories'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['memories']}
                                data-url={'report_add_memories'}  
                                data-dataid={this.props.data.id} 
                                data-index={'memories'} className={'report_add_memories'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                    </div>
                    
                    <div className="row mt-3">
                        <div className="col-12">
                            <h6>হাদীস</h6>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">সংখ্যা</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_hadith_amount'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['hadith_amount']}
                                data-url={'report_add_hadith_amount'}  
                                data-dataid={this.props.data.id} 
                                data-index={'hadith_amount'} className={'report_add_hadith_amount'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">বিষয়</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_hadith_sub'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['hadith_sub']}
                                data-url={'report_add_hadith_sub'}  
                                data-dataid={this.props.data.id} 
                                data-index={'hadith_sub'} className={'report_add_hadith_sub'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12">
                            <h6>সাহিত্য অধ্যয়ন</h6>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">ইসলামী</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_sahitto'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['islami_sahitto']}
                                data-url={'report_add_sahitto'}  
                                data-dataid={this.props.data.id} 
                                data-index={'islami_sahitto'} className={'report_add_sahitto'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">অন্যান্য</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_onnanno'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['other_sahitto']}
                                data-url={'report_add_onnanno'}  
                                data-dataid={this.props.data.id} 
                                data-index={'other_sahitto'} className={'report_add_onnanno'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12">
                            <h6> পাঠ্যপুস্তক অধ্যয়ন </h6>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">সময়</label>
                            <input type="text"  placeholder="-" 
                                data-classname={'report_add_reading_time'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onBlur={this.props.changeReportValue}  
                                defaultValue={this.props.data['reading_time']}
                                data-url={'report_add_reading_time'}  
                                data-dataid={this.props.data.id} 
                                data-index={'reading_time'} className={'report_add_reading_time'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12">
                            <h6>ক্লাস</h6>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">সংখ্যা</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_class_amount'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['class_amount']}
                                data-url={'report_add_class_amount'}  
                                data-dataid={this.props.data.id} 
                                data-index={'class_amount'} className={'report_add_class_amount'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">উপস্থিতি</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_class_present'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['class_present']}
                                data-url={'report_add_class_present'}  
                                data-dataid={this.props.data.id} 
                                data-index={'class_present'} className={'report_add_class_present'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12">
                            <h6>নামাজ</h6>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">জামাত</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_jamat'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['salat_jamat']}
                                data-url={'report_add_jamat'}  
                                data-dataid={this.props.data.id} 
                                data-index={'salat_jamat'} className={'report_add_jamat'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">কাজা</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_kaja'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['salat_kaja']}
                                data-url={'report_add_kaja'}  
                                data-dataid={this.props.data.id} 
                                data-index={'salat_kaja'} className={'report_add_kaja'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12">
                            <h6>যোগাযোগ</h6>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">সদস্য</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_member'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['member']}
                                data-url={'report_add_member'}  
                                data-dataid={this.props.data.id} 
                                data-index={'member'} className={'report_add_member'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">সাথী</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_associate'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['associate']}
                                data-url={'report_add_associate'}  
                                data-dataid={this.props.data.id} 
                                data-index={'associate'} className={'report_add_associate'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">কর্মী</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_worker'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['worker']}
                                data-url={'report_add_worker'}  
                                data-dataid={this.props.data.id} 
                                data-index={'worker'} className={'report_add_worker'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">সমর্থক</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_supporter'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['supporter']}
                                data-url={'report_add_supporter'}  
                                data-dataid={this.props.data.id} 
                                data-index={'supporter'} className={'report_add_supporter'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12">
                            <h6>যোগাযোগ</h6>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">বন্ধু</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_friend'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['friend']}
                                data-url={'report_add_friend'}  
                                data-dataid={this.props.data.id} 
                                data-index={'friend'} className={'report_add_friend'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">মেধাবী ছাত্র</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_merit_student'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['merit_student']}
                                data-url={'report_add_merit_student'}  
                                data-dataid={this.props.data.id} 
                                data-index={'merit_student'} className={'report_add_merit_student'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">শুভাকাঙ্খী</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_good_wishers'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['good_wishers']}
                                data-url={'report_add_good_wishers'}  
                                data-dataid={this.props.data.id} 
                                data-index={'good_wishers'} className={'report_add_good_wishers'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">মুহাররামা</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_muharramah'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['muharramah']}
                                data-url={'report_add_muharramah'}  
                                data-dataid={this.props.data.id} 
                                data-index={'muharramah'} className={'report_add_muharramah'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12">
                            <h6>বিতরণ</h6>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">সাহিত্য</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_birtoron_sahitto'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['birtoron_sahitto']}
                                data-url={'report_add_birtoron_sahitto'}  
                                data-dataid={this.props.data.id} 
                                data-index={'birtoron_sahitto'} className={'report_add_birtoron_sahitto'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">ম্যাগাজিন</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_birtoron_magazine'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['birtoron_magazine']}
                                data-url={'report_add_birtoron_magazine'}  
                                data-dataid={this.props.data.id} 
                                data-index={'birtoron_magazine'} className={'report_add_birtoron_magazine'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">স্টিকার/কার্ড</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_birtoron_sticker'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['birtoron_sticker']}
                                data-url={'report_add_birtoron_sticker'}  
                                data-dataid={this.props.data.id} 
                                data-index={'birtoron_sticker'} className={'report_add_birtoron_sticker'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">উপহার</label>
                            <input type="number"  placeholder="-" 
                                data-classname={'report_add_birtoron_upohar'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onChange={this.props.changeReportValue}  
                                defaultValue={this.props.data['birtoron_upohar']}
                                data-url={'report_add_birtoron_upohar'}  
                                data-dataid={this.props.data.id} 
                                data-index={'birtoron_upohar'} className={'report_add_birtoron_upohar'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12">
                            <h6> সাংগঠনিক দায়িত্ব পালন </h6>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">দাওয়াতি কাজ</label>
                            <input type="text"  placeholder="-" 
                                data-classname={'report_add_dawati_kaj'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onBlur={this.props.changeReportValue}  
                                defaultValue={this.props.data['dawati_kaj']}
                                data-url={'report_add_dawati_kaj'}  
                                data-dataid={this.props.data.id} 
                                data-index={'dawati_kaj'} className={'report_add_dawati_kaj'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">অন্যান্য সাংগঠনিক কাজ</label>
                            <input type="text"  placeholder="-" 
                                data-classname={'report_add_sangothonik_kaj'+this.props.dateNumber}  
                                data-datenumber={this.props.dateNumber} 
                                data-full_date={this.props.full_date} 
                                onBlur={this.props.changeReportValue}  
                                defaultValue={this.props.data['sangothonik_kaj']}
                                data-url={'report_add_sangothonik_kaj'}  
                                data-dataid={this.props.data.id} 
                                data-index={'sangothonik_kaj'} className={'report_add_sangothonik_kaj'+this.props.dateNumber+" form-control mb-2"}/>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12">
                            <h6>অন্যান্য</h6>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="">পত্র পত্রিকা</label>
                                </div>
                                <div className="col-6">
                                    <input placeholder="-" 
                                        data-classname={'report_add_newspaper'+this.props.dateNumber}  
                                        data-datenumber={this.props.dateNumber} 
                                        data-full_date={this.props.full_date} 
                                        onClick={this.props.onClickChangeReportValue}  
                                        defaultValue={this.props.data['newspaper']}
                                        data-url={'report_add_newspaper'}
                                        type="checkbox"   
                                        defaultChecked={this.props.data['newspaper_check']}
                                        data-dataid={this.props.data.id} 
                                        data-index={'newspaper'} className={'report_add_newspaper'+this.props.dateNumber+" form-control mb-2"}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="row">
                                <div className="col-6"><label htmlFor="">শরীর চর্চা</label></div>
                                <div className="col-6">
                                    <input placeholder="-" 
                                        data-classname={'report_add_exercise'+this.props.dateNumber}  
                                        data-datenumber={this.props.dateNumber} 
                                        data-full_date={this.props.full_date} 
                                        onClick={this.props.onClickChangeReportValue}  
                                        defaultValue={this.props.data['exercise']}
                                        data-url={'report_add_exercise'}
                                        type="checkbox"
                                        defaultChecked={this.props.data['exercise_check']}  
                                        data-dataid={this.props.data.id} 
                                        data-index={'exercise'} className={'report_add_exercise'+this.props.dateNumber+" form-control mb-2"}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="">আত্ম সমালোচনা</label>
                                </div>
                                <div className="col-6 align-self-center">
                                    <input placeholder="-" 
                                        data-classname={'report_add_self_analysis'+this.props.dateNumber}  
                                        data-datenumber={this.props.dateNumber} 
                                        data-full_date={this.props.full_date} 
                                        onClick={this.props.onClickChangeReportValue}  
                                        defaultValue={this.props.data['self_analysis']}
                                        data-url={'report_add_self_analysis'}
                                        type="checkbox"  
                                        defaultChecked={this.props.data['self_analysis_check']}
                                        data-dataid={this.props.data.id} 
                                        data-index={'self_analysis'} className={'report_add_self_analysis'+this.props.dateNumber+" form-control mb-2"}/>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
