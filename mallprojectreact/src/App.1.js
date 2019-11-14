import React from "react";
import "./App.css";
import Auth from "./auth";
import Logout from "./Logout";
import NewsPublic from "./News/NewsPublic";
import NewsIndex from "./News/NewsIndex";
import NewsCreate from "./News/NewsCreate";
import Profile from "./Profile";
import Home from "./Home";
import Email from "./Email";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import UserEdit from "./User/UserEdit";
import RentingIndex from "./Renting/RentingIndex";
import RentingCreate from "./Renting/RentingCreate";
import AdvertismentCreate from "./Advertisment/AdvertismentCreate";
import AdvertismentIndex from "./Advertisment/AdvertismentIndex";
import Register from "./Account/Register"
import Login from "./Account/Login";
import {Menu,MenuItem,IconButton,Typography,Toolbar,AppBar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import { AccountCircle } from "@material-ui/icons";

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

export default class app extends React.Component {
  state = {
    isLoggedIn: false,
    anchorEl:null,
    open:false
  };
  componentDidMount() {
    Auth.init(this.toggleState);
    this.setState({ isLoggedIn: Auth.isLoggedIn() });
  }

  toggleState = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  };

  handleMenu = event => {
    this.setState({open:true});
    console.log(event.currentTarget)
  };

  handleClose = (url) => {
    this.setState({open: false});
  };
  
  render() {
    return (
      <Router>
        <div>
        <div style={{flexGrow:1}} >
          <AppBar position="static" color="default">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu" style={{marginRight:2}}>
                <MenuIcon />
              </IconButton>
              <div style={{flexGrow: 1}}>
              <Typography variant="h6" color="inherit" >
                Skrrrrrrrr Mall
              </Typography>
              <Nav.Item >
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/renting/">
                    Renting
                  </Nav.Link>
                 
                </Nav.Item>
                <Nav.Item>
                   <Nav.Link as={Link} to="/news/">
                    News
                   </Nav.Link> {/* I add a news linke on the nave bar*/ }
                 </Nav.Item>
                 </div>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={this.state.open}
                onClose={this.handleClose}
              >
              {Auth.isLoggedIn() ? 
              <React.Fragment>
              <MenuItem onClick={this.handleClose} >              
                  <Nav.Link as={Link} to="/profile/">
                            Profile
                  </Nav.Link>
              </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Nav.Link as={Link} to="/logout/">
                            Logout
                  </Nav.Link>
                </MenuItem>
                </React.Fragment>
          :
          <React.Fragment>
          <MenuItem onClick={this.handleClose} >              
          <Nav.Link as={Link} to="/login/">
                    Login
          </Nav.Link>
      </MenuItem>
        <MenuItem onClick={this.handleClose}>
          <Nav.Link as={Link} to="/register/">
                    Register
          </Nav.Link>
          </MenuItem>
          </React.Fragment>
          }
              </Menu>
            </div>
            </Toolbar>
          </AppBar>
        </div>
          <Switch>
            <Route path="/profile/edit/" component={UserEdit} />
            
            <Route path="/advertisment/create" component={AdvertismentCreate} />
            <Route path="/advertisment/" component={AdvertismentIndex} />
            <Route path="/news/create" component={NewsCreate} />
            <Route path="/news/index" component={NewsIndex} />
            <Route path="/news/" component={NewsPublic} />

            <Route path="/renting/create/:id" component={RentingCreate} />
            <Route path="/email/" component={Email} />
            <Route path="/renting/" component={RentingIndex} />
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/register" exact component={Register} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
        </div>
      </Router>

    );
  }
}
