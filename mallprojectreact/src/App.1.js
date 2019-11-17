import React from "react";
import "./App.css";
import Home from "./Home";
import Email from "./Email";

//Database and Authirzation
import Auth from "./auth";
import DB from "./db";
//Account
import Register from "./Account/Register";
import Login from "./Account/Login";
import Logout from "./Logout";
import UserEdit from "./User/UserEdit";
import Profile from "./Profile";
//Renting
import RentingIndex from "./Renting/RentingIndex";
import RentingCreate from "./Renting/RentingCreate";
import TheaterRentingCreate from "./Renting/TheaterRentingCreate";
//Advertisment
import AdvertismentCreate from "./Advertisment/AdvertismentCreate";
import AdvertismentIndex from "./Advertisment/AdvertismentIndex";
//News 
import NewsDelete from "./News/NewsDelete";
import NewsCreate from "./News/NewsCreate";
import NewsEdit from "./News/NewsEdit";
import NewsPublic from "./News/NewsPublic";
import NewsIndex from "./News/NewsIndex";
//Cleaning
  /*
import cleaningsDelete from "./Cleanings/CleaningsDelete";
import cleaningsEdit from "./Cleanings/CleaningsEdit";
import cleaningsCreate from "./Cleanings/CleaningsCreate";
import cleaningsIndex from "./Cleanings/CleaningsIndex";
  */
//Support
  //import SupportCreat from "./Support/SupportCreate";
  //import SupportIndex from "./Support/SupportIndex";
//Material-UI
import {Menu,MenuItem,IconButton,Avatar} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

export default class app extends React.Component {
  state = {
    isLoggedIn: false,
    LoggedInEmail:"helloman"
  };
  componentDidMount() {
    Auth.init(this.toggleState);
    this.setState({ isLoggedIn: Auth.isLoggedIn()});
  }

  toggleState = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  };
  
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
          <Navbar bg="dark" variant="dark" expand="lg" >
            <Navbar.Brand href="#home">Skrrrrr Mall</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto" defaultActiveKey="/">
                <Nav.Item>
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
                  <Nav.Link as={Link} to="/advertisment/">
                    Advertisment
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                   <Nav.Link as={Link} to="/news/public">
                    News
                   </Nav.Link> {/* I add a news linke on the nave bar*/ }
                 </Nav.Item>
              </Nav>
              <Nav inline>
              {Auth.isLoggedIn()
               ? 
               <React.Fragment>
                <div style={{paddingRight:25}}>
                 <Nav.Link as={Link} to="/profile/" color="primary">
                  {Auth.username()}
                 </Nav.Link>
                </div>
               <Avatar style={{paddingLeft:5, }} alt="Remy Sharp" src={`/profileImages/${Auth.username()}.png`} onClick={this.handleMenu} />
             </React.Fragment>
              :
                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                >
                <AccountCircle
                color="error"
                fontSize="large"
                 />
                </IconButton>
              }
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
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/profile/edit/" component={UserEdit} />

            <Route path="/advertisment/delete/:id" component={AdvertismentCreate} />
            <Route path="/advertisment/edit/:id" component={AdvertismentCreate} />
            <Route path="/advertisment/create" component={AdvertismentCreate} />
            <Route path="/advertisment/" component={AdvertismentIndex} />
{/*
            <Route path="/cleanings/delete/:id" component={cleaningsDelete} />
            <Route path="/cleanings/edit/:id" component={cleaningsEdit} />
            <Route path="/cleanings/create" component={cleaningsCreate} />
            <Route path="/cleanings/" component={cleaningsIndex} />
*/}
            <Route path="/news/create" component={NewsCreate} />
            <Route path="/news/delete/:id" component={NewsDelete} />
            <Route path="/news/edit/:id" component={NewsEdit} />
            <Route path="/news/public" component={NewsPublic} />
            <Route path="/news/" component={NewsIndex} />

            <Route path="/renting/create/:id" component={RentingCreate} />            
            <Route path="/renting/theaterRenting/:id" component={TheaterRentingCreate} />
            <Route path="/renting/" component={RentingIndex} />
{/*
            <Route path="/support/" component={SupportIndex} />
*/}
            <Route path="/email/" component={Email} />
            
            <Route path="/login" component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/register" exact component={Register} />
            <Route path="/profile" exact component={Profile} />

            <Route path="/" exact component={Home} />

          </Switch>
        </div>
      </Router>

    );
  }
}
