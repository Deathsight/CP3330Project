import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

export default class NewsEdit extends React.Component {
  state = {
    Topic: "",
    Content: "",
    RenterEmail: null,
    newsId: null,
    isEdited: false
  };

  async componentDidMount() {
    const json = await DB.News.findOne(this.props.match.params.id)
    console.log(json)
    this.setState({ newsId: json.Id, RenterEmail: json.RenterEmail,  Topic: json.Topic, Content: json.Content });
  }


  async handleEditDB() {
    const response = await DB.News.edit(
     this.state.newsId   
    ,{
      Id: this.state.newsId,     
      RenterEmail: this.state.RenterEmail,
      Topic: this.state.Topic,
      Content: this.state.Content
    });

    if (response) {
      this.setState({ isEdited: true });
    }
  }

  handleTopic = event => {
    this.setState({ Topic: event.target.value });
  };
  handleContent = event => {
    this.setState({ Content: event.target.value });
  };


  render() {
    return this.state.isEdited ? (
      <Redirect to="/news" />
    ) : (
        this.state.newsId ? 
        <div>
          <h2>Edit News</h2>
          <br />

          <label>Email: </label>
          <input
            value={this.state.RenterEmail}
            type="text"
            disabled
          ></input>
          <br></br>

          <label>Topic: </label>
          <input
            value={this.state.Topic}
            type="text"
            onChange={this.handleTopic}
          ></input>
          <br></br>

          <label>Content: </label>
          <input
            value={this.state.Content}
            type="text"
            onChange={this.handleContent}
          ></input>
          <br></br>


          <Button onClick={() => this.handleEditDB()}>Save</Button>
        </div>
        :
        <h1>Loading...</h1>
      );
  }
}
