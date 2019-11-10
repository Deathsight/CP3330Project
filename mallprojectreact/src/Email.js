import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "./db.js";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

export default class Email extends React.Component {
  state = {
    To: "",
    Body: "",
    Subject: ""
  };

  handleCreateDB = async () => {
    if (
      await DB.Emails.SendEmail({
        To: this.state.To,
        Body: this.state.Body,
        Subject: this.state.Subject
      })
    ) {
      console.log("Email has been sent");
    }
  };

  handleTo = event => {
    this.setState({ To: event.target.value });
  };
  handleBody = event => {
    this.setState({ Body: event.target.value });
  };
  handleSubject = event => {
    this.setState({ Subject: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Emails Section</h2>
        <hr />
        <dl>
          <dt>Send TO</dt>
          <dd>
            <input type="text" onChange={this.handleTo} />
          </dd>
        </dl>
        <dl>
          <dt>Massege</dt>
          <dd>
            <input type="text" onChange={this.handleBody} />
          </dd>
        </dl>
        <dl>
          <dt>Subject</dt>
          <dd>
            <input type="text" onChange={this.handleSubject} />
          </dd>
        </dl>
        <p>
          <Button onClick={this.handleCreateDB}>Send</Button>
        </p>
      </div>
    );
  }
}
