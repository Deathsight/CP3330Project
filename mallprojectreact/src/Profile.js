import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "./db.js";
import Auth from "./auth.js";
import { Link } from "react-router-dom";

export default class Profile extends React.Component {
  state = {
    User: null,
    Tickets: []
  };

  async componentDidMount() {
    const json = await DB.Users.findByQuery("profile");
    this.setState({ User: json });
    console.log(json)
    if(this.state.User.Role.Name === "SupportAgent"){
      const json2 = await DB.SupportTickets.findAll();
      this.setState({ Tickets: json2 });
    }
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
                
                <tr><td><Link to={`/profile/editRenter/`}>Edit Renter Info</Link></td></tr>
              </thead>
            </Table>
            <br/>
            

            <h2>My Rents</h2>

            <Table striped bordered hover>
              <thead>

                <tr>
                <th>Start Date/Time</th>
                <th>End Date/Time</th>
                <th>Assets</th>
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
                    <th>Asset Size</th>
                    <th>Asset Location</th>
                  </tr>
                  {console.log(item.AssetRentings)}
                  {item.AssetRentings.map(item => (
                    <tr key={item.Id}>

                      <td>{item.Asset.Type}</td>

                      <td>{item.Asset.Store.StorePM.Description}</td>

                      <td>{item.Asset.LocationCode}</td>

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
        ) : this.state.User.Role.Name === "SupportAgent" ? (

          <div>
            <h2>Tickets</h2>

            <Table striped bordered hover>
              <thead>

                <tr>
                <th>Agent Name</th>  
                <th>User Email</th>
                <th>Start Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Type</th>
                <th>Priority</th>
                
                <th>Details</th>
                <th>Ticket</th>
                
                </tr>

                {this.state.Tickets.map(item => (
                  item.Status === "open" ? ( 
                  <tr key={item.Id}>

                  <td>{item.User ? ( item.User.Name ):("")}</td>

                  <td>{item.UserEmail}</td>
                  
                  <td>{this.handleDate(item.SubmitDate)}</td>

                  <td>{item.Description}</td>

                  <td>{item.Status}</td>

                  <td>{item.STicketType.Name}</td>

                  <td>{item.STicketType.Priority}</td>

                  <td>
                    {
                      item.AgentEmail === Auth.username() ? (
                      <Link to={`/support/details/${item.Id}`}>Details</Link>
                      ):("Not Available")
                    }
                  </td>

                  <td>
                    {item.AgentEmail === Auth.username() ? ( 
                      <Link to={`/support/close/${item.Id}`}>Close Ticket</Link>
                    ): item.AgentEmail ? ( "Ticket Taken" ):( <Link to={`/support/accept/${item.Id}`}>Take Ticket</Link>)
                    }
                  </td>
                </tr>
                  ):(null)
                ))}
              </thead>
            </Table>
          </div>

         ) : this.state.User.Role.Name !== "SupportAgent" ? (

          <div>
            <h2>My Support Tickets</h2>

            <Table striped bordered hover>
              <thead>

                <tr>
                <th>Topic</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>Close Date</th>
                <th>Status</th>
                
                <th>Details</th>
                <th>Close Ticket</th>
                
                </tr>

                {this.state.User.SupportTickets1.map(item => (
                  <tr key={item.Id}>

                  <td>{item.STicketType.Name}</td>

                  <td>{item.Description}</td>
                  
                  <td>{this.handleDate(item.SubmitDate)}</td>

                  <td>{item.ClosedDate ? ( this.handleDate(item.ClosedDate)):("")}</td>

                  <td>{item.Status}</td>


                  <td>
                    {
                      <Link to={`/support/details/${item.Id}`}>Details</Link>
                    }
                  </td>

                  <td>
                  {item.ClosedDate ? ( "Ticket Closed" ):( <Link to={`/support/close/${item.Id}`}>Close Ticket</Link>)}
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
