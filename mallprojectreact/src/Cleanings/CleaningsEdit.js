import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Auth from "../auth"
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

export default class CleaningsEdit extends React.Component {
  state = {
    RentingId: null,
    CleanerEmail: null,
    Status: "NotTaken",
    cleaningsId: null,
    isEdited: false
  };

  async componentDidMount() {
    const json = await DB.Cleanings.findOne(this.props.match.params.id)
    console.log(json)
    this.setState({ cleaningsId: json.Id, RentingId: json.RentingId,  CleanerEmail: Auth.username(), Status: json.Status });
  }


  async handleEditDB() {
    const response = await DB.Cleanings.edit(
     this.state.cleaningsId   
    ,{
      Id: this.state.cleaningsId,     
      RentingId: this.state.RentingId,
      CleanerEmail: this.state.CleanerEmail,
      Status: this.state.Status
    });

    if (response) {
      this.setState({ isEdited: true });
    }
  }
 
  handleStatus = event => {
    this.setState({ Status: event.target.value });
  };


  render() {
    return this.state.isEdited ? (
      <Redirect to="/cleanings" />
    ) : (
        this.state.cleaningsId ? 
        <div>
          <h2>Edit Cleanings request</h2>
          <br />

          <label>RentingId: </label>
          <input
            value={this.state.RentingId}
            type="text"
            disabled
          ></input>
          <br></br>

          <label>CleanerEmail: </label>
          <input
            value={this.state.CleanerEmail}
            type="text"
            disabled
          ></input>
          <br></br>

          <label>Status: </label>
          <select onChange={this.handleStatus}>
                                <option value="-1">Select</option>
                                <option value="NotTakened">Not Taken</option>
                                <option value="Inprocess">In Process</option>
                                <option value="Completed">Completed</option>
                   </select>
          <br></br>


          <Button onClick={() => this.handleEditDB()}>Save</Button>
        </div>
        :
        <h1>Loading...</h1>
      );
  }
}
