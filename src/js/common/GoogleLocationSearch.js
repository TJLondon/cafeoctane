import React from 'react';
import axios from 'axios';
require('es6-promise').polyfill();

export default class GoogleLocationSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            place: '',
            collection: null,
            coordinates: null,
            collectionShow: false,
            distance: "1000",
            currentLocation: '',
            currentCoordinates: {}
        };
    }
    componentDidMount() {
        let _ico = React.createElement("img", {
            className: 'current-loc-ico',
            src: "https://www.materialui.co/materialIcons/maps/my_location_black_192x192.png",
        });
        let _current = React.createElement("li",
            {className: 'style-list', onClick: () => this.getCurrentLocation(),},
            _ico, "Current Location");
        this.setState({currentLocation: _current});
    }

    getCurrentLocation = () => {
        this.setState({loading:true});
        navigator.geolocation.getCurrentPosition((location) => {
            let coords = location.coords;
            axios.get('/api/location/geo/reverse?lng=' + coords.longitude + '&lat=' + coords.latitude)
                .then(res => {
                    this.setState({
                        place: res.data[0].formatted_address,
                        collection: null,
                        collectionShow: false,
                        loading: false,
                        coords: coords}, () => {
                        if (this.props.onChange) {
                            let returnData =
                                {
                                    coords: res.data[0].geometry.location,
                                    place: res.data[0].formatted_address
                                }

                            ;
                            this.props.onChange(returnData)
                        }
                    })
                })
                .catch(error => {
                    console.log(error);
                });
        })
    };

    handleSelect = (details) => {
        this.setState({place: details.description, collection: '', collectionShow: false}, () => {
            axios.get('/api/location/geo?address=' + details.description)
                .then(res => {
                    this.setState({coordinates: res.data[0].geometry.location}, () => {
                        if (this.props.onChange) {
                            let returnData =
                                {
                                    coords: res.data[0].geometry.location,
                                    place: details.description
                                };
                            this.props.onChange(returnData)
                        }
                    })

                })
                .catch(error => {
                    console.log(error);
                })
        });
    };

    handleChange = (event) => {
        let child = [];
        this.setState({place: event});
        axios.get('/api/location/autocomplete?input='+event)
            .then(res => {
                for (let loc = 0; loc < res.data.length; loc++) {
                    child.push(React.createElement("li",
                        { key: loc, className: 'style-list', onClick: () => this.handleSelect(res.data[loc]), },
                        res.data[loc].description));
                }

                let collection = React.createElement("ul", { className: 'style-unordered-list' },
                    this.state.currentLocation, child
                );
                this.setState({
                    collection: collection,
                    collectionShow: true
                })
            })
    };

    render() {
        return (
            <div className="googleSearchWrap">
                {/*{this.state.loading ? <img className={'loader'} src={'/assets/img/loader.gif'} /> : null}*/}
                {
                    React.createElement("input", {
                        type: "text",
                        className: 'location-box',
                        onChange: (e) => this.handleChange(e.target.value),
                        placeholder: 'Enter Location...',
                        value: this.state.place
                    })
                }

                {this.state.collectionShow ?
                    React.createElement("div", {className: "google-covert"},
                    this.state.collection
                ): null}

            </div>
        )
    }
}