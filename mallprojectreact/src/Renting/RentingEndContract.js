import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import Auth from "../auth";

export default class RentingCreate extends React.Component {
  state = {
    Renting: null
  };

  async componentDidMount() {
    const json = await DB.Rentings.findOne(this.props.match.params.id)
    this.setState({ Renting: json});
    console.log(json)

  }

  handleEnd = async () =>
  {
      if(await DB.Rentings.edit(
        this.state.Renting.Id,
        {
          Id: this.state.Renting.Id,
          RenterEmail: Auth.username(),
          StartDateTime: `${this.state.Renting.StartDateTime}`,
          EndDateTime: `${this.state.Renting.EndDateTime}`,
          TotalPrice: this.state.Renting.TotalPrice,
          Status: "Expired",
          ReferalCode: null,
          SecurityId: this.state.Renting.Security.Id
        }
      )){
        this.setState({ isCreated: true });
      }
  }


  render() {
    return this.state.isCreated ? (
      <Redirect to="/profile" />
    ) : (
      this.state.Renting ?
      <div>
        <h1>Are you sure?</h1>
        <Button onClick={this.handleEnd} variant="secondary">End Contract</Button>
      </div>
      :
      <h2>Loading....</h2>
    );
  }
}
