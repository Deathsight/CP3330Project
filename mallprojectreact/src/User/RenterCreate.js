import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Auth from "../auth.js";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { post } from 'axios';
import Form from 'react-bootstrap/Form';

export default class RenterCreate extends React.Component {
  state = {
    StoreName: "",
    Type: "",
    Description: "",
    isEdited: false,
    QIdPic: ""
  };

  //random string generator
  randomString = require('random-string');

  async componentDidMount() {
    const json = await DB.Users.findByQuery("profile");
    console.log(json)
    this.setState({ User: json });

  }


  async handleCreateDB() {
    if (
        await DB.Renters.create({
          Email: this.state.User.Email,
          StoreName: this.state.StoreName,
          QIdPic: null,
          Type: this.state.Type,
          RCodeUsed: null,
          Description: this.state.Description,
          ReferralCode: this.randomString({length: 5}),
          RCUses: 3,
          Tokens: 0,
          Status: "Not Approved"
        })
      ) {
        this.setState({ isCreated: true });
      }
  }

  handleStoreName = event => {
    this.setState({ StoreName: event.target.value });
  };
  handleType = event => {
    this.setState({ Type: event.target.value });
  };
  handleDescription = event => {
    this.setState({ Description: event.target.value });
  };
 
  
  ///////////////////////////////////
  //////Uploading Profile Image//////
  ///////////////////////////////////

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
    console.log(e.target.files[0])
  }
  fileUpload(file){
    const url = 'http://localhost:3000/api/UploadImages?type=QID';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    }
    console.log(url,formData,config)
    return  post(url, formData,config)
  }
  

  ///////////////////////////////////
  ///////////////////////////////////

  render() {
    return this.state.isEdited ? (
      <Redirect to="/profile" />
    ) : (
        this.state.User ? 
        <form onSubmit={this.onFormSubmit}>
          <h2>Edit Profile</h2>
          <br />
          <label>Email: </label>
          <input
            value={this.state.User.Email}
            type="text"
            disabled
          ></input>
          <br></br>
          
          
          

          <label>Store Name: </label>
          <input
            type="text"
            onChange={this.handleStoreName}
          ></input>
          <br></br>

          <label>Type of Merch: </label>
          <input
            value={this.state.Phone}
            type="text"
            onChange={this.handleType}
          ></input>
          <br></br>

          

          <label>Description: </label>
          <input
            type="text"
            onChange={this.handleDescription}
          ></input>
          <br></br>
<label>Upload QID Copy: </label>
          <input type="file" onChange={this.onChange} />
          <br></br>
          <Button type="submit" onClick={() => this.handleCreateDB()}>Save</Button>
        </form>
        :
        <h1>Loading...</h1>
      );
  }
}
