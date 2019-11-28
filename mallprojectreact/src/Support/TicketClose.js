import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Redirect,Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class TicketClose extends React.Component {
  state = {
    Ticket: null,
    Feedback: "",
    isClosed: false,
    Role: ""
  };

  async componentDidMount() {
    const json = await DB.SupportTickets.findOne(this.props.match.params.id);
    this.setState({ Ticket: json });
    const json2 = await DB.Users.findByQuery("getRole");
    this.setState({ Role: json2 });
  }

  async handleCloseDB() {
    const response = await DB.SupportTickets.edit(this.props.match.params.id,
    {
      Id: this.state.Ticket.Id,     
      AgentEmail: this.state.Ticket.AgentEmail,
      UserEmail: this.state.Ticket.UserEmail,
      SubmitDate: this.state.Ticket.SubmitDate,
      ClosedDate: new Date,
      Description: this.state.Ticket.Description,
      Status: "closed",
      STicketTypeId: this.state.Ticket.STicketTypeId,
      Feedback: this.state.Feedback
    });

    if (response) {
      this.setState({ isClosed: true });
    }
  }

  handleFeedback = event => {
    this.setState({ Feedback: event.target.value });
  };

  render() {
    return this.state.isClosed ? (
        <Redirect to="/profile" />
      ) : this.state.Ticket ? (
        <div>
            {this.state.Role !== "SupportAgent" ?(
                <div>
                    <label>Write Feedback: </label>
                    <input type="text" onChange={this.handleFeedback}></input>
                </div>
            ):null}
          <Button onClick={() => this.handleCloseDB()}>Close Ticket</Button>
        </div>
    ):(
      <h2>Loading...</h2>
    )
  }
}
