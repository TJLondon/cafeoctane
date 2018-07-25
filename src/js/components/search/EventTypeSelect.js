import React from "react";

class EventTypeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '1'}
    }

    onChange(val) {
        this.setState({ value: val.target.value });
        this.props.onTypeSelect(val.target.value);
    }

    render() {
        return (
            <div className="eventtypeselect">
                <label>I'm looking for</label>
                <select value={this.state.value} onChange={this.onChange.bind(this)}>
                    <option value={1}>All events</option>
                    <option value={2}>Car shows</option>
                    <option value={3}>Cars and coffee</option>
                    <option value={4}>Racing events</option>
                </select>
            </div>
        )
    }
}

export default EventTypeSelect;