import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
// slide show
import { Slide } from 'react-slideshow-image';
//react dom
import { Link } from "react-router-dom";
// react project
import Auth from "../auth";


export default class AdvertismentCreate extends React.Component {
  state = {
    User: null,
    isCreated: false
  };
  render(){
    const slideImages = [
      'images/slide_2.jpg',
      'images/slide_3.jpg',
      'images/slide_4.jpg'
    ];
     
    const properties = {
      duration: 5500,
      transitionDuration: 1200,
      infinite: true,
      indicators: false,
      arrows: false,
      onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
      }
    }
     
    const Slideshow = () => {
        return (
          <div className="slide-container" style={{width:"80%",marginLeft:"auto",marginRight:"auto",
          marginTop:"8.4vh"}}>
            <Slide {...properties}>
              <div className="each-slide">
                <div style={{'backgroundImage': `url(https://w.wallhaven.cc/full/vm/wallhaven-vm3w5l.jpg)`,height:"30.3vh"}}>
                </div>
              </div>
              <div className="each-slide">
                <div style={{'backgroundImage': `url(https://w.wallhaven.cc/full/yj/wallhaven-yjeg2x.png)`,height:"30.3vh"}}>
                </div>
              </div>
              <div className="each-slide">
                <div style={{'backgroundImage': `url(https://w.wallhaven.cc/full/3k/wallhaven-3kw6qd.png)`,height:"30.3vh"}}>
                </div>
              </div>
            </Slide>
          </div>
        )
    }
    return(
      <div >
        
        {
          Slideshow()
        }
        <div style={{textAlign:"center",marginTop:"auto",marginBottom:"auto"}}>
        <br />
        <br />
        <br />

                  <h2 >Advertise with intent </h2>
                  <h3>Ad solutions to help you find, attract, and engage millions of Skrrrr customers at every stage of their journey</h3>
        </div>
        <div style={{textAlign:"center"}}>
        <br />
        <br />

          <img  alt="Advertise img" src={"/Images/createAdvertisment2.png"} />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <img  alt="Advertise img" src={"/Images/createAdvertisment.png"} />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          { Auth.isLoggedIn() ?
            <Link  to="/advertisment/create"><Button variant="contained" color="primary">Get Started</Button></Link>
            :
            <Link to="/login"><Button variant="contained" color="secondary" >Get Started</Button></Link>
          }
               <br />
          <br />
          <br />
          <br />
          <br />

          </div>
      </div>
    )

  }
}