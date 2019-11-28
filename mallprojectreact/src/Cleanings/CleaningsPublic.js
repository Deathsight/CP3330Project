import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";

export default class CleaningsPublic extends React.Component {
  state = {
    Cleanings: [],
    Role: ""

  };

  async componentDidMount() {
    const json = await DB.Cleanings.findAll();
    this.setState({ Cleanings: json });

    const json2 = await DB.Users.findByQuery("getRole");
    this.setState({ Role: json2 });


  }

  render() {
    return (
      <div>
       {this.state.Role === "Cleaner" ? ( <Link to={`/cleanings/index`}>My Cleanings Requests</Link> ) : ( null )}
        <h2> Cleaning Requests </h2>

        <Table striped bordered hover>
          <thead>
            <tr>

              <th>Rntering ID</th>
              {this.state.Role === "Cleaner" ? (  <th>CleanerEmail</th>) : ( null )}

              
              <th>Status</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {this.state.Cleanings.map(item => (
              
              <tr key={item.Id}>

                <td>{item.RentingId}</td>
   
                <td>
                {item.Status === "NotTakened"  ? (
                  null      
                  ) : (
                    <p>{item.CleanerEmail}</p>
                   ) }                 
                </td>
                            
                <td>{item.Status}</td>
  
                <td> 
                {item.Status === "NotTakened"  ? (
                   <Link  to={`/cleanings/edit/${item.Id}`}>Take Request</Link>
                  ) : item.Status === "Inprocess "  ? (
                   "This request have been taken & it's In process" 
                  ) : item.Status === "Completed "  ? (
                    "This request have been Completed" 
                  ) : null  } 
                </td>  
              </tr>
              
              )
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
