import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";

export default class RentingIndex extends React.Component {
  state = {
    theater: null,
    ShowName: null
  };

  async componentDidMount() {
    const json = await DB.Theaters.findOne(this.props.match.params.id.split(">")[1]);
    const ShowName = this.props.match.params.id.split(">")[0];
    console.log(json);
    this.setState({ theater: json });
    this.setState({ShowName});
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
        <h2>Seats</h2>
        {this.state.theater == null? "Loading": 
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Seat Number</th>
              <th>Seat Type</th>
              
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.theater.Seats.map(item =>
                <tr key={item.Id}>
                <td>{item.Id}{this.state.theater.Asset.LocationCode}</td>
                  <td>{item.Type} {" "} Seat</td>
                  {Auth.isLoggedIn() && (
                    <td>
                      <Link to={`/book/${item.Id}>${this.props.match.params.id}`}>Book</Link>
                    </td>
                  )}
                </tr>
            
            )}
          </tbody>
        </Table>}
        
        
          

         
      </div>
    );
  }
}
