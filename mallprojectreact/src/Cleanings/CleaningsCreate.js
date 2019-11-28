import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";

export default class CleaningsCreate extends React.Component {
  state = {
    RentingId: null,
    isCreated: false,
    Rentings: []
  };
  async componentDidMount() {
    const json = await DB.Users.findByQuery("getRenting");
    this.setState({ Rentings: json });
  }

  async handleCreateDB() {
    if (
      await DB.Cleanings.create({
        RentingId: this.state.RentingId,
        Status: "NotTakened"
      })
    ) {
      this.setState({ isCreated: true });
    }
  }
  handleRentingId = event => {
    console.log(event.target.value)
    this.setState({ RentingId: event.target.value });
  };

  render() {
    return this.state.isCreated ? (
      <Redirect to="/profile/" />
    ) : (
      <div>
        <h2>Create Cleaning Request</h2>
        <label>Rentering Id: </label>
          
           <select onChange={this.handleRentingId}>
           <option>select Renting ID</option>
           {this.state.Rentings.map(item => ( <option>{item.Id}</option>
                   ))} </select>
          
          <br></br>
        
        <Button onClick={() => this.handleCreateDB()}>Send Request</Button>
      </div>
    );
  }
}
