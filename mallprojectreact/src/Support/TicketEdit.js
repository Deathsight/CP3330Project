import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Redirect,Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class TicketEdit extends React.Component {
  state = {
    Ticket: null,
    Email: null,
    Agents: null,
    isEdited: false
  };

  async componentDidMount() {
    const json = await DB.SupportTickets.findOne(this.props.match.params.id);
    this.setState({ Ticket: json });
    if(this.state.Ticket.AgentEmail){
      const json2 = await DB.Users.findByQuery("getAgents");
      this.setState({ Agents: json2 });
      console.log("this json"+json2)
    }
    console.log("this agents"+this.state.Agents)
  }

  async handleEditDB() {
    if (
      await DB.SupportTickets.editSupportTicket(this.props.match.params.id, this.state.Email)
    ) { 
      this.setState({ isEdited: true });
    }
  }

  handleEmail = event => {
    this.setState({ Email: event.target.value });
  };

  render() {
    return this.state.isEdited ? (
        <Redirect to="/profile" />
      ) : this.state.Ticket ? (
        !this.state.Ticket.AgentEmail ? (
        <div>
          {console.log(this.state.Ticket)}
          <h2>Ticket Details</h2>
          <tbody>
            <tr>
              <th>Customer Email:</th>
              <td>{this.state.Ticket.UserEmail}</td>
            </tr>

            <tr>
              <th>Ticket Type:</th>
              <td>{this.state.Ticket.STicketType.Name}</td>
            </tr>

            <tr>
              <th>Status:</th>
              <td>{this.state.Ticket.Status}</td>
            </tr>
            
            <Button onClick={() => this.handleEditDB()}>Take Ticket</Button>
            <Link to={`/profile`}>Back to Profile</Link>
          </tbody>
        </div>
       ) : this.state.Agents ? (
        <div>
          <h2>Ticket Details</h2>
          <tbody>
            <tr>
              <th>Customer Email:</th>
              <td>{this.state.Ticket.UserEmail}</td>
            </tr>

            <tr>
              <th>Ticket Type:</th>
              <td>{this.state.Ticket.STicketType.Name}</td>
            </tr>

            <tr>
              <th>Status:</th>
              <td>{this.state.Ticket.Status}</td>
            </tr>

            <tr>
              <th>Transfer To:</th>
              <select onChange={this.handleEmail}>
                {this.state.Agents.map(item => (
                  <option value={item.Email}>{item.Name}</option>
                ))}
              </select>
            </tr>
            
            <Button onClick={() => this.handleEditDB()}>Transfer Ticket</Button>
            <Link to={`/support/details/${this.state.Ticket.Id}`}>Back to Detials</Link>
          </tbody>
        </div>
       ):(<h2>Loading</h2>)
    ):(
      <h2>Loading...</h2>
    )
  }
}
