import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

export default class ParkingEdit extends React.Component {
  state = {
    Parking: null,
    SubscriptionID: "",
    Floor: "",
    ParkingNumber: "",
    CarPlate: "",
    Status: "",
    isEdited: false
  };

  async componentDidMount() {
    const json = await DB.Parkings.findOne(this.props.match.params.id);
    this.setState({ Parking: json });
  }

  async handleEditDB() {
    console.log(this.state.SubscriptionID)
    console.log(this.state.CarPlate)
    const response = await DB.Parkings.edit(this.props.match.params.id,{
      id: this.props.match.params.id,
      SubscriptionID: this.state.SubscriptionID,
      Floor: this.state.Parking.Floor,
      ParkingNumber: this.state.Parking.ParkingNumber,
      CarPlate: this.state.CarPlate,
      Status: "Parked" });

    if (response) {
      this.setState({ isEdited: true });
    }
  }

  handleSubscriptionID = event => {
    this.setState({ SubscriptionID: event.target.value });
  };
  handleCarPlate = event => {
    this.setState({ CarPlate: event.target.value });
  };


  render() {
    return this.state.isEdited ? (
      <Redirect to="/Parking/ParkingIndex" />
    ) : (
      this.state.Parking ?
        <div>
          <h2>Edit Parking</h2>
          <br />

          <label>Subscriper </label>
          <input
            type="text"
            onChange={this.handleSubscriptionID}
          ></input>
          <br></br>

          <label>CArPlat: </label>
          <input
            type="text"
            onChange={this.handleCarPlate}
          ></input>
          <br></br>

          <label>Floor: </label>
          <input
            value={this.state.Parking.Floor}
            type="number"
            disabled
          ></input>
          <br></br>

          <label>Parking Number: </label>
          <input
            value={this.state.Parking.ParkingNumber}
            type="text"
            disabled
          ></input>
          <br></br>

          <label>Status: </label>
          <input
            value={this.state.Parking.Status}
            type="text"
            disabled
          ></input>
          <br></br>

          <Button onClick={() => this.handleEditDB()}>Save</Button>
        </div>
        : null
      );
  }
}
