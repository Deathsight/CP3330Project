import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Paper,Tabs,Tab} from '@material-ui/core'
import DB from '../db'
import Auth from '../auth'



export default class Register extends React.Component {
    state = {
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Name: null,
        Phone: null,
        isRegistered: false,
        accountType: 1,
        role: "Customer"
    }
    useStyles = {
        '@global': {
          body: {
            backgroundColor: 'white'
          },
        },
        container:{
            position: "relative",
            marginTop: "100px",
            marginLeft:"5vw",
            paddingTop:"35px",
            paddingBottom: "25px",
            backgroundColor: "white",
            boxShadow:" 25px 25px 50px",
          },
          background:{
            zIndex: "2",
            position: "relative",
            backgroundImage:`url(https://w.wallhaven.cc/full/96/wallhaven-969w3d.jpg)`,
            minWidth: "100vw",
            minHeight: "94.4vh",
            float:"left"
          },
        paper: {
            width:"450px",
            position: "relative",
            marginTop: "100px",
            paddingTop:"35px",
            paddingRight:"30px",
            paddingLeft:"30px",
            paddingBottom: "25px",
            boxShadow:" 25px 25px 50px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: 1,
          backgroundColor: 'darkblue',
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: 3,
        },
        submit: {
          marginTop:4,
          marginRight:0,
          marginBottom:10
        },
      };
    handleName = (event) => {
        this.setState({Name: event.target.value})
    }
    handlePhone = (event) => {
        this.setState({Phone: event.target.value})
    }
    handleEmail = (event) => {
        this.setState({Email: event.target.value})
    }
    handleRole = (role) => {
        this.setState({role})
    }
    handlePassword = (event) => {
        this.setState({Password: event.target.value})
    }
    handleConfirmPassword = (event) => {
        this.setState({ConfirmPassword: event.target.value})
    }
    switchType = (event, switchedType) => {
      this.setState({accountType: switchedType})
    }
    handleRegisterDB = async () => {

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
  return (
      <div style={this.useStyles.background}>
    <Container component="main" >
      <CssBaseline />
      <Paper style={this.useStyles.paper}>      
      <Avatar style={this.useStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Tabs
          value={this.state.accountType}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.switchType}
          style={{paddingTop:10}}
          aria-label="disabled tabs example"
        >
          <Tab label="Business" onClick={()=> this.handleRole("Renter")}/>
          <Tab label="Consumer" onClick={()=> this.handleRole("Customer")}/>
        </Tabs>
        <div style={this.useStyles.form}>
          <Grid container spacing={2}>
          <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                name="name"
                onChange={this.handleName}
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                onChange={this.handlePhone}
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={this.handleEmail}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.handlePassword}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Confirmpassword"
                label="Confirm Password"
                type="password"
                id="Confirmpassword"
                onChange={this.handleConfirmPassword}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={this.useStyles.submit}
            onClick={this.handleRegisterDB}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Container>
    </div>
        );
    }
}