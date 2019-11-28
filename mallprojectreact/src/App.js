import React from "react";
import "./App.css";
import Login from "./Login";
import Auth from "./auth";
import Logout from "./Logout";
import Register from "./Register";

import NewsPublic from "./News/NewsPublic";
import NewsIndex from "./News/NewsIndex";
import NewsCreate from "./News/NewsCreate";
import NewsEdit from "./News/NewsEdit";
import NewsDelete from "./News/NewsDelete";

import CleaningsIndex from "./Cleanings/CleaningsIndex";
import CleaningsCreate from "./Cleanings/CleaningsCreate";
import CleaningsDelete from "./Cleanings/CleaningsDelete";
import CleaningsEdit from "./Cleanings/CleaningsEdit";
import CleaningsPublic from "./Cleanings/CleaningsPublic";
import CleaningsIndexPro from "./Cleanings/CleaningsIndexPro";

import Profile from "./Profile";
import Home from "./Home";
import Email from "./Email";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import UserEdit from "./User/UserEdit";
import RentingIndex from "./Renting/RentingIndex";
import RentingCreate from "./Renting/RentingCreate";
import SupportIndex from "./Support/SupportIndex";
import TicketDetails from "./Support/TicketDetaiIs";

import ParkingIndex from "./Parking/ParkingIndex";
import ParkingEdit from "./Parking/ParkingEdit";
import Subscription from "./Subscription";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import TicketClose from "./Support/TicketClose";
import TicketEdit from "./Support/TicketEdit";
import RenterCreate from "./User/RenterCreate";



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
  render() {
    return (
      <Router>
        <div>
          <Navbar bg="light" expand="lg" >
            <Navbar.Brand href="#home">Skrrrrr Mall</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav variant="tabs" defaultActiveKey="/">
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
                  <Nav.Link as={Link} to="/news/public">
                    News
                   </Nav.Link> {/* I add a news linke on the nave bar*/ }
                 </Nav.Item>
                {Auth.isLoggedIn() ? (
                  <React.Fragment>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/profile/">
                        Profile
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/advertisment/create/">
                        Advertise
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/logout/">
                        Logout
                      </Nav.Link>
                    </Nav.Item>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/register/">
                        Register
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link as={Link} to="/login/">
                        Login
                      </Nav.Link>
                    </Nav.Item>
                  </React.Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/profile/edit/" component={UserEdit} />
            <Route path="/profile/complete" component={RenterCreate} />

            <Route path="/news/create" component={NewsCreate} />
            <Route path="/news/delete/:id" component={NewsDelete} />
            <Route path="/news/edit/:id" component={NewsEdit} />
            <Route path="/news/public/" component={NewsPublic} />
            <Route path="/news/" component={NewsIndex} />

            <Route path="/cleanings/create" component={CleaningsCreate} />
            <Route path="/cleanings/delete/:id" component={CleaningsDelete} />
            <Route path="/cleanings/edit/:id" component={CleaningsEdit} />  
            <Route path="/cleanings/public/" component={CleaningsPublic} /> 
            <Route path="/cleaningsPro/" component={CleaningsIndexPro} />
            <Route path="/cleanings/" component={CleaningsIndex} />
			
			      <Route path="/Parking/ParkingEdit/:id" component={ParkingEdit} />

            <Route path="/support/close/:id" component={TicketClose} />
            <Route path="/support/edit/:id" component={TicketEdit} />
            <Route path="/support/details/:id" component={TicketDetails} />
            <Route path="/support" component={SupportIndex} />
            
            <Route path="/renting/create/:id" component={RentingCreate} />
            <Route path="/email/" component={Email} />
            <Route path="/renting/" component={RentingIndex} />
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/register" exact component={Register} />
            <Route path="/profile" exact component={Profile} />
			<Route path="/Subscription" exact component={Subscription} />
            <Route path="/Parking/" component={ParkingIndex} />
          </Switch>
        </div>
      </Router>
    );
  }
}
