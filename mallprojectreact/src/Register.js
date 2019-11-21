import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DB from "./db.js";
import Auth from "./auth";
import { Redirect } from "react-router-dom";

export default class Register extends React.Component {
    state = {
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Role: null,
        Name: null,
        Phone: null,
        isRegistered: false,
        isLoggedIn: false,
        Roles:null
    }
    async componentDidMount() {
        let R = await DB.Roles.findAll();
        let Roles = R.filter(Role => Role.Name == 'Customer' || Role.Name == 'Renter');
        console.log(Roles);
        this.setState({Roles});
    }

    handleRole = (event) => {
        console.log(event.target.value)
        this.setState({Role: event.target.value})
    }

    handleEmail = (event) => {
        console.log(event.target.value)
        this.setState({Email: event.target.value})
    }
    handleName = (event) => {
        console.log(event.target.value)
        this.setState({Name: event.target.value})
    }
    handlePhone = (event) => {
        console.log(event.target.value)
        this.setState({Phone: event.target.value})
    }

    handlePassword = (event) => {
        console.log(event.target.value)
        this.setState({Password: event.target.value})
    }

    handleConfirmPassword = (event) => {
        console.log(event.target.value)
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
          this.registerLogin();
    }

    registerLogin = async () => {
        
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
            if(!await DB.Users.create({
                Name: this.state.Name,
                Phone: this.state.Phone,
                RoleID: this.state.Role

            })){
                console.log('Customer creation failed')
            }
            this.setState({ isLoggedIn: true });
        }
    }

    render(){
        return this.state.isRegistered ? <Redirect to = "/"/>  :  this.state.isRegistered && this.state.Role === 6?  <Redirect to = "/"/> : (
                
            <div>
                {this.state.Roles? 
                <React.Fragment>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter your Name" onChange={this.handleName}/>
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="Phone" placeholder="Enter your Phone" onChange={this.handlePhone}/>
            </Form.Group>

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
            
            {this.state.Roles.map((role,index) => (

                <li><Form.Check
                inline
                type="radio"
                name="role"
                onChange={this.handleRole}
                value={role.Id}
              ></Form.Check>
              <label>
                {role.Name} 
              </label></li>
            ))}

            <Button variant="primary" onClick={this.handleRegisterDB}>
                Register
            </Button></React.Fragment>
                 : <h1>Loading</h1> }
                
            </div>
        );
    }
}    