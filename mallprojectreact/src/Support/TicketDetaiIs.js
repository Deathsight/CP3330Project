import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class TicketDetails extends React.Component {
  state = {
    Ticket: null,
    Comment: "",
    Role: ""
  };

  async componentDidMount() {
    const json = await DB.SupportTickets.findOne(this.props.match.params.id);
    this.setState({ Ticket: json });
    const json2 = await DB.Users.findByQuery("getRole");
    this.setState({ Role: json2 });
  }

  async handleCreateDB() {
    if (
      await DB.STicketChats.create({
        STicketId: this.state.Ticket.Id,
        DateTime: new Date,
        Comment: this.state.Comment
      })
    ) { 
      console.log("comment has been added!");
      window.location.reload();
    }
  }

  handleComment = event => {
    this.setState({ Comment: event.target.value });
  };

  handleDate = (item) => {
    const datetime = new Date(item)
    return `${datetime.toDateString()} - ${datetime.toLocaleTimeString()}`
  }

  render() {
    return this.state.Ticket ? (
      <div>
        {console.log(this.state.Ticket)}
        <h2>Ticket Details</h2>
        <tbody>
          {this.state.Ticket.User ? (
          <tr>
            <th>Agent Name:</th>
            <td>{this.state.Ticket.User.Name}</td>
          </tr>
          ): null }
          <tr>
            <th>Ticket Type:</th>
            <td>{this.state.Ticket.STicketType.Name}</td>
          </tr>

          <tr>
            <th>Status:</th>
            <td>{this.state.Ticket.Status}</td>
          </tr>
          {this.state.Ticket.Status === "open" ?(
            <div>
              {this.state.Role === "SupportAgent" ?(
                <tr><td><Link to={`/support/edit/${this.state.Ticket.Id}`}>Transfer Ticket</Link></td></tr>
              ) : null}
              <tr><td><Link to={`/support/close/${this.state.Ticket.Id}`}>Close Ticket</Link></td></tr>
            </div>
          ):null}
        </tbody>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Sender</th>
              <th>Date/Time</th>
              <th>Comment</th>
            </tr>
          </tbody>
          <tbody>
            {this.state.Ticket.STicketChats.map(item =>
                <tr key={item.Id}>
                {item.UserEmail === Auth.username() ? (
                  <td>You</td>) : item.User.Role.Name === "SupportAgent" ?(
                  <td>Support Agent</td>):(<td>Customer</td>
                  )}
                  <td>{this.handleDate(item.DateTime)}</td>
                  <td>{item.Comment}</td>
                </tr>
            )}
          </tbody>
        </Table>
        {this.state.Ticket.Status === "open"?(
          <div>
            <label>Write a comment: </label>
            <input type="text" onChange={this.handleComment}></input>
            <br></br>
            <Button onClick={() => this.handleCreateDB()}>Send</Button>
          </div>
        ):null}
      </div>
    ):(
      <h2>Loading...</h2>
    )
  }
}
