import React, { Component } from 'react';
import { render } from 'react-dom';
import User from "./User";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            msg: '',
            data: {
                email: 'test@mail.com',
                password: 'test'
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        // State data from input
        var stateData = {
            email: this.state.email,
            password: this.state.password
        };

        // Static data
        var userData = {
            email: this.state.data.email,
            password: this.state.data.password
        }

        // Handle the request
        fetch('/', {
            method: 'POST',
            body: stateData
        }).then(res => {
            if (res.status >= 400) {
              throw new Error('Bad response from server');
            }
        }).catch(err => {
            console.log(err);
        })

        // Check if input data is matched with static data
        if (stateData.email === userData.email && stateData.password === userData.password) {
            render (
                <User />,
                document.getElementById('root')
            );
        } else {
            this.setState({
                msg: 'User not found!'
            });
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <form className="container m-4" onSubmit={this.handleSubmit}>
                <div className="form-group col-md-4">
                    <label htmlFor="email">Email:</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary m-3">Login</button>
                <div className="m-3 text-danger">{this.state.msg}</div>

            </form>
        );
    }
}

export default Form;
