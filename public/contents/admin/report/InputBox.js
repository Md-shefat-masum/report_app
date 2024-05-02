import React, { Component } from 'react';

export default class InputBox extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            note : '',
        }
    }

    componentDidMount(){
        // console.log(this.props);
    }
    
    render() {
        let value = '';
        value = this.props.data.find((index)=>{return index.date === this.props.full_date});
        // console.log(this.props.data,this.props.full_date);
        // console.log(typeof value != "undefined" ? this.props.full_date:'');
        // console.log(typeof value != "undefined" ? typeof value.date:'');
        let input_field = '';
        let clickHandler = ()=>{};
        let windowWidth = window.innerWidth;
        if(typeof windowWidth !== 'undefined' && windowWidth < 768){
            clickHandler = this.props.onActionClickHandler;
        }

        if(this.props.type === 'text'){
            // input field for text box
            if(this.props.url === 'report_add_reading_time' || this.props.url === 'report_add_dawati_kaj' || this.props.url === 'report_add_sangothonik_kaj'){
                let value_field = typeof value == "undefined"?'':value[this.props.index_name];
                if(value_field === '00:00' || value_field === '0:00'){
                    value_field = null;
                }
                input_field = <input
                            className={this.props.url+this.props.dateNumber} 
                            data-classname={this.props.url+this.props.dateNumber} 
                            data-datenumber={this.props.dateNumber}
                            onBlur={this.props.changeReportValue} 
                            onClick={clickHandler}
                            data-url={this.props.url} 
                            type='text'
                            defaultValue={value_field} 
                            data-dataid={typeof value == "undefined"?'':value.id}
                            data-full_date={this.props.full_date}
                            data-index={this.props.index_name}
                            placeholder="-" />;
            }else{
                let value_field = typeof value == "undefined"?'':value[this.props.index_name];
                if(value_field === 0){
                    value_field = null;
                }
                input_field = <input
                            className={this.props.url+this.props.dateNumber} 
                            data-classname={this.props.url+this.props.dateNumber} 
                            data-datenumber={this.props.dateNumber}
                            data-full_date={this.props.full_date}
                            onChange={this.props.changeReportValue} 
                            data-url={this.props.url} 
                            type={'number'} 
                            defaultValue={value_field} 
                            data-dataid={typeof value == "undefined"?'':value.id}
                            data-index={this.props.index_name}
                            pattern="^?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)$"
                            onClick={clickHandler}
                            min="0"
                            placeholder="-" />;
            }
            

        }else{
            // input field for check box
            if(typeof value != "undefined" && value[this.props.index_name] === 1){
                input_field = <input data-url={this.props.url} 
                                    defaultChecked 
                                    type={'checkbox'}
                                    // defaultValue={typeof value == "undefined"?'':value[this.props.index_name]} 
                                    data-datenumber={this.props.dateNumber}
                                    className={this.props.url+this.props.dateNumber} 
                                    data-classname={this.props.url+this.props.dateNumber} 
                                    onClick={this.props.onClickChangeReportValue}
                                    data-index={this.props.index_name} 
                                    data-dataid={typeof value == "undefined"?'':value.id} />;
            }else{
                input_field = <input data-url={this.props.url} 
                                    type={'checkbox'} 
                                    // defaultValue={typeof value == "undefined"?'':value[this.props.index_name]} 
                                    data-datenumber={this.props.dateNumber}
                                    className={this.props.url+this.props.dateNumber} 
                                    data-classname={this.props.url+this.props.dateNumber} 
                                    onClick={this.props.onClickChangeReportValue}
                                    data-index={this.props.index_name}
                                    data-dataid={typeof value == "undefined"?'':value.id}/>;
            }
        }
        return (
            <div className={this.props.class_name + ' input_box_parent ' + this.props.type+'_div'}>
                {input_field}
                {/* <div className="note_box_area"> */}
                    {/* <i className="fas fa-caret-down action_btn" title={'Note'} onClick={this.props.onActionClickHandler}></i> */}
                    {/* <i className="fas fa-caret-down action_btn" title={'Note'}></i> */}
                    {/* <textarea className="note_box" placeholder="additional note..."></textarea> */}
                {/* </div> */}
            </div>
        )
    }
}
