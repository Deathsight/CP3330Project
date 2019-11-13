import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "./db.js";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";



export default class Email extends React.Component {
  state = {
    UploadImage: null
  };


  handleCreateDB = async () => {
    if (
      await DB.UploadImages.UploadImage({
        UploadImage: k
      })
    ) {
      console.log("Image has been sent");
    }
  };

  // handleUploadImage = event => {
  //   var k = event.target.value
  //   var j = k.split("\\");
  //   var k = j[2]
  //   this.setState({UploadImage: k})

  // };

  render() {
    return (
      <div>
        <h2>Emails Section</h2>
        <hr />
        <dl>
          <dt>Upload</dt>
          <dd>
          <form action="/upload/image" method="post">
            <input id="image-file" type="file" />
          </form>
          </dd>

        </dl>
        <p>
          <Button onClick={this.handleCreateDB}>Send</Button>
        </p>
      </div>
    );
  }
}
