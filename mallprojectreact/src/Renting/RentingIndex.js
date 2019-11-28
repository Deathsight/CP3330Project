import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";

export default class RentingIndex extends React.Component {
  state = {
    Assets: [],
    SelectedAssets: []
  };

  async componentDidMount() {
    const json = await DB.Assets.findByQuery("getAssets");
    this.setState({ Assets: json });
  }

  handleSelect = (Id) => {
    let temp = [Id]
    this.setState({ SelectedAssets: this.state.SelectedAssets.concat(temp) });
    console.log(this.state.SelectedAssets)
  };

  render() {
    return (
      <div>
        <Link to={`/profile/complete`}>complete profile</Link>
        <h2>Stores</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Location Code</th>
              <th>Description</th>
              <th>Size</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.Assets.map(item =>
              item.Type === "Store" ? (
                <tr key={item.Id}>
                  <td>{item.LocationCode}</td>
                  <td>{item.Description}</td>
                  <td>{item.Store.Size}</td>
                  <td>{item.Store.StorePM.Price}</td>
                  {Auth.isLoggedIn() && (
                    <td>
                      <button onClick={() => this.handleSelect(item.Id)}>Rent</button>
                    </td>
                  )}
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
        <div>
          {this.state.SelectedAssets.map(item =>
          <p>{item}</p>
          )}

          <Link to={`/renting/create/${this.state.SelectedAssets}`}>Create</Link>
        </div>
        {/*Displaying the Rentable Theaters */}
            <h1>Theaters</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Location Code</th>
              <th>Description</th>
              <th>Size</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.Assets.map(item =>
              item.Type === "Theater" ? (
                <tr key={item.Id}>
                  <td>{item.LocationCode}</td>
                  <td>{item.Description}</td>
                  <td>{item.Theater.Size}</td>
                  <td>{item.Theater.TheaterPM.Price}</td>
                  {Auth.isLoggedIn() && (
                    <td>
                      <button onClick={() => this.handleSelect(item.Id)}>Rent</button>
                    </td>
                  )}
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
        <div>
          {this.state.SelectedAssets.map(item =>
          <p>{item}</p>
          )}

          <Link to={`/renting/theaterRenting/${this.state.SelectedAssets}`}>Create</Link>
        </div>
      </div>
    );
  }
}
