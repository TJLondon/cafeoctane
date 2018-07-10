import React from 'react';
import LocationSearch from '../components/GoogleLocation';

class EventTypeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'Select an option'}
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        });
        console.log(e.target.value);
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

export default class Search extends React.Component {
    render() {
        return (
            <form>
            <EventTypeSelect />
                <LocationSearch />
            </form>
        )
    }
}