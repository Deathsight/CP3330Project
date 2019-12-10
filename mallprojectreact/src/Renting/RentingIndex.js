import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Auth from "../auth";
import { Link } from "react-router-dom";
//material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {Paper,Radio,Tabs,Tab} from '@material-ui/core'

import { Button } from "react-bootstrap";


export default class RentingIndex extends React.Component {
  state = {
    Assets: [],
    User: null,
    SelectedAssets: [],
    type:"Store"
  };
  useStyles = {
    '@global': {
      body: {
        backgroundColor: 'white'
      },
    },
    container:{
        position: "relative",
        marginLeft:"5vw",
        paddingTop:"35px",
        paddingBottom: "25px",
        backgroundColor: "white",
        boxShadow:" 25px 25px 50px",
      },
      background:{
        zIndex: "2",
        position: "relative",
        backgroundImage:`url(https://w.wallhaven.cc/full/96/wallhaven-969w3d.jpg)`,
        minWidth: "100vw",
        minHeight: "94.4vh",
        float:"left"
      },
    paper: {
        paddingTop:"35px",
        paddingRight:"30px",
        paddingLeft:"30px",
        paddingBottom: "25px",
      
    },
    avatar: {
      margin: 1,
      backgroundColor: 'darkblue',
    },
    form: {
      marginTop: 3,
    },
    submit: {
      marginTop:4,
      marginRight:0,
      marginBottom:10
    },
  };

  switchType = (event, switchedType) => {
    this.setState({accountType: switchedType})
    console.log(switchedType)
  }
  handleSwitch = (type) => {
    this.setState({type})
  }
  async componentDidMount() {
    const Assets = await DB.Assets.findByQuery("getAssets");
    const User = await DB.Users.findByQuery("profile");
    this.setState({ Assets, User });
  }

  handleSelect = (Id) => {
    let temp = [Id]
    this.setState({ SelectedAssets: this.state.SelectedAssets.concat(temp) });
    console.log(this.state.SelectedAssets)
  };

  render() {
    return (
      <div>
              <Tabs
                value={this.state.type}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.switchType}
                style={{paddingTop:10, marginLeft:"40%"}}
                aria-label="disabled tabs example"
                
              >
                <Tab label="Store"  onClick={()=> this.handleSwitch("Store")}/>
                <Tab label="Theater" onClick={()=> this.handleSwitch("Theater")}/>
              </Tabs>
      {this.state.type === "Store" ?
<Container component="main">
        <CssBaseline />
        <Paper style={this.useStyles.paper}>
        <h2>Stores</h2>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Location Code</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Size</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {this.state.Assets ?
                    this.state.Assets.map(item => (
                      item.Type === "Store" ?
                <TableRow key={item.Id}>
                  <TableCell align="left">{item.LocationCode}</TableCell>
                  <TableCell align="left">{item.Description}</TableCell>
                  <TableCell align="left">{item.Store.Size}</TableCell>
                  <TableCell align="left">{item.Store.StorePM.Price}</TableCell>
        
                  <TableCell align="left">
                  {Auth.isLoggedIn() && (
                    <TableCell>
                      <Radio onClick={() => this.handleSelect(item.Id)}/>
                    </TableCell>
                  )}
                  </TableCell>
                  </TableRow>
                :null)):
                null}
          </TableBody>
        </Table>
        <Link to={`/renting/create/${this.state.SelectedAssets}`}><Button>Rent</Button></Link>
      </Paper>
      </Container>

: this.state.type === "Theater" ?
      <Container component="main">
        <CssBaseline />
        
        <Paper style={this.useStyles.paper}>
        <h2>Theaters</h2>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Location Code</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Size</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {this.state.Assets ?
                    this.state.Assets.map(item => (
                      item.Type === "Theater" ? (
                <TableRow key={item.Id}>
                  <TableCell align="left">{item.LocationCode}</TableCell>
                  <TableCell align="left">{item.Description}</TableCell>
                  <TableCell align="left">{item.Theater.Size}</TableCell>
                  <TableCell align="left">{item.Theater.TheaterPM.Price}</TableCell>
        
                  <TableCell align="left">
                  {Auth.isLoggedIn() && (
                    <TableCell>
                      <Radio onClick={() => this.handleSelect(item.Id)}/>
                    </TableCell>
                  )}
                  </TableCell>
                  </TableRow>
                      ) :
                null))
                : null}
          </TableBody>
        </Table>
        <Link to={`/renting/theaterRenting/${this.state.SelectedAssets}`}><Button>Create</Button></Link>
      </Paper>
      </Container>:null
      }
      </div>
    );
  }
}
