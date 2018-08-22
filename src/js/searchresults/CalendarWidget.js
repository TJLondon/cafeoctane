
import React from 'react';


export default class CalendarWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            showDatePicker: false,
            datePickerStart: '',
            datePickerEnd: ''
        }
    }

    handleSelect = (date) => {
        this.setState({
            datePickerStart: date.startDate.locale('en-gb').format('L'),
            datePickerEnd:date.endDate.locale('en-gb').format('L') });
    };

    render() {
        return (
            <div>
            {/*<div className="inputWrap">*/}
                {/*{this.state.showDatePicker ?*/}
                    {/*<DateRange calendars={1} format={'default'} onInit={this.handleSelect} onChange={this.handleSelect}/> : null}*/}
                {/*<label>From</label>*/}
                {/*<input onClick={this.dateSelect} value={this.state.datePickerStart} type="text"  />*/}
            {/*</div>*/}

            {/*<div className = "inputWrap">*/}
            {/*< label > To < /label>*/}
        {/*<input onClick={this.dateSelect} value={this.state.datePickerEnd} type="text"  />*/}
        {/*</div>*/}
            </div>
    )
    }
}