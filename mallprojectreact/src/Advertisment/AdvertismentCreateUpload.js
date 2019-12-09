import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db"
import auth from "../auth"
import Auth from "../auth"
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {Button} from "react-bootstrap";
import {Redirect } from "react-router-dom";


//material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper,Tabs} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/Update';
import Typography from '@material-ui/core/Typography';
import { post } from 'axios';

export default class AdvertismentCreateUpload extends React.Component {
  state = {
    isCreated: false
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
        width:"450px",
        position: "relative",
        paddingTop:"35px",
        paddingRight:"30px",
        paddingLeft:"30px",
        paddingBottom: "25px",
        boxShadow:" 10px 10px 10px",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: 1,
      backgroundColor: 'darkblue',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: 3,
    },
    submit: {
      marginTop:4,
      marginRight:0,
      marginBottom:10
    },
  };
  componentDidMount = async () =>{

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
    const url = 'http://localhost:3000/api/UploadImages?type=Advertisment';
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
        <div>
        <Paper style={this.useStyles.paper}>      
          <Avatar style={this.useStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>    
          <form onSubmit={this.onFormSubmit}>
              <input
                  style={{padding:5,paddingBottom:10}}
                  name="file"
                  type="file"
                  onChange={this.onChange}
                />
             <Button  style={this.useStyles.submit} type="submit" >Save</Button> 
             </form>
        </Paper> 
        </div>

      );
  }
}
