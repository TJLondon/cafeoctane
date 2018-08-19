import Layout from '../common/layout/Layout';
import React from 'react';
import axios from "axios";

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: null,
            first_name: '',
            last_name: '',
            email: '',
            avatar: '',
            optinSuggested: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/auth/user')
            .then(res => {
                const data = res.data[0];
                if (data.email) {
                    this.setState({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        avatar: data.avatar,
                        optinSuggested: data.optinSuggested,
                        view: 'user'
                    })
                }
            })
            .catch(error => {
                this.setState({view: 'error'}, () => {
                    console.log(error);
                });
            });
    }

    handleChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            view: 'user'
        });
    }

    handleSubmit (event) {
        axios.post('/user/update', {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            optinSuggested: this.state.optinSuggested
        }).then(res => {
            this.setState({view: 'updated'})
            console.log(res)
        }).catch(error => {
            this.setState({view: 'error'}, () => {
             console.log(error);
            });
        });
        event.preventDefault();
    }


    Error() {
        return (
            <div className="box">
                <div className="errorPanel">
                    <i className="material-icons">build</i>
                    <p>uh oh. We're having some technical issues</p>
                    <p className="standard"><a href="#">Get in touch</a> and let us know</p>
                </div>
            </div>
        )
    }

    Updated() {
        return (
            <div className="success">
                <i className="material-icons">check</i>
                <p>Your details have been updated</p>
            </div>
        )
    }

    UserPanel() {
        return (
        <div className="box">
            <img width="100" src={this.state.avatar} />
            <h2>{this.state.first_name} {this.state.last_name}</h2>
            {this.state.view === 'updated' ? this.Updated() : null}
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>First name</label>
                    <input type="text" value={this.state.first_name} name="first_name" onChange={this.handleChange} />
                </div>

                <div>
                    <label>Last name</label>
                    <input type="text" value={this.state.last_name} name="last_name" onChange={this.handleChange} />
                </div>

                <div>
                    <label>Email address</label>
                    <input type="text" value={this.state.email} name="email" onChange={this.handleChange} />
                </div>

                <div>
                    <input type="checkbox" name="optinSuggested" checked={this.state.optinSuggested} onChange={this.handleChange} />
                    <label>Suggested events based on your location and search history. No more than weekly.</label>

                </div>

                <div>
                    <button>Save changes</button>
                </div>


            </form>

        </div>
        )
    }

    render() {
        return (
            <Layout>
                <div className="userprofile content">
                    <div className="container">
                        {this.state.view === 'error' ? this.Error() : null}
                        {this.state.view === 'user' || this.state.view === 'updated' ? this.UserPanel() : null}
                    </div>
                </div>
            </Layout>
        )
    }



}