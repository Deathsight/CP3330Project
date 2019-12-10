import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DB from "../db.js";
import Auth from "../auth";
import Button from "react-bootstrap/Button";


export default class RenterLike extends React.Component {
  state = {
    Renters: [],
    RenterEmail: null,
    isCreated: false,
    UserEmail: null,
    like: false,
    favorite: false,
    count: 0
  };

  componentDidMount = async () =>{
    const json = await DB.Renters.findAll();
    this.setState({ Renters: json });

  }

  async handleLike (Email) {
    if (await DB.Likes.create({ UserEmail: Auth.username(), RenterEmail: Email })) { 
        this.setState({ isCreated: true });
      } 
   };

   async handleFav (Email) {
        if (await DB.Favorites.create({ UserEmail: Auth.username(), RenterEmail: Email })) { 
            this.setState({ isCreated: true });
        } 
      };
    
  
     handleClick = event => {
        this.setState({ like: !this.state.like});
      }

     handleClickf = event => {
      this.setState({ favorite: !this.state.favorite});
     }
 
     go () {
     
      this.setState (  prevState => {
        return {
          count : prevState.count + 1
        }
      })
    } 

  render() {
    let buttonText = this.state.like? 'Unlike': 'Like';
    let buttonText2 = this.state.favorite? 'UnFavorite': 'Favorite';

    return   this.state.isCreated ? (
         <div>Loading...</div>
             ) : ( 
         <div>
         
        <h2>Stores page</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Type</th>
              <th>Description</th>
              {Auth.isLoggedIn() && <th>Likes & Favorite</th>}
           
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.Renters.map(item =>  (
              item.Status === "Approved" ?
              <tr key={item.Id}>
                <td>{item.StoreName}</td>
                <td>{item.Type}</td>
                <td>{item.Description}</td>


                {Auth.isLoggedIn() && (
                  <td>
                 
                 {this.state.count}  <Button onClick={() => this.handleLike(item.Email) && this.handleClick() 
                                              && this.go() }>{buttonText}</Button>
                     <Button onClick={() => this.handleFav(item.Email) && this.handleClickf()  }>{buttonText2}</Button>

                  </td>
                  
                )}
                
              </tr>
            :
             null) 
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
