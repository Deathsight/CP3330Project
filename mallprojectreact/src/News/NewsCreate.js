import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";

export default class AssetCreate extends React.Component {
  state = {
    Topic: "",
    Content: "",
    PricingModelId: 1,
    isCreated: false
  };

  async handleCreateDB() {
    if (
      await DB.News.create({
        Topic: this.state.Topic,
        Content: this.state.Content
      })
    ) {
      this.setState({ isCreated: true });
    }
  }

  handleTopic = event => {
    this.setState({ Topic: event.target.value });
  };
  handleContent = event => {
    this.setState({ Content: event.target.value });
  };

  render() {
    return this.state.isCreated ? (
      <Redirect to="/news/" />
    ) : (
      <div>
        <h2>Create News</h2>

        <label>Topic: </label>
        <input type="text" onChange={this.handleTopic}></input>
        <br></br>
        <label>Content: </label>
        <input type="text" onChange={this.handleContent}></input>
        <br></br>
        <Button onClick={() => this.handleCreateDB()}>Create</Button>
      </div>
    );
  }
}
