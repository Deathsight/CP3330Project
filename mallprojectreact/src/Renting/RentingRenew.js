import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import Auth from "../auth";

export default class RentingCreate extends React.Component {
  state = {
    Renting: null,
    Security: null,
    securityCompanies: [],
    isCreated: false,
    SelectedStores: [],
    SelectedIds: [],
    StartDateTime: null,
    EndDateTime: null,
    TotalPrice: 0,
    duration: null,
    Status: "Complete",
    steps:0
  };

  async componentDidMount() {
    const json = await DB.Rentings.findOne(this.props.match.params.id)
    this.setState({ Renting: json});

    const stores = await DB.Stores.findAll();

    const SelectedStores = stores.filter(function(item) {
      return assetIds.indexOf(item.AssetId) !== -1;
    });
    
    const renter = await DB.Renters.findByName(Auth.username());
    const securityCompanies = await DB.Securities.findAll();
    console.log(renter);
    //console.log(securityCompanies);
    this.setState({ SelectedIds: assetIds});
    this.setState({ SelectedStores });
    this.setState({ securityCompanies });
    this.setState({ renter });
  }


  handleStartDate = event => {
    console.log(event.target.value);
    this.setState({ StartDateTime: event.target.value });
  };
  handleEndDate = event => {
    console.log(event.target.value);
    this.setState({ EndDateTime: event.target.value,steps:1 });
  };

  handleTime = (event, Time) => {
    this.setState({ Time });
  };
  handleRenew = async () =>
  {
      if(await DB.Rentings.edit(
        this.state.Renting.Id,
        {
          Id: this.state.Renting.Id,
          RenterEmail: Auth.username(),
          StartDateTime: `${this.state.Renting.StartDateTime}`,
          EndDateTime: `${this.state.Renting.EndDateTime}T00:00:00`,
          TotalPrice: this.state.Renting.TotalPrice,
          Status: "completed",
          ReferalCode: null,
          SecurityId: this.state.Renting.Security.Id
        }
      )){
        this.setState({ isCreated: true });
      }
  }
  
  handleTotalPrice = () => {
    var d = this.handleDuration();
    console.log(d);
    console.log(this.state.Security);
    var totalPrice = 0
    if (
      this.state.StartDateTime != null &&
      this.state.EndDateTime != null &&
      this.state.Security != null
    ) {

      this.state.SelectedStores.map(item => (
        totalPrice = totalPrice + (d * item.StorePM.Price)
      ))

      //console.log(price);
      totalPrice = totalPrice + this.state.Security.Price;
      console.log(totalPrice);
      this.setState({ TotalPrice: totalPrice,steps:2 });
    }
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
  handleDuration = () => {
    if (this.state.StartDateTime != null && this.state.EndDateTime != null) {
      var edt = new Date(this.state.EndDateTime);
      var sdt = new Date(this.state.StartDateTime);

      var Difference_In_Time = edt.getTime() - sdt.getTime();

      var days = Difference_In_Time / (1000 * 3600 * 24);
      console.log(days / 30);
      return days / 30;
    }
  };

  handleSecurity = sec => {
    this.setState({ Security: sec });
  };
  handleCapacity = event => {
    this.setState({ Capacity: event.target.value });
  };


  render() {
    return this.state.isCreated ? (
      <Redirect to="/profile" />
    ) : (
      this.state.renter ?
      <div>
        <h2>Please Fill the Form Below</h2>
        <label>Renter: { Auth.username()}</label>
        <br />
        <label>Start date: </label>
        <input disabled type="date" onChange={this.handleStartDate}></input>
        <br />
        <label>End date: </label>
        <input type="date" onChange={this.handleEndDate}></input>
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
        <br></br>
        { this.state.steps  === 1 ?
        <div>
            <Button onClick={this.handleTotalPrice}>Calculate Price</Button>
            <br></br>
        </div>
        : null
        }
        { this.state.steps  === 2 ?
          <div>
          <Button onClick={this.handleRenew}>Create</Button>
          </div>
        : null
        }
      </div>
      :<p>Loading...</p>
    );
  }
}
