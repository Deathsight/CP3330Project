import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db"
import auth from "../auth"
import { post } from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import {Button,Dropdown} from "react-bootstrap";
import {Redirect } from "react-router-dom";
import {TextField,InputLabel,Grid,FormControl,Select } from '@material-ui/core';

export default class AdvertismentCreate extends React.Component {
  state = {
    Advertisment:null,
    
    isCreated: false
  };
  Types=["Sport","Electronic","Clothes","Accessories","Perfume","Entertaniment","Food"]
  componentDidMount = async () =>{
    if(auth.isLoggedIn()){
      const json = await DB.Advertisements.findOne(this.props.match.params.id)

      // the map is to take all items that has "Type" and add it to a temp array.
      //  jsonType.map(item =>
      //    tempArr.push(item.Type) 
      //  )
      // this line will take the array and remove duplicates.
      //  const uniqueTypes = Array.from(new Set(tempArr));

      this.setState({
        Advertisment : json
      })}
  }
  
  HandleEdit = async () =>{
    console.log("Advertisment : ", this.state.Advertisment)
    const response = await DB.Advertisements.edit(
      this.state.Advertisment.Id,
      {
       Id : this.state.Advertisment.Id,
       UserEmail : this.state.Advertisment.UserEmail,
       Type : this.state.Advertisment.Type,
       StartDateTime : this.state.Advertisment.StartDateTime,
       EndDateTime : this.state.Advertisment.EndDateTime,
       MediaContent : this.state.Advertisment.MediaContent,
       Description : this.state.Advertisment.Description,
       Status : this.state.Advertisment.Status
      })
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
   ///////////////////////////////////
  //////Uploading Profile Image//////
  ///////////////////////////////////

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
    this.setState({isCreated:true})
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
    console.log(e.target.files[0])
  }
  fileUpload(file){
    const url = `http://localhost:3000/api/UploadImages?type=Advertisment&id=${this.state.Advertisment.Id}`;
    const formData = new FormData();
    formData.append('file',file)
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    }
    console.log(url,formData,config)
    return  post(url, formData,config)
  }

  ///////////////////////////////////
  ///////////////////////////////////
  render(){

    return this.state.isCreated ? (
      <Redirect to="/profile/" />
    ) : (
        this.state.Advertisment ? 
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
        <form onSubmit={this.onFormSubmit}>
        <Container maxWidth="sm">
        
        <Grid container spacing={3} >
        <Grid container item xs={12} spacing={1}>
        <h2 style={{borderBottom:"1.8px solid lightgray"}}>Advertisment Edit</h2>
        </Grid>
        <Grid container item xs={6} spacing={1}>
            <TextField
              id="standard-basic"
              value={this.state.Advertisment.UserEmail}
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
          value={this.state.Advertisment.Type}
          onChange={this.handleType}
          inputProps={{
            name: 'Advertisment',
            id: 'outlined-age-native-simple',
          }}
        >
          {this.Types?
            this.Types.map( item =>
              <option value={item}>{item}</option>
            )
          :null}
        </Select>
        
        </FormControl>
        
        </Grid>


        <Grid container item xs={6} spacing={1}>
           <TextField
              id="datetime-local"
              type="datetime-local"
              label="Start Time"
              defaultValue="2017-05-24T10:30"
              value={this.state.Advertisment.StartDateTime}
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
              value={this.state.Advertisment.EndDateTime}
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleEndDateTime}
            />
        </Grid>
        <Grid container item xs={6} spacing={1}>
          <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows="4"
          column="4"
          value={this.state.Advertisment.Description}
          onChange={this.handleDescription}
          margin="normal"
          variant="outlined"
        />

        </Grid>
        <Grid container item xs={6} spacing={1}>
        <img src={`/Advertisment/${this.state.Advertisment.MediaContent}`} alt={'img'} style={{width:250}}/>

              <input
                  style={{padding:5,paddingBottom:10}}
                  name="file"
                  type="file"
                  onChange={this.onChange}
                />
            
          </Grid>
          <Grid item xs={12}>
          <Button type="submit" onClick={() => this.HandleEdit()}>Save</Button>
          <Button style={{float:"right"}} onClick={<Redirect  to={"/profile/"} />}>Back</Button>
          </Grid>
          </Grid>
          
          </Container>
          </form>
          </Paper>
          </div>
          </div>
        :
        <h1>Loading...</h1>
      );
  }
}
