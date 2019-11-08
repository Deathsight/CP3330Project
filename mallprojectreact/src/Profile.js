import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "./db.js";
import { Link } from "react-router-dom";

export default class Profile extends React.Component {
  state = {
    User: null
  };

  async componentDidMount() {
    const json = await DB.Users.findByQuery("profile");
    this.setState({ User: json });
  }
  
  handleDate = (item) => {
    const datetime = new Date(item)
    return `${datetime.toDateString()} - ${datetime.toLocaleTimeString()}`
  }

  render() {
    return this.state.User ? (
      <div>
        {this.state.User.Role.Name === "Renter" ? ( <h2>User Profile</h2> ) : ( <h2>My Profile</h2> )}
        

        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Email:</th>
              <td>{this.state.User.Email}</td>
            </tr>

            <tr>
              <th>Name:</th>
              <td>{this.state.User.Name}</td>
            </tr>

              <tr>
              <th>Phone Number:</th>
              <td>{this.state.User.Phone}</td>
            </tr>

            <tr>
              <th>Role:</th>
              <td>{this.state.User.Role.Name}</td>
            </tr>
            
            <tr><td><Link to={`/profile/edit`}>Edit Profile</Link></td></tr>
          </tbody>
        </Table>
        <br/>

        {this.state.User.Role.Name === "Renter" ? (
          <div>

            <h2>Store Information</h2>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Store Name:</th>
                  <td>{this.state.User.Renter.StoreName}</td>
                </tr>

                <tr>
                  <th>Type:</th>
                  <td>{this.state.User.Renter.Type}</td>
                </tr>

                  <tr>
                  <th>Description:</th>
                  <td>{this.state.User.Renter.Description}</td>
                </tr>

                <tr>
                  <th>Available Discount Tokens:</th>
                  <td>{this.state.User.Renter.Tokens}</td>
                </tr>

                <tr>
                  <th>Store Status:</th>
                  <td>{this.state.User.Renter.Status}</td>
                </tr>
                
                <td><Link to={`/profile/editRenter/`}>Edit Renter Info</Link></td>
              </thead>
            </Table>
            <br/>
            

            <h2>My Rents</h2>

            <Table striped bordered hover>
              <thead>

                <tr>
                <th>Start Date/Time</th>
                <th>End Date/Time</th>
                <th>Asset</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>ReferalCode</th>
                <th>Security Company Name</th>
                <th>Security Level</th>
                
                <th>Renew Contract</th>
                <th>End Contract</th>
                
                </tr>

                {this.state.User.Renter.Rentings.map(item => (
                  <tr key={item.Id}>
                  <td>{this.handleDate(item.StartDateTime)}</td>

                  <td>{this.handleDate(item.EndDateTime)}</td>

                  <thead>

                  <tr>
                    <th>Asset Type</th>
                    <th>Asset Name</th>
                    <th>Asset Description</th>
                  </tr>
                    
                  {item.AssetRentings.map(item => (
                    <tr key={item.Id}>

                      <td>{item.Type}</td>

                      <td>{item.Name}</td>

                      <td>{item.Description}</td>

                    </tr>
                  ))}
                  </thead>

                  <td>{item.TotalPrice}</td>

                  <td>{item.Status}</td>

                  <td>{item.ReferalCode}</td>

                  <td>{item.Security.CompanyName}</td>

                  <td>{item.Security.Level}</td>

                  <td>
                    {
                      <Link to={`/renting/renew/${item.Id}`}>Renew Contract</Link>
                    }
                  </td>

                  <td>
                    {
                      <Link to={`/renting/end/${item.Id}`}>End Contract</Link>
                    }
                  </td>
                </tr>
                ))}
              </thead>
            </Table>
          </div>
        ) : ( 

        <h1>Nothing else for your role. Soooon</h1>

        )}
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  }
}
