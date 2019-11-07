import React from "react";
import "./App.css";
import Login from "./Login";
import Auth from "./auth";
import Logout from "./Logout";
import Register from "./Register";
import Profile from "./Profile";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import FormControl from "react-bootstrap/FormControl";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

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
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Skrrrrr Mall</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
                <Button type="submit">Search</Button>
                {Auth.isLoggedIn() ? (
                  <Nav>
                    <Nav.Link as={Link} to="/logout/">
                      Logout
                    </Nav.Link>
                  </Nav>
                ) : (
                  <div>
                    <Nav>
                      <Nav.Link as={Link} to="/register/">
                        Register
                      </Nav.Link>{" "}
                    </Nav>
                    <Nav>
                      <Nav.Link as={Link} to="/login/">
                        Login
                      </Nav.Link>
                    </Nav>
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
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
