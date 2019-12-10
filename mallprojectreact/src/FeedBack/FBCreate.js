import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";
import { DropdownList } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css'
import { width } from "@material-ui/system";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
export default class FBCreate extends React.Component {
  state = {
    User: null,
    UserRenters: null,
    Content: null,
    isCreated: false,
    Comment: "",
    rating: null,
    renters: null,

  };

  temps = [];
  

  async componentDidMount() {
    const json = await DB.Users.findByQuery("profile");
    this.setState({ User: json });
    const json2 = await DB.Renters.findByQuery("getAllRenter");
    console.log("this is json2: ",json2)
    let tempArr = []
    json2.map(item => 
        tempArr.push(item.StoreName)
      )
    this.setState({ UserRenters: tempArr, renters: json2});

    console.log("this is json",json)
  }

  async handleCreateDB() {
    let e = this.state.renters.filter(r => r.StoreName == this.state.Content)[0];
    console.log("e: ", e)
    if (
      await DB.FeedBacks.create({
        UserEmail: this.state.User.Email,
        RenterEmail: e.Email,
        Rating: this.state.rating,
        Comment: this.state.Comment
      })
    ) {
      this.setState({ isCreated: true });
    }
  }

  handleComment = event => {
    this.setState({ Comment: event.target.value });
  };

  handleRating = event => {
    this.setState({ rating: event.target.value });
  };

  handleCreate =  event => {
    let { people, value } = this.state;
  }

  

  render() {

    let rate = [1, 2, 3, 4,5]

    return this.state.isCreated ? (
      <Redirect to="/profile/" />
    ) : (
      this.state.User ?<div>
        <h2>Create FeedBacks</h2>

        <label>Email: </label>
          <input
            value={this.state.User.Email}
            type="text"
            disabled
          ></input>
        <br></br>
        <label>Comment: </label>
        <input type="text" onChange={this.handleComment}></input>
        <br></br>
        <label>Select Renter: </label>
        {this.state.UserRenters ?(
          <DropdownList style={{width: 250}} filter
          data={this.state.UserRenters}
          
          //onCreate={name => this.handleCreate(name)}
          //onChange={value => this.setState({ value })}
          // textField="name"
          value={this.state.value}
          
          onChange={value => this.setState({ value, Content: value })}
        />
        ) : null}
        
        <br></br>
        <label>Select rating: </label>
        <DropdownList
          style={{width: 100}}
          data={rate}
          value={this.state.value2}
          
          onChange={value2 => this.setState({ value2, rating: value2 })}
        />
        {/* <input type="number" onChange={this.handleRating}></input> */}
        
        <br></br>
        <Button onClick={() => this.handleCreateDB()}>Create</Button>
      </div>
      : null
    );
  }
}
