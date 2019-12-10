import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Slide } from 'react-slideshow-image';
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

//material-UI
import {Grid,Paper, Divider} from '@material-ui/core'

export default class Home extends React.Component {

  state={
    featuredPosts: [
      {
        title: "Our Stores",
        image: "/images/outStoresBg.jpg",
        description:
          "We gather friends together on shopping sprees gone wild.",
        href: "./stores"
      },
      {
        title: "Advertisment",
        image: "/images/adv.png",
        description:
          "Read the Advertisments in skrrrrr mall",
        href: "./advertisment/"
      },
      {
        title: "Rent With Us",
        image: "/images/rent1.png",
        description:
          "Come and rent with us!",
        href: "./renting/"
      },
      {
        title: "News",
        image: "/images/news.png",
        description:
          "Read the latest news updates on events and announcements",
        href: "./news/public/"
      },
      {
        title: "Parking",
        image: "/images/parking.png",
        description:
          "Parking Made Easy",
        href: "./Parking/"
      },
      {
        title: "Subscription",
        image: "/images/sub.png",
        description:
          "Get our Premium Subscription,  You'll have Premium Services until the date your subscription ends.",
        href: "./Subscription"
      }
    ]
  };
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
        <div className="slide-container" style={{ width:"100%",marginLeft:"auto",marginRight:"auto",
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
            
              <Divider/>
              </center>
              <img
              src="./images/mall.png"
              alt=""
              width="1225"
              height="550"
              style={{ float: "center" }}
            />
            <Grid container spacing={4}>
                {this.state.featuredPosts.map(post => (
                  <Grid item key={post.title} xs={12} md={6}>
                    <CardActionArea component="a">
                      <Card
                        style={{
                          display: "flex"
                        }}
                      >
                        <div
                          style={{
                            flex: 1
                          }}
                        >
                          <CardContent>
                            <Typography component="h2" variant="h5">
                              {post.title}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {post.date}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                              {post.description}
                            </Typography>
                            <Typography variant="subtitle1" color="secondery">
                              <Button
                                variant="contained"
                                color="primary"
                                style={{ width: "4vw", hight: "4vh" }}
                                href={post.href}
                              >
                                click
                              </Button>
                            </Typography>
                          </CardContent>
                        </div>

                        <Hidden xsDown>
                          <React.Fragment>
                            <CardMedia
                              style={{
                                width: 160
                              }}
                              position="relative"
                              image={post.image}
                              title="Image title"
                            />
                          </React.Fragment>
                        </Hidden>
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
              </Grid>
        </Paper>
      </Grid>

      
      </div>
    );
  }
}
