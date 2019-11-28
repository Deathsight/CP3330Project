import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import { Link } from "react-router-dom";

export default class CleaningsIndexPro extends React.Component {
  state = {
    Cleanings: [],
    Rentings: []

  };

  async componentDidMount() {
    const json = await DB.Users.findByQuery("getRenting");
    this.setState({ Rentings: json });
    console.log(json)

  }

  render() {
    return (
      <div>
        <h2> my Cleaning Requests process </h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Renting ID</th>
              <th>Cleanings</th>
            </tr>
          </thead>
          <tbody>
         
            {this.state.Rentings.map(item => (
              
              <tr key={item.Id}>
                 <td>
                   {item.Id}
                </td>
                <thead>
                    <tr>
                        <th>CleanerEmail</th>
                        <th>Status</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                {item.Cleanings.map(item => (
                    <tr key={item.Id}>
                        <td>
                            {item.CleanerEmail}          
                        </td>
                        <td>
                            {item.Status}
                        </td>
                        <td> 
                { item.Status === "NotTakened"  ? (
                    <Link  to={`/cleanings/edit/${item.Id}`}>Take Request</Link>
                  ) : item.Status === "Inprocess "  ? (
                   "This request have been taken & it's In process" 
                  ) : item.Status === "Completed "  ? (
                    "This request have been Completed" 
                  ) : null  } 
                </td>  
                    </tr>
                ))}
                </tbody>       
              </tr>            
              ))}
          </tbody>
        </Table>
        <Link to={`/profile`}>Back to profile</Link>
      </div>
    );
  }
}
