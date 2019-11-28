import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import DB from "../db";
import Auth from "../auth";


export default class Login extends React.Component {

  state = {
    Email: "",
    Password: "",
    isLoggedIn: false
  }
  background={
    zIndex: "-1",
    position: "relative",
    backgroundImage:`url(https://wallpaperplay.com/walls/full/6/0/6/17357.jpg)`,
    width: "100%",
    minHeight: "94.4vh",
    float:"left"
  }
  paper= {
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
  }
  avatar= {
    margin: 1,
    backgroundColor: "darkblue"
  }
  form= {
    width: '100%', // Fix IE 11 issue.
    marginTop: 1
  }
  submit= {
    marginLeft:3,
    marginTop:10,
    marginRight:2,
    marginBottom:10
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
        if(!await DB.Users.create()){
            console.log('Customer creation failed')
        }
        this.setState({ isLoggedIn: true });
    }
  }
  render(){

    return(
      Auth.isLoggedIn() ? 
      <Redirect to="/profile" />
      :
      <div style={this.background}>
      <div style={this.pageHeader}>
        <Container component="main">
        <CssBaseline />
          <Paper style={this.paper}>
            
          <Avatar style={this.avatar} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <div style={this.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handlePassword}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={this.submit}
              onClick={this.handleLogin}
            >
              Sign In
            </Button>
            
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            </div>
        </Paper>
      </Container>
      </div>
      </div>
    )
  }
}
