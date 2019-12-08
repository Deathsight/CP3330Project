import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Redirect } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Auth from "../auth";

export default class TheaterRentingCreate extends React.Component {
  state = {
    renter: "",
    Security: null,
    securityCompanies: [],
    isCreated: false,
    theater: null,
    StartDate: null,
    TotalPrice: 0,
    duration: null,
    StartTime: null,
    EndTime:null
  };

  async componentDidMount() {
    let assetIds = this.props.match.params.id.split(",")
    assetIds = assetIds.map(item => parseInt(item))

    const theaters = await DB.Theaters.findAll();

    const SelectedTheaters = theaters.filter(function(item) {
      return assetIds.indexOf(item.AssetId) !== -1;
    });
    
    const renter = await DB.Renters.findByName(Auth.username());
    const securityCompanies = await DB.Securities.findAll();
    console.log(renter);
    //console.log(securityCompanies);
    this.setState({ SelectedIds: assetIds});
    this.setState({ theater : SelectedTheaters });
    this.setState({ securityCompanies });
    this.setState({ renter });
  }

  handleStartDate = event => {
    console.log(event.target.value);
    this.setState({ StartDate: event.target.value });
  };
  

  handleStartTime = (event) => {
    this.setState({ StartTime:event.target.value });
  };
  handleEndTime = (event) => {
    this.setState({ EndTime:event.target.value });
  };

  handleRent = async () => {
    console.log(this.state.StartDate);

    if (
      await DB.AssetRentings.create({
        AssetId: this.state.SelectedIds,
        StartDateTime: `${this.state.StartDate}T${this.state.StartTime}:00`,
        EndDateTime: `${this.state.StartDate}T${this.state.EndTime}:00`,
        TotalPrice: this.state.TotalPrice,
        Status: "completed",
        ReferalCode: null,
        SecurityId: this.state.Security.Id
      })
    ) {
      this.setState({ isCreated: true });
    }
  };

  handleTotalPrice = () => {
    var d = this.handleDuration();
    console.log(d);
    console.log(this.state.theater[0].TheaterPM.Price);
    console.log(this.state.EndTime);
    console.log(this.state.StartTime);
    console.log(this.state.Security);
    var price =0;

    if (
      this.state.StartTime != null &&
      this.state.EndTime != null &&
      this.state.Security != null
    ) {
      console.log("sdadad");
      this.state.theater.map((t, index) => (
      price = price + d * t.TheaterPM.Price,
      price = price + this.state.Security.Price
    ));
    }
    
    console.log(price);
    this.setState({ TotalPrice: price });
  };

  handleDuration = () => {
    if (this.state.StartTime != null && this.state.EndTime != null) {
      var edt = this.state.EndTime.split(":");
      var sdt = this.state.StartTime.split(":");
      
      var Difference_In_Time = edt[0] - sdt[0];
      
      console.log(Difference_In_Time);
      
      return Difference_In_Time;
    }
  };

  handleSecurity = sec => {
    this.setState({ Security: sec });
  };

  isAvailable = time => {
    // search for time in all times in
    //this.state.movie.assetBookings.Bookings;
    const search = `${this.state.Date}T${time}`;
    return (
      this.state.movie.AssetBookings.filter(
        assetBooking => assetBooking.Booking.StartDateTime === search
      ).length === 0
    );
  };

  

  render() {
    return this.state.isCreated ? (
      <Redirect to="/profile" />
    ) : (
      <div>
        <h2>Please Fill the Form Below</h2>
        <label>Renter: {this.state.renter.Email}</label>
        {/* <br />
        <label>Store Name: {this.state.renter.StoreName}</label> */}
        <br></br>
        <label>Show date: </label>
        <input type="date" onChange={this.handleStartDate}></input>
        <br />
        <label>Start Time: </label>
        <input type="Time" onChange={this.handleStartTime}></input>
        <br />
        <label>End Time: </label>
        <input type="Time" onChange={this.handleEndTime}></input>
        <br></br>
        Choose a Security Option
        {this.state.securityCompanies.map((company, index) => (
          <li key={index}>
            <Form.Check
              inline
              type="radio"
              name="securityCompany"
              onChange={() => this.handleSecurity(company)}
              value={company}
            ></Form.Check>
            <label>
              {company.CompanyName} : {company.Level}{" "}
            </label>
          </li>
        ))}
        <label>Total price: {this.state.TotalPrice}</label>
        <Button onClick={this.handleTotalPrice}>Calculate Price</Button>
        <br></br>
        <Button onClick={this.handleRent}>Create</Button>
      </div>
    );
  }
}
