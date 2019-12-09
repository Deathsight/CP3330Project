import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Redirect } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Auth from "../auth";

export default class EventCreate extends React.Component {
  state = {
    renter: null,
    theater:null,
    isCreated: false,
    StartTime: null,
    StartDate:null,
    RentingId: null,
    AssetId: null,
    AssetRenting: null
  };

  async componentDidMount() {
    
    const theater = await DB.Theaters.findOne(this.props.match.params.id);
    const renter = await DB.Renters.findByQuery("getRenter");
    console.log(theater);
    const assetRent = await DB.AssetRentings.findAll();
    console.log(assetRent);
    
    const manyRentings = await DB.Rentings.findByQuery("many");

    console.log(manyRentings);

    const renting = manyRentings.filter( r => r.RenterEmail == renter.Email && r.Status != "expired");
    
    //const rentings  = await DB.Rentings.findOne(result.Id);

    console.log(renting);
    const StartDate = renting[0].StartDateTime.split("T")[0];
    const AssetRenting = assetRent.filter(a => a.AssetId == theater.AssetId && a.RentingId == renting[0].Id);


    console.log(theater);
    console.log(renter);
    console.log(renting[0].Id);
    
    this.setState({ RentingId: renting[0].Id});
    this.setState({ AssetId : this.props.match.params.id});
    this.setState({ StartDate });
    this.setState({ theater });
    this.setState({ renter });
    this.setState({ AssetRenting });

  }

  handleStartTime = (event) => {
    this.setState({ StartTime:event.target.value });
  };
  handleShowName = (event) => {
    this.setState({ ShowName:event.target.value });
  };
  handlePrice = (event) => {
    this.setState({ Price:event.target.value });
  };


  handleCreate = async () => {
    console.log(`${this.state.StartDate}T${this.state.StartTime}:00`);

    if (
      await DB.AssetRentingEvents.createEvent({
        StartTime: `${this.state.StartDate}T${this.state.StartTime}:00`,
        Price: this.state.Price,
        ShowName: `${this.state.ShowName}>${this.state.theater.AssetId}`,
      },this.state.RentingId,this.state.AssetId)
    ) {
      this.setState({ isCreated: true });
    }
  };


  

  render() {
    return this.state.isCreated ? (
      <Redirect to="/profile" />
    ) : (
      <div>
        <h2>Please Fill the Form Below</h2>
        {this.state.renter === null? <label>Renter: Loading Info!!!</label>:<label>Renter: {this.state.renter.Email}</label>}
        <br></br>
        <label>Show Name: </label>
        <input type="text" onChange={this.handleShowName}></input>
        <br />
        <label>Price: </label>
        <input type="float" onChange={this.handlePrice}></input>
        <br />
        <label>Start Time: </label>
        <input type="Time" onChange={this.handleStartTime}></input>
        <br />
        
      

        <Button onClick={this.handleCreate}>Create</Button>
      </div>
    );
  }
}
