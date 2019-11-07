import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './auth'
import { Redirect } from "react-router-dom";

export default class Logout extends React.Component {
    state = {}

    componentDidMount() {
        this.handleLogout()
      }

    handleLogout = () => {
        Auth.logout()
        
    }

    render(){
        return(
            <Redirect to = "/"/>
        )
    }
}    