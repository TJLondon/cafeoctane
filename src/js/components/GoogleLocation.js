import { GoogleComponent } from 'react-google-location'
import React, { Component } from 'react';

const API_KEY = 'AIzaSyCBQPdAc6XhD7cHv_HKopDeT1tMdJhAaCM';

class HomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: null,
            coordinates: null,
        };
    }

    onChange(e) {
        console.log(e);
    }

    render() {
        return (
            <div>
                <label>Events near</label>
                <GoogleComponent
                    apiKey={API_KEY}
                    language={'en'}
                    country={'country:in|country:uk'}
                    coordinates={true}
                    onChange={this.onChange.bind(this)} />
            </div>

        )
    }
}


export default HomeComponent;