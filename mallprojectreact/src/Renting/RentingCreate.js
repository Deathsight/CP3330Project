import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import Auth from "../auth";

export default class RentingCreate extends React.Component {
  state = {
    renter: "",
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
    steps:0,
    ReferalCode: null,
    useRC: false,
    Tokens: 0,
    discount: false,
    useToken: false
  };

  async componentDidMount() {
    let assetIds = this.props.match.params.id.split(",")
    assetIds = assetIds.map(item => parseInt(item))

    const stores = await DB.Stores.findAll();

    const SelectedStores = stores.filter(function(item) {
      return assetIds.indexOf(item.AssetId) !== -1;
    });

    const json = await DB.Renters.findByQuery("getTokens");
    this.setState({ Tokens: json });
    
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

  handleReferalCode = event => {
    this.setState({ ReferalCode: event.target.value });
  };

  handleTime = (event, Time) => {
    this.setState({ Time });
  };
  handleDraft = async () =>
  {
    await this.setState({ Status: "Draft" });
    this.handleRent()
  }
  handleRent = async () => {
    console.log(this.state.Date);
    console.log(this.state.Time);

    if (
      await DB.AssetRentings.create({
        AssetId: this.state.SelectedIds,
        StartDateTime: `${this.state.StartDateTime}T00:00:00`,
        EndDateTime: `${this.state.EndDateTime}T00:00:00`,
        TotalPrice: this.state.TotalPrice,
        Status: this.state.Status,
        ReferalCode: this.state.useRC?(this.state.ReferalCode):(null),
        SecurityId: this.state.Security.Id
      })
    ) {
      this.setState({ isCreated: true });
      await DB.Renters.findByQuery("tokenUsed");
    }
  };

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

  handleCapacity = event => {
    this.setState({ Capacity: event.target.value });
  };

  handleUseRC = async () => {
    if(this.state.discount === false)
    {
      if (await DB.Renters.checkRC(this.state.ReferalCode)) 
      {
        alert("Referral Code Accepted! You got 10% Discount.")
        this.setState({useRC: true})
        this.setState({discount: true})
        this.setState({ TotalPrice: this.state.TotalPrice - (this.state.TotalPrice * 0.1) })
      }
      else{
        alert("Referral Code Not Available!")
      }
  }
  };

  handleUseToken = () => {
    if(this.state.discount === false)
    {
      alert("Token is in use! You got 10% Discount.")
      this.setState({useToken: true})
      this.setState({discount: true})
      this.setState({Tokens: this.state.Tokens - 1})
      this.setState({ TotalPrice: this.state.TotalPrice - (this.state.TotalPrice * 0.1) })
    }
  };

  render() {
    return this.state.isCreated ? (
      <Redirect to="/profile" />
    ) : (
      <div>
        <h2>Please Fill the Form Below</h2>
        <label>Renter: {this.state.renter.Email}</label>
        <br />
        <label>Store Name: {this.state.renter.StoreName}</label>
        <br></br>
        <label>Start date: </label>
        <input type="date" onChange={this.handleStartDate}></input>
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
            <label>Referal Code: </label>
            <input type="text" onChange={this.handleReferalCode}></input>
            <Button onClick={() => this.handleUseRC()}>Use Code</Button>
            <br />
            {this.state.Tokens > 0?(<div><label>Available Tokens: {this.state.Tokens}</label><Button onClick={() => this.handleUseToken()}>Use Token</Button><br /></div>
            ):(null)}
            <Button onClick={this.handleRent}>Create</Button>
            <br></br>
            <Button onClick={this.handleDraft}>Save for later</Button>
          </div>
        : null
        }
      </div>
    );
  }
}
