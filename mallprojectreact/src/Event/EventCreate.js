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
    StartDate:null
  };

  async componentDidMount() {
    
    const theater = await DB.Theaters.findOne(this.props.match.params.id);
    const renter = await DB.Renters.findByQuery("getRenter");
    const rentings  = await DB.AssetRentings.findAll();
    const renting = rentings.filter( a => a.AssetId == this.props.match.params.id)[0];
    const StartDate = renting.Renting.StartDateTime.split("T")[0];

    console.log(theater);
    console.log(renter);
    
    this.setState({ StartDate });
    this.setState({ theater });
    this.setState({ renter });

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
      await DB.Events.create({
        StartTime: `${this.state.StartDate}T${this.state.StartTime}:00`,
        Price: this.state.Price,
        ShowName: this.state.ShowName,
      })
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
