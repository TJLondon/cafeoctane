import axios from 'axios';
import Cookies from 'universal-cookie';
import Helpers from '../common/Helpers';
import Layout from '../common/layout/Layout';
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

const cookies = new Cookies();
const noop = () => {};
class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: Object,
            lat: null,
            lng: null,
            isMarkerShown: false,
            loading: true,
            error: false
        };

        this.handleEventSuccess = this.handleEventSuccess.bind(this);
        this.EventView = this.EventView.bind(this);
    }

    AddToHistory() {
        let History = cookies.get('history') || [];
        if (History.indexOf(this.state.event._id) === -1) {
            History.push(this.state.event._id);
            if (History.length >= 4) {History.shift()};
            cookies.set('history', History, {maxAge:7776000000, path: '/' });
        }
    }

    handleEventSuccess(event) {
        this.setState({
            event: event,
            lat: event.lat,
            lng: event.lng,
            loading: false,
            isMarkerShown: true }, () => {
            this.forceUpdate();
            this.AddToHistory();
        });
    }

    handleEventError(error) {
        this.setState({error})
    }

    componentDidMount() {
        axios.get(`/api/events/` + this.props.match.params.id)
            .then(res => this.handleEventSuccess(res.data))
            .catch(error => this.handleEventError(error))
    };

    componentWillUnmount() {
        this.handleEventSuccess = noop();
        this.handleEventError = noop();
    }

    static NotFound() {
        return (
        <div className="eventDetailsWrapper">
            <div className="content">
                <h2>Event not found</h2>
                <p>This event may have been removed or expired.</p>
                <p>Try <a href="/">searching</a> again</p>
            </div>
        </div>
        )
    }

    dateDisplayCalendar = (date) =>  {
            let dateArr = Helpers.transformDate(date);
            return (
                <div>
                    <span>{dateArr[0]}</span>
                    {dateArr[1]}
                </div>
            )
    };

    dateDisplayLong = (date) => {
        let dateArr = Helpers.transformDate(date);
        return (
            <span>{dateArr[3]} {dateArr[0]} {dateArr[1]} {dateArr[2]}</span>
        )
    };

    EventView = () => {
        if (this.state.loading === true) {
            return (
                <div className="loading">
                    <i className="material-icons loading">local_car_wash</i>
                </div>
            )
        }

        if (Object.keys(this.state.event).length > 0) {
            return (
                <div>
                    <div className="eventTitleWrapper">
                        <div className="container">
                            <div className="article-header">
                                <div className={'dateDisplay'}>
                                    {this.dateDisplayCalendar(this.state.event.eventStart)}
                                </div>
                                <div className="copy-wrap">
                                    <p>{this.dateDisplayLong(this.state.event.eventStart)} to {this.dateDisplayLong(this.state.event.eventEnd)}</p>
                                    <h2>{this.state.event.eventTitle}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="eventDetailsWrapper">
                            <div className="content">
                                <div dangerouslySetInnerHTML={{__html: this.state.event.eventSummary}}/>
                                <p>Organiser: {this.state.event.eventOrganiser}</p>

                                <p><strong>Price:</strong> {this.state.event.eventPrice}</p>
                            </div>

                            <div className="moreDetailsPane">
                                <p>Organised by <strong>{this.state.event.eventOrganiser}</strong></p>
                                <p>Location <strong>{this.state.event.eventAddress}</strong></p>

                                <a href={this.state.event.eventURL} target="_blank">Find out more</a>
                                <div className="googleMap">
                                    <MapComponent
                                        isMarkerShown={this.state.isMarkerShown}
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAq3Qk8Cni9iyrwM36azQCnXBWmL1sAm8s&v=3.exp"
                                        loadingElement={<div style={{height: `100%`}}/>}
                                        containerElement={<div style={{height: `300px`}}/>}
                                        mapElement={<div style={{height: `100%`}}/>}
                                        latitude={this.state.lat}
                                        longitude={this.state.lng}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
    };

    render() {
        return (
            <Layout>
                    <div className="content">
                        {this.state.event && !this.state.error ? this.EventView() : null}
                        {this.state.error ? this.NotFound() : null}
                    </div>
            </Layout>
        )
    }
}
export default EventDetails