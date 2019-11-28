import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router-dom";
import Auth from "../auth";

export default class SupportIndex extends React.Component {
  state = {
    Description: "",
    SelectedType: null,
    Types: [],
    isCreated: false
  };

  async componentDidMount() {
    const json = await DB.STicketTypes.findAll();
    console.log(json)
    this.setState({ Types: json });
  }

  async handleCreateDB() {
    if (
      await DB.SupportTickets.create({
        SubmitDate: new Date,
        Description: this.state.Description,
        Status: "open",
        STicketTypeId: this.state.SelectedType.Id
      })
    ) {
      this.setState({ isCreated: true });
    }
  }

  handleDescription = event => {
    this.setState({ Description: event.target.value });
  };
  handleSelectedType = item => {
    this.setState({ SelectedType: item });
  };

  render() {
    return Auth.isLoggedIn() ?(
    this.state.isCreated ? (
      <Redirect to="/profile/" />
    ) : (
      <div>
        <h2>Contact Us</h2>

        <Card>
          <Card.Header>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
              {this.state.SelectedType ?(this.state.SelectedType.Name) : ("Select Ticket Type")}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.state.Types.map(item => (
                  <Dropdown.Item onSelect={() => this.handleSelectedType(item)}>{item.Name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body>
            <Card.Title>Type Description:</Card.Title>
            <Card.Text>
            {this.state.SelectedType ? (this.state.SelectedType.Description ) : ""}
            </Card.Text>
          </Card.Body>
        </Card>
        <br></br>
        <label>Description: </label>
        <input type="text" onChange={this.handleDescription}></input>
        <br></br>
        <Button onClick={() => this.handleCreateDB()}>Send</Button>
      </div>
    )
    ):(
    <Redirect to="/login" />
    );
  }
}
