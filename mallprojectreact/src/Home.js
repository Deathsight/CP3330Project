import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Slide } from 'react-slideshow-image';

//material-UI
import {Grid,Paper, Divider} from '@material-ui/core'

export default class Home extends React.Component {

  render() {
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
    const slideImages = [
      'images/slide_2.jpg',
      'images/slide_3.jpg',
      'images/slide_4.jpg'
    ];
    const Slideshow = () => {
      return (
        <div className="slide-container" style={{width:"100%",marginLeft:"auto",marginRight:"auto",
        marginTop:"6.4vh"}}>
          <Slide {...properties}>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(https://w.wallhaven.cc/full/vm/wallhaven-vm3w5l.jpg)`,height:"50.3vh"}}>
              </div>
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(https://w.wallhaven.cc/full/yj/wallhaven-yjeg2x.png)`,height:"50.3vh"}}>
              </div>
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(https://w.wallhaven.cc/full/3k/wallhaven-3kw6qd.png)`,height:"50.3vh"}}>
              </div>
            </div>
          </Slide>
        </div>
      )
  }
    return (
      <div>
      <div style={{zIndex:0}}>
       { Slideshow() }
      </div>
      <Grid container style={{}}>
        <Paper style={{width:'70%',marginLeft:"Auto",marginRight:"Auto",marginTop:"-25%",zIndex:1, padding:55}}>
            <center>
              <h1>Skrrrrrr Mall</h1>
              </center>
              <Divider/>
            <Grid container>
              <Grid item xs={7} style={{backgroundColor:'lightgray',margin:5 ,zIndex:3,float:'Auto'}}>
                  <h1>Our Stores !</h1>
                  <img src="/images/outStoresBg.jpg" alt="image" style={{width:300,zIndex:2,top:0,left:0}}/>
              </Grid>
              <Grid  item xs={4} style={{backgroundColor:'lightgray',margin:5}}>
                  <h1>Advertisment</h1>
              </Grid>
              <Grid  item xs={7} style={{backgroundColor:'lightgray',margin:5}}>
              <h1>Rent With Us</h1>
              </Grid>
              <Grid  item xs={4} style={{backgroundColor:'lightgray',margin:5}}>
              <h1>Events</h1>
              </Grid>
              <Grid item  xs={7} style={{backgroundColor:'lightgray',margin:5}}>
              <h1>News</h1>
              </Grid>
              <Grid item  xs={4} style={{backgroundColor:'lightgray',margin:5}}>
              <h1>Advertisment</h1>
              </Grid>
            </Grid>
            
        </Paper>
      </Grid>
      </div>
    );
  }
}
