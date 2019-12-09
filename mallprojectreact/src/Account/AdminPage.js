import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";


export default class RentingIndex extends React.Component {
  state = {
    unApproved: [],
    isEdited: false
  };

  async componentDidMount() {
    const json = await DB.Renters.findAll();
    const unApproved = json.filter(u => u.Status == "Not Approved");
    this.setState({ unApproved});
  }

  handleApprove = async (Id) => {
    let un = this.state.unApproved.filter(u => u.Email == Id)[0];
    console.log(un);
    const response = await DB.Renters.approveRenter(
        Id  
       ,{
         Email: Id,
         StoreName: un.StoreName,
         QIdPic: un.QIdPic,
         Type: un.Type,
         RCodeUsed: un.RCodeUsed,
         Description: un.Description,
         ReferralCode: un.ReferralCode,
         RCUses: un.RCUses,
         Tokens: un.Tokens,
         Status: "Approved"
       });
   
       if (response) {
         this.setState({ isEdited: true });
       }
  };

  render() {
    return this.state.isEdited ? (
      <Redirect to="/profile/new" />
    ) : (
      <div>
        <h2>Renters</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Renter Name</th>
              <th>Status</th>
              
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.unApproved.map(item =>
              
                <tr key={item.Id}>
                <td>{item.Email}</td>
                  <td>{item.StoreName}</td>
                  <td>{item.Status}</td>
                  <td><Button onClick={()=>this.handleApprove(item.Email)}> Approve</Button></td>

                </tr>
              
            )}
          </tbody>
        </Table>
        
      </div>
    );
  }
}
