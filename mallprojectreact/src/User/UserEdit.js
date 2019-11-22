import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Auth from "../auth.js";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { post } from 'axios';

export default class UserEdit extends React.Component {
  state = {
    Name: "",
    Phone: "",
    User: null,
    isEdited: false,
    ProfileImageSrc: ""
  };

  async componentDidMount() {
    const json = await DB.Users.findByQuery("profile");
    console.log("test")
    this.setState({ User: json, Name: json.Name, Phone: json.Phone });
    this.setState({ProfileImageSrc: `/ProfileImages/${Auth.username()}.png`})
  }


  async handleEditDB() {
    const response = await DB.Users.editProfile({
      Email: this.state.User.Email,
      Name: this.state.Name,
      Phone: this.state.Phone,
      RoleID: this.state.User.RoleID

    });

    if (response) {
      this.setState({ isEdited: true });
    }
  }

  handleName = event => {
    this.setState({ Name: event.target.value });
  };
  handlePhone = event => {
    this.setState({ Phone: event.target.value });
  };
  
  onError = () =>{
    this.setState({ProfileImageSrc: "/ProfileImages/skrrrr.png"})
  }

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
    const url = 'http://localhost:3000/api/UploadImages?type=Profile';
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
          
          <img 
          src={`${this.state.ProfileImageSrc}`}
          onError={this.onError}
          alt="Profile Image" 
          style={{width:300}}
          />
          <br />
          <label>Upload Profile Image: </label>
          <input type="file" onChange={this.onChange} />
          <br></br>

          <label>Email: </label>
          <input
            value={this.state.User.Email}
            type="text"
            disabled
          ></input>
          <br></br>

          <label>Name: </label>
          <input
            value={this.state.Name}
            type="text"
            onChange={this.handleName}
          ></input>
          <br></br>

          <label>Phone Number: </label>
          <input
            value={this.state.Phone}
            type="number"
            onChange={this.handlePhone}
          ></input>
          <br></br>

          <label>Role: </label>
          <input
            value={this.state.User.Role.Name}
            type="text"
            disabled
          ></input>
          <br></br>

          <Button type="submit" onClick={() => this.handleEditDB()}>Save</Button>
        </form>
        :
        <h1>Loading...</h1>
      );
  }
}
