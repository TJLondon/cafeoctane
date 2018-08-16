import axios from 'axios';
import Helpers from '../common/Helpers';
import React from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

const MapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) }}
    >
        {props.isMarkerShown && <Marker position={{ lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) }} />}
    </GoogleMap>
));

class EventDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        event: Object,
        lat: '51.507351',
        lng: '-0.127758',
        isMarkerShown: false
    };

    componentDidMount() {
        //fetch event
        axios.get(`/api/events/` + this.props.eventid)
            .then(res => {
                const event = res.data;
                this.setState({
                    event: event,
                    lat: event.lat,
                    lng: event.lng,
                    isMarkerShown: true });
            });
    }

    render() {
        return (
            <div>
                <div className="eventDetailsWrapper">
                    <div className="content">
                        <h2>{this.state.event.eventTitle}</h2>
                        <p>{Helpers.transformDate(this.state.event.eventStart)} to {Helpers.transformDate(this.state.event.eventEnd)}</p>

                        <div dangerouslySetInnerHTML={{ __html: this.state.event.eventSummary }} />
                        <p>Organiser: {this.state.event.eventOrganiser}</p>

                        <p><strong>Price:</strong> {this.state.event.eventPrice}</p>

                        <p>Id: {this.state.event._id}</p>
                    </div>

                    <div className="moreDetailsPane">
                        <p>Organised by <strong>{this.state.event.eventOrganiser}</strong></p>
                        <p>Location <strong>{this.state.event.eventAddress}</strong></p>
                        <a href={this.state.event.eventURL} target="_blank">Find out more</a>
                        <div className="googleMap">
                            <MapComponent
                                isMarkerShown={this.state.isMarkerShown}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAq3Qk8Cni9iyrwM36azQCnXBWmL1sAm8s&v=3.exp"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `300px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                latitude={this.state.lat}
                                longitude={this.state.lng}
                            />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default EventDetails