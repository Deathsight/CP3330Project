import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";

export default class NewsPublic extends React.Component {
  state = {
    News: [],
    Role: ""
  };

  componentDidMount = async () =>{
    const json = await DB.News.findAll();
    this.setState({ News: json });

    const json2 = await DB.Users.findByQuery("getRole");
    this.setState({ Role: json2 });
  }

  render() {
    return (
      <div>
          {this.state.Role === "Renter" ? ( <Link to={`/news/index`}>My News</Link> ) : ( null )}
        <h2>News</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Renter Email</th>
              <th>Topic</th>
              <th>Content</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.News.map(item => (
              
              <tr key={item.Id}>
                <td>{item.RenterEmail}</td>
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
