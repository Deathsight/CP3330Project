import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";

export default class EventIndex extends React.Component {
  state = {
    Events: []
  };

  async componentDidMount() {
    const json = await DB.Events.findAll();
    console.log(json);
    this.setState({ Events: json });
  }

  handleBook = (Id) => {
    let temp = [Id]
    this.setState({ SelectedAssets: this.state.SelectedAssets.concat(temp) });
    console.log(this.state.SelectedAssets)
  };

  render() {
    return (
      <div>
        <Link to={`/profile/complete`}>complete profile</Link>
        <h2>Events</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ShowName</th>
              <th>Price</th>
              <th>Date</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.Events.map(item =>
                <tr key={item.Id}>
                  <td>{item.ShowName.split(">")[0]}</td>
                  <td>{item.Price}</td>
                  <td>{item.StartTime.split("T")[0]}</td>
                  <td>{item.StartTime.split("T")[1]}</td>
                  {Auth.isLoggedIn() && (
                    <td>
                      <Link to={`/seat/${item.ShowName}`}>View Seats</Link>
                    </td>
                  )}
                </tr>
            
            )}
          </tbody>
        </Table>
        
          

         
      </div>
    );
  }
}
