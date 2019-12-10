import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
import { DropdownList } from 'react-widgets'
export default class ParkingEdit extends React.Component {
  state = {
    Parking: null,
    SubscriptionID: "",
    Floor: "",
    ParkingNumber: "",
    CarPlate: "",
    Status: "",
    isEdited: false,
    User: null
  };

  async componentDidMount() {
    const json = await DB.Parkings.findOne(this.props.match.params.id);
    const json2 = await DB.Subscriptions.findAll()
    let tempArr = []
    json2.map(item => 
        tempArr.push(item.Id)
      )
    this.setState({ User: tempArr});
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
          {this.state.User ?(
          <DropdownList style={{width: 250}} filter
          data={this.state.User}
          
          //onCreate={name => this.handleCreate(name)}
          //onChange={value => this.setState({ value })}
          // textField="name"
          value={this.state.value}
          
          onChange={value => this.setState({ value, SubscriptionID: value })}
        />
        ) : null}

          {/* <input
            type="text"
            onChange={this.handleSubscriptionID}
          ></input> */}
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
