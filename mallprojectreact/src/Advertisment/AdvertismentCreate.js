import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db"
import auth from "../auth"
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import {Button} from "react-bootstrap";
import {Redirect } from "react-router-dom";
import {TextField,InputLabel,Grid,NativeSelect } from '@material-ui/core';

export default class AdvertismentCreate extends React.Component {
  state = {
    Advertisment:{
      UserEmail: "",
      Type: "Sports wear",
      StartDateTime: "",
      EndDateTime: "",
      MediaContent: "",
      Description: "",
      Status: "waitingApproval",
    },
    Types:[],
    User: null,
    isCreated: false
  };
  componentDidMount = async () =>{
    if(auth.isLoggedIn()){
      const json = await DB.Users.findByQuery("profile");
      const jsonType = await DB.Renters.findAll();
      const temp = this.state.Advertisment;
      const tempArr = [];
      temp.UserEmail = json.Email;

      // the map is to take all items that has "Type" and add it to a temp array.
        jsonType.map(item =>
          tempArr.push(item.Type) 
        )
      // this line will take the array and remove duplicates.
        const uniqueTypes = Array.from(new Set(tempArr));

      this.setState({
        User : json,
        Advertisment : temp,
        Types: uniqueTypes
      })}
  }
  
  HandleCreate = async () =>{
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
    temp.Types = event.target.value
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
  handleMediaContent = event => {
    const temp = this.state.Advertisment;
    temp.MediaContent = event.target.value;
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
      <Redirect to="/advertisment/" />
    ) : (
        this.state.User ? 
        <React.Fragment>
          <Paper style={{width:"550px", height:"530px"}}>
        <CssBaseline />
        <Container maxWidth="sm">
        
        <Grid container spacing={3} style={{PaddingTop:"5%"}}>
        <Grid container item xs={12} spacing={1}>
        <h2 style={{borderBottom:"1.8px solid lightgray",width:"100%"}}>Advertisment</h2>
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
        <Grid container item xs={6} spacing={1}>

        <InputLabel shrink htmlFor="age-native-label-placeholder">
        Type
        </InputLabel>
        <NativeSelect
          value={this.state.Types[0].Type}
          onChange={this.handleType}
          inputProps={{
            name: 'Advertisment',
            id: 'age-native-label-placeholder',
          }}
        >
          {this.state.Types.map( item =>
            <option value={item}>{item}</option>
          )}
        </NativeSelect>


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
              id="standard-basic"
              onChange={this.handleMediaContent}
              label="Attach Media"
              margin="normal"
            />
                      
          
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows="4"
          onChange={this.handleDescription}
          margin="normal"
          variant="outlined"
        />
                  
          
        </Grid>
          <Button onClick={() => this.HandleCreate()}>Save</Button>
         
          </Grid>
          
          </Container>
          </Paper>
          </React.Fragment>
        :
        <h1>Loading...</h1>
      );
  }
}
