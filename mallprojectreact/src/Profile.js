import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "./db.js";
import { Link } from "react-router-dom";

export default class Profile extends React.Component {
  state = {
    Customer: null
  };

  async componentDidMount() {
    const json = await DB.Customers.findByQuery("profile");
    this.setState({ Customer: json });
  }
  
  handleDate = (item) => {
    const datetime = new Date(item)
    return `${datetime.toDateString()} - ${datetime.toLocaleTimeString()}`
  }

  handleBirthDate = (item) => {
    const datetime = new Date(item)
    return datetime.toLocaleDateString()
  }

  render() {
    return this.state.Customer ? (
      <div>
        <h2>My Profile</h2>

        <table>
          <thead>
            <tr>
              <th>Name:</th>
              <td>{this.state.Customer.Name}</td>
            </tr>
            <tr>
              <th>Birth Date:</th>
              <td>{this.handleBirthDate(this.state.Customer.BirthDate)}</td>
            </tr>
              <tr>
              <th>Phone Number:</th>
              <td>{this.state.Customer.Phone}</td>
            </tr>
            <td><Link to={`/Profile/edit/`}>Edit Profile</Link></td>
          </thead>
        </table>
        <br/>

        <h2>My Appointments</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
            <th>Date/Time</th>
            <th>Stylist</th>
            <th>Price</th>
            <th>Status</th>
            <th>Cancel</th>
            </tr>
            {this.state.Customer.Bookings.map(item => (
              <tr key={item.Id}>
              <td>{this.handleDate(item.StartDateTime)}</td>
              <td>{item.AssetBookings[0].Asset.Description}</td>
              <td>{item.TotalPrice}</td>
              <td>{item.Status}</td>
              <td>
                  {
                    <Link to={`/booking/delete/${item.Id}`}>Cancel Appointment</Link>
                  }
                </td>
            </tr>
            ))}
          </thead>
        </Table>
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  }
}
