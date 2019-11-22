import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "./db.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Link, Redirect } from "react-router-dom";
import Auth from "./auth.js";

export default class Subscription extends React.Component {
  state = {
    UserEMail: Auth.username(),
    SubscriptionLevels: [],
    level: null,
    ExpiryDate: null,
    SubscriptionLevelID: null,
    Today: null
  };

  async componentDidMount() {
    const SubscriptionLevels = await DB.SubscriptionLevels.findAll();
    console.log("===> ", SubscriptionLevels)
    this.setState({ SubscriptionLevels });
    
  }

  async handleCreateDB() {
    if (
      await DB.Subscriptions.create({
        UserEMail: this.state.UserEMail,
        ExpiryDate: this.state.ExpiryDate,
        SubscriptionLevelID: this.state.level
      })
    ) {
      this.setState({ isCreated: true });
    }
  }

  handleExpiryDate = event => {
      console.log(event.target.value)
      var date = new Date();
      var newDate = new Date(date.setTime( date.getTime() + event.target.value * 86400000 ));
      console.log(newDate.toLocaleDateString())
    this.setState({ ExpiryDate: newDate });
  };

  handleLevel = sec => {
      console.log(sec.Id)
    this.setState({ level: sec.Id });
  };

  render() {
    return this.state.isCreated ? (
      <Redirect to="/Profile/" />
    ) : (
      <div>
        <h2>New Subscription</h2>

        
        <label>{`User Name: ${Auth.username()}`}</label>
        <br></br>
        <fieldset>
            <Form.Group>
                <Form.Label as="legend" column sm={10}>
                    Choose subscription deration:
                </Form.Label>
                <Col>
                    <Form.Check
                    type="radio"
                    label="30 days plan"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    onChange={this.handleExpiryDate}
                    value = {30}
                    />
                    <Form.Check
                    type="radio"
                    label="3 months plan"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    onChange={this.handleExpiryDate}
                    value = {90}
                    />
                    <Form.Check
                    type="radio"
                    label="1 year plan"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    onChange={this.handleExpiryDate}
                    value = {365}
                    />
                </Col>
            </Form.Group>
            <br></br>
            Choose your plan:
        {this.state.SubscriptionLevels.map((sub, index) => (
          <li key={index}>
            <Form.Check
              inline
              type="radio"
              name="SubscriptionLevel"
              onChange={() => this.handleLevel(sub)}
              value={sub}
            ></Form.Check>
            <label>
              {sub.Level} : {sub.Level}{" "}
            </label>
          </li>
        ))}
        </fieldset>
        <br></br>
        <Button onClick={() => this.handleCreateDB()}>Create</Button>
      </div>
    );
  }
}
