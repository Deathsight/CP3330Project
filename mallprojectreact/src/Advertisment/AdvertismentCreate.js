import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db"
import auth from "../auth"
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import {Button,Dropdown} from "react-bootstrap";
import {Redirect } from "react-router-dom";
import {TextField,InputLabel,Grid,FormControl,Select } from '@material-ui/core';

export default class AdvertismentCreate extends React.Component {
  state = {
    Advertisment:{
      UserEmail: "",
      Type: "Sports wear",
      StartDateTime: "",
      EndDateTime: "",
      MediaContent: "Empty",
      Description: "",
      Status: "waitingApproval",
    },
    Types:["Sport","Electronic","Clothes","Accessoris","Perfume","Entertaniment","Food"],
    User: null,
    isCreated: false
  };
  componentDidMount = async () =>{
    if(auth.isLoggedIn()){
      const json = await DB.Users.findByQuery("profile");
      const temp = this.state.Advertisment;
      temp.UserEmail = auth.username();

      // the map is to take all items that has "Type" and add it to a temp array.
      //  jsonType.map(item =>
      //    tempArr.push(item.Type) 
      //  )
      // this line will take the array and remove duplicates.
      //  const uniqueTypes = Array.from(new Set(tempArr));

      this.setState({
        User : json,
        Advertisment : temp
      })}
  }
  
  HandleCreate = async () =>{
    console.log("Advertisment : ", this.state.Advertisment)
    const response = await DB.Advertisements.create(
      this.state.Advertisment
    )
    if(response){
      this.setState({isCreated : true})
    }
  }

  handleType = event => {
    console.log("type ", event.target.value)
    const temp = this.state.Advertisment
    temp.Type = event.target.value
    this.setState({Advertisment : temp})
  }
  handleStartDateTime = event => {
    const temp = this.state.Advertisment;
    temp.StartDateTime = event.target.value;
    this.setState({Advertisment : temp})
  }
  handleEndDateTime = event => {
    const temp = this.state.Advertisment;
    temp.EndDateTime = event.target.value;
    this.setState({Advertisment : temp})
  }
  handleDescription = event => {
    const temp = this.state.Advertisment;
    temp.Description = event.target.value;
    this.setState({Advertisment : temp})
  }
  handleStatus = event => {
    const temp = this.state.Advertisment;
    temp.Status = event.target.value;
    this.setState({Advertisment : temp})
  } 

 
  render(){

    return this.state.isCreated ? (
      <Redirect to="/advertisment/create/upload" />
    ) : (
        this.state.User ? 
        <div style={{  
        backgroundImage:`url(https://w.wallhaven.cc/full/4y/wallhaven-4yd13k.jpg)`,
        paddingTop:"16.8%",
        paddingBottom:"11.5%",
        width:"100%",

        }}>
        <div>
          <div style={{  position: 'absolute',  left: '0px', top: '0px',zIndex: -1, backgroundImage:`url(https://w.wallhaven.cc/full/4y/wallhaven-4yd13k.jpg)`}}></div>
        <Paper style={{marginLeft:"auto",marginRight:"auto",width:"550px", height:"530px",boxShadow:" 25px 25px 50px"}}>
        <CssBaseline />
        <Container maxWidth="sm">
        
        <Grid container spacing={3} >
        <Grid container item xs={12} spacing={1}>
        <h2 style={{borderBottom:"1.8px solid lightgray"}}>Advertisement Create</h2>
        </Grid>
        <Grid container item xs={6} spacing={1}>
            <TextField
              id="standard-basic"
              value={this.state.User.Email}
              label="Email"
              margin="normal"
              disabled
            />   
        </Grid>
        
        <Grid container item xs={6}>

        <FormControl variant="outlined">
        <InputLabel style={{marginTop:10}} shrink htmlFor="outlined-age-native-simple">
        Type
        </InputLabel>
        <Select
          native
          value={this.state.Types[0].Type}
          onChange={this.handleType}
          inputProps={{
            name: 'Advertisment',
            id: 'outlined-age-native-simple',
          }}
        >
          {this.state.Types.map( item =>
              <option value={item}>{item}</option>
            )}
        </Select>
        
        </FormControl>
        
        </Grid>


        <Grid container item xs={6} spacing={1}>
           <TextField
              id="datetime-local"
              type="datetime-local"
              label="Start Time"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleStartDateTime}
            />
        </Grid>
        <Grid container item xs={6} spacing={1}>
            <TextField
              id="datetime-local"
              type="datetime-local"
              label="End Time"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleEndDateTime}
            />

        </Grid>
        <Grid container item xs={12} spacing={1}>
          <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows="4"
          column="4"
          onChange={this.handleDescription}
          margin="normal"
          variant="outlined"
        />

        </Grid>
          <Button onClick={() => this.HandleCreate()}>Next</Button>
         
          </Grid>
          
          </Container>
          </Paper>
          </div>
          </div>
        :
        <h1>Loading...</h1>
      );
  }
}
