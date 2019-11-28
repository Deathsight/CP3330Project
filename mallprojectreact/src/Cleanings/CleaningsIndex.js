import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";

export default class CleaningsIndex extends React.Component {
  state = {
    Cleanings: []

  };

  async componentDidMount() {
    const json = await DB.Users.findByQuery("getCleanings");
    this.setState({ Cleanings: json });

  }

  render() {
    return (
      <div>
        <h2> my Cleaning Requests </h2>

        <Table striped bordered hover>
          <thead>
            <tr>

              <th>Renting ID</th>
               <th>CleanerEmail</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
            {this.state.Cleanings.map(item => (
              
              <tr key={item.Id}>

                <td>{item.RentingId}</td>
               <td>{item.CleanerEmail}</td>
                <td>{item.Status}</td>
                
                <td>
                <Link to={`/cleanings/edit/${item.Id}`}>Edit</Link>

               
                </td>
                <td>
                 <Link to={`/cleanings/delete/${item.Id}`}>Complete</Link>

               
                </td>
               
                
              </tr>
              
              )
            )}
          </tbody>
        </Table>
        <Link to={`/cleanings/public/`}>Back to Cleanings Requests page</Link>

      </div>
    );
  }
}
