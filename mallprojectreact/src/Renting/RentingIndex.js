import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";

export default class AssetIndex extends React.Component {
  state = {
    Assets: []
  };

  async componentDidMount() {
    const json = await DB.Assets.findAll();
    this.setState({ Assets: json });
  }

  render() {
    return (
      <div>
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
                      <Link to={`/renting/create/${item.Id}`}>Rent</Link>
                    </td>
                  )}
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
