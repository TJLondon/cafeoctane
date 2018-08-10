import axios from 'axios';
import React from 'react';
import Layout from '../layout/Layout';
import { GoogleComponent } from 'react-google-location';



export default class admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            events: Object,
            showList: true,
            showAdd: false,
            showEdit: false
        };
    }


    componentDidMount() {
        axios.get('/api/events')
            .then(res => {
                const events = res.data;
                this.setState({ events });
            });

    }


    ListEvents() {
        return (
            <div>
            <h2>Events</h2>

        {Object.keys(this.state.events).map(eventId =>
<div>
    {this.state.events[eventId]}
</div>
        )}
        </div>
        )
    }




    render() {
        return (
            <Layout>
                <div className="adminPanel">
                    <div className="content">
                        <h2>Admin</h2>
                        {this.ListEvents()}



                    </div>
                </div>
            </Layout>
        )
    }

}

