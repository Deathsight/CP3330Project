import React from "react";
import "./App.css";
import Auth from "./auth";
import Home from "./Home";
import Email from "./Email";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

//Account
import Register from "./Account/Register";
import Login from "./Account/Login";
import Logout from "./Logout";
import Profile from "./Profile";
import UserEdit from "./User/UserEdit";
import NProfile from "./Account/Profile";

//News 
import NewsPublic from "./News/NewsPublic";
import NewsIndex from "./News/NewsIndex";
import NewsCreate from "./News/NewsCreate";
import NewsEdit from "./News/NewsEdit";
import NewsDelete from "./News/NewsDelete";

//Cleaning
import CleaningsIndex from "./Cleanings/CleaningsIndex";
import CleaningsCreate from "./Cleanings/CleaningsCreate";
import CleaningsDelete from "./Cleanings/CleaningsDelete";
import CleaningsEdit from "./Cleanings/CleaningsEdit";
import CleaningsPublic from "./Cleanings/CleaningsPublic";
import CleaningsIndexPro from "./Cleanings/CleaningsIndexPro";

//Renting
import RentingIndex from "./Renting/RentingIndex";
import RentingCreate from "./Renting/RentingCreate";
import RenterCreate from "./User/RenterCreate";

//Support
import SupportIndex from "./Support/SupportIndex";
import TicketDetails from "./Support/TicketDetaiIs";
import TicketClose from "./Support/TicketClose";
import TicketEdit from "./Support/TicketEdit";
//Advertisment
import Advertisment from "./Advertisment/AdvertismentIndex"
import AdvertismentCreateUpload from "./Advertisment/AdvertismentCreateUpload"
import AdvertismentCreate from "./Advertisment/AdvertismentCreate"
import AdvertismentDelete from "./Advertisment/AdvertismentDelete"
import AdvertismentEdit from "./Advertisment/AdvertismentEdit"
//Renter
import RenterIndex from "./Support/TicketEdit";

//Parking
import ParkingIndex from "./Parking/ParkingIndex";
import ParkingEdit from "./Parking/ParkingEdit";
import Subscription from "./Subscription";
//react-router-dom
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//Material-UI
import {Menu,MenuItem,IconButton,Avatar} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";


export default class app extends React.Component {
  state = {
    isLoggedIn: false
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
                <MenuItem onClick={this.handleClose} >              
                  <Nav.Link as={Link} to="/support">
                    Contact Us
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
          <MenuItem onClick={this.handleClose} >              
                  <Nav.Link as={Link} to="/support">
                    Contact Us
                  </Nav.Link>
              </MenuItem>
          </React.Fragment>
          
             
              
              }
               </Menu>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            {/* Advertisment */} 
            <Route path="/advertisment/edit/:id" component={AdvertismentEdit} />
            <Route path="/advertisment/delete/:id" component={AdvertismentDelete} />
            <Route path="/advertisment/create/upload" component={AdvertismentCreateUpload} />
            <Route path="/advertisment/create/" component={AdvertismentCreate} />
            <Route path="/advertisment/" component={Advertisment} />
            {/* News */}
            <Route path="/news/create" component={NewsCreate} />
            <Route path="/news/delete/:id" component={NewsDelete} />
            <Route path="/news/edit/:id" component={NewsEdit} />
            <Route path="/news/public/" component={NewsPublic} />
            <Route path="/news/" component={NewsIndex} />
            {/* Cleaning */}
            <Route path="/cleanings/create" component={CleaningsCreate} />
            <Route path="/cleanings/delete/:id" component={CleaningsDelete} />
            <Route path="/cleanings/edit/:id" component={CleaningsEdit} />  
            <Route path="/cleanings/public/" component={CleaningsPublic} /> 
            <Route path="/cleaningsPro/" component={CleaningsIndexPro} />
            <Route path="/cleanings/" component={CleaningsIndex} />
            {/* Parking/Subscription */}
			      <Route path="/Parking/ParkingEdit/:id" component={ParkingEdit} />
            <Route path="/Parking/" component={ParkingIndex} />
            <Route path="/Subscription" exact component={Subscription} />
            {/* Support */}
            <Route path="/support/close/:id" component={TicketClose} />
            <Route path="/support/edit/:id" component={TicketEdit} />
            <Route path="/support/details/:id" component={TicketDetails} />
            <Route path="/support" component={SupportIndex} />
            {/* Profile */}
            <Route path="/profile/new" exact component={NProfile} />
            <Route path="/renting/create/:id" component={RentingCreate} />
            <Route path="/email/" component={Email} />
            <Route path="/renting/" component={RentingIndex} />
            <Route path="/" exact component={Home} />
            {/* Account */}
            <Route path="/profile/edit/" component={UserEdit} />
            <Route path="/profile/complete" component={RenterCreate} />
            <Route path="/login" component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/register" exact component={Register} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/New" exact component={NProfile} />
            {/* Renters */}
            <Route path="/stores" component={RenterIndex} />
            
          </Switch>
        </div>
      </Router>
    );
  }
}
