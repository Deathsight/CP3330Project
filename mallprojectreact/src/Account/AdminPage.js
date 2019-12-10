import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
//material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {Paper,Radio,Tabs,Tab} from '@material-ui/core'

export default class RentingIndex extends React.Component {
  state = {
    unApproved: [],
    isEdited: false,
    type:"Renters",
  };

  async componentDidMount() {
    const json = await DB.Renters.findAll();
    const unApproved = json.filter(u => u.Status == "Not Approved");
    this.setState({ unApproved});
  }
  handleSwitch = (type) => {
    this.setState({type})
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
              <Tabs
                value={this.state.type}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.switchType}
                style={{paddingTop:10, marginLeft:"40%"}}
                aria-label="disabled tabs example"
                
              >
                <Tab label="Advertisement"  onClick={()=> this.handleSwitch("Advertisement")}/>
                <Tab label="Renters" onClick={()=> this.handleSwitch("Renters")}/>
              </Tabs>
        <h2>Renters</h2>
<Paper>
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
        </Paper>
      </div>
    );
  }
}
