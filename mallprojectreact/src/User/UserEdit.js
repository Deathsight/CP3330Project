import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

export default class UserEdit extends React.Component {
  state = {
    Name: "",
    Phone: "",
    User: null,
    isEdited: false
  };

  async componentDidMount() {
    const json = await DB.Users.findByQuery("profile");
    this.setState({ Email: json.Email, Name: json.Name, Phone: json.Phone, User: json });
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


  render() {
    return this.state.isEdited ? (
      <Redirect to="/profile" />
    ) : (
        <div>
          <h2>Edit Profile</h2>
          <br />

          <label>Email: </label>
          <input
            value={this.state.User.Email}
            type="text"
            disabled="disabled"
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
            value={this.state.User.Roles.Name}
            type="text"
            disabled
          ></input>
          <br></br>

          <Button onClick={() => this.handleEditDB()}>Save</Button>
        </div>
      );
  }
}
