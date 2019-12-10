import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Redirect } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Auth from "../auth";

export default class BookTicket extends React.Component {
  state = {
    isBooked: false,
    params: this.props.match.params.id.split(">"),
    show: null,
    seat: null,
    AssetRenting: null,
    Email: null
  };

  async componentDidMount() {
    const Email = await DB.Users.findByQuery("profile");
    const seat = await DB.Seats.findOne(this.props.match.params.id.split(">")[0]);
    console.log(seat);
    const show = await DB.Events.findMany((this.props.match.params.id.split(">")[1]+">"+this.props.match.params.id.split(">")[2]),"event");
    console.log(show);
    const AssetRenting = seat.Theater.Asset.AssetRentings[0];
    console.log(AssetRenting);
    
    this.setState({Email});
    this.setState({seat});
    this.setState({show});
    this.setState({AssetRenting});

  }


  handleCreate = async () => {
    console.log(`${this.state.show.StartDate}`);

    if (
      await DB.Emails.SendEmail({
        To: this.state.Email,
        Body: `Your Event ID is ${this.state.show.Id}, 
        The Show Name is ${this.state.params[1]}, 
        And The Total Price is ${this.state.show.Price}. 
        the Show will take Place on ${this.state.show.StartTime.split("T")[0]} 
        and at ${this.state.show.StartTime.split("T")[0]}. To go back to ypu profile and check all your bookings please use this link http:${"//localhost:3000/profile"}`,
        Subject: "Seat Booking Confirmation",
      }
    )
    )

    if (
      await DB.AssetRentingEvents.bookEvent({
        SeatId: this.state.seat.Id,
        Price: this.state.show.Price,
        Status: "complete",
        SubscriptionId: null
      },this.state.AssetRenting.Id,this.state.show.Id)
    ) {
      this.setState({ isBooked: true });
    }
  };


  

  render() {
    return this.state.isBooked? (
      <Redirect to="/profile" />
    ) : (
       this.state.show == null?
       "Loading...":
      <div>
        <h2>Confirm Booking</h2>
        
        <br></br>
        <label>Show Name: {this.state.params[1]}</label>
        
        <br />
        <label>Price: {this.state.show.Price}</label>
      
        <br />
        <label>Start Time: {(this.state.show.StartTime).split("T")[1]}</label>
     
        <br />

        <Button onClick={this.handleCreate}>confirm</Button>
      </div>
    );
  }
}
