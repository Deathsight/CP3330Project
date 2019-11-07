import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect } from "react-router-dom";

export default class Register extends React.Component {
    state = {
        Email: "",
        Password: "",
        ConfirmPassword: "",
        isRegistered: false
    }

    handleEmail = (event) => {
        this.setState({Email: event.target.value})
    }

    handlePassword = (event) => {
        this.setState({Password: event.target.value})
    }

    handleConfirmPassword = (event) => {
        this.setState({ConfirmPassword: event.target.value})
    }

    handleRegisterDB = async () => {
        console.log('Supposed to create',this.state.Email)
        console.log('Supposed to create',this.state.Password)
        console.log('Supposed to create',this.state.ConfirmPassword)

        const response = await fetch(`/api/Account/Register`,{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: this.state.Email,
                Password: this.state.Password,
                ConfirmPassword: this.state.ConfirmPassword,
            })
        })
        if(response.ok){
            console.log('Successfully')
            this.setState({ isRegistered: true });
          }
    }

    render(){
        return this.state.isRegistered ?(
            <Redirect to = "/login/"/>
            ) : (
            <div>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.handlePassword}/>
                </Form.Group>
                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" onChange={this.handleConfirmPassword}/>
                </Form.Group>
                <Button variant="primary" onClick={this.handleRegisterDB}>
                    Register
                </Button>
            </div>
        );
    }
}    