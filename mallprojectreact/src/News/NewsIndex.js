import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";

export default class NewsPublic extends React.Component {
  state = {
    News: []
  };

  async componentDidMount() {
    const json = await DB.Users.findByQuery("getNews");
    this.setState({ News: json });
  }

  render() {
    return (
      <div>
        <h2> My News</h2>
        <Link to={`/news/create/`}>Create</Link>
        <Table striped bordered hover>
          <thead>
            <tr>

              <th>Topic</th>
              <th>Content</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.News.map(item => (
              
              <tr key={item.Id}>

                <td>{item.Topic}</td>
                <td>{item.Content}</td>
                
                
              </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
