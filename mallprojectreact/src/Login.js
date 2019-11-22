import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Auth from './auth'
import DB from "./db.js";
import { Redirect } from "react-router-dom";
// import Table from 'react-bootstrap/Table';

export default class Login extends React.Component {
    state = {
        Email: "",
        Password: "",
        isLoggedIn: false
    }

    handleEmail = (event) => {
        this.setState({Email: event.target.value})
    }

    handlePassword = (event) => {
        this.setState({Password: event.target.value})
    }

    handleLogin = async () => {

        const response = await fetch(`/Token`,{
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=password&username=${this.state.Email}&password=${this.state.Password}`
        })
        const json = await response.json()
        console.log('json',json)

        console.log('response', response)
        if(response.ok){
            console.log('Logged in successfully')
            Auth.login(json.access_token, json.userName)
            
            this.setState({ isLoggedIn: true });
        }
    }

    render(){
        return this.state.isLoggedIn ? (
            <Redirect to = "/"/>
          ) : (
            <div>
                <Form.Group controlId="LoginEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail}/>
                </Form.Group>

                <Form.Group controlId="LoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.handlePassword}/>
                </Form.Group>
                <Button variant="primary" onClick={this.handleLogin}>
                    Login
                </Button>
            </div>
        );
    }
}    