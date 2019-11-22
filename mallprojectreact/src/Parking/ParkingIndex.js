import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";

export default class ParkingIndex extends React.Component {
  state = {
    Parking: []
  };

  async componentDidMount() {
    const json = await DB.Parkings.findAll();
    
    console.log(json)
  
    this.setState({ Parking: json });
  }

  async getParking(id){
    return await DB.Parkings.findOne(id)
  }

   handleNullDB = async (id)=> {
    let Parking = this.state.Parking.filter(p => p.Id == id)[0];
    console.log(Parking)
    const response = await DB.Parkings.edit(id,{
      id: id,
      SubscriptionID: null,
      Floor: Parking.Floor,
      ParkingNumber: Parking.ParkingNumber,
      CarPlate: null,
      Status: "Empty" });
      
    if (response) {
      window.location.reload();
    }
  }

  render() {
    return (
      <div>
        <h2>Parking</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SubscriptionID</th>
              <th>Floor</th>
              <th>ParkingNumber</th>
              <th>CarPlate</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.Parking.map(item =>
                <tr key={item.Id}>
                  <td>{item.SubscriptionID}</td>
                  <td>{item.Floor}</td>
                  <td>{item.ParkingNumber}</td>
                  <td>{item.CarPlate}</td>
                  <td>{item.Status}</td>
                  {Auth.isLoggedIn() &&(
                    <td>
                      {item.Status == "Parked"?<button onClick={() => this.handleNullDB(item.Id)}>Empty the spot</button> : <Link to={`/Parking/ParkingEdit/${item.Id}`}>Park</Link> }
                      
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
