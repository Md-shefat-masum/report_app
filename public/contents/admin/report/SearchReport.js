import React from 'react'

export default function SearchReport(props) {
    let years_option = [];
    let now = new Date();
    let year = now.getFullYear();
    for (let index = year; index > props.year-3; index--) {
        years_option.push(<option key={index} value={index}> {index}</option>);
    }
    // console.log(years_option);
    return (
        <div>
            <form onSubmit={props.reportOnSearchHandler} name="report_search_form" className="report_search_form">
                <select name="search_month" id="search_month">
                    <option value="01"> January</option>
                    <option value="02"> February</option>
                    <option value="03"> March</option>
                    <option value="04"> April</option>
                    <option value="05"> May</option>
                    <option value="06"> June</option>
                    <option value="07"> July</option>
                    <option value="08"> August</option>
                    <option value="09"> September</option>
                    <option value="10"> October</option>
                    <option value="11"> November</option>
                    <option value="12"> December</option>
                </select>
                <select name="search_year" id="search_year">
                    {years_option}
                </select>
                <button type="submit"><i className="fa fa-sign-in"></i></button>
            </form>
        </div>
    )
}
