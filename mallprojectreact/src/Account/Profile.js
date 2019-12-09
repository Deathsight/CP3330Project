import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DB from "../db.js";
import Auth from "../auth.js";
import { Link, Redirect } from "react-router-dom";
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
import { Button } from "react-bootstrap";
import LockOutlinedIcon from '@material-ui/icons/Update';
import Typography from '@material-ui/core/Typography';
import { post } from 'axios';

export default class Profile extends React.Component {
  state = {
    User: null,
    Tickets: [],
    Name: "",
    Phone: "",
    ProfileImageSrc: "",
    editMode:false,
    refreshPage:false,
    time:0

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
        paddingTop:"35px",
        paddingRight:"30px",
        paddingLeft:"30px",
        paddingBottom: "25px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        float:'Right',
        clear:"both"
      
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
  async componentDidMount() {
    const json = await DB.Users.findByQuery("profile");
    this.setState({ User: json,Name:json.Name,Phone:json.Phone });
    console.log(json)
    if(this.state.User.Role.Name === "SupportAgent"){
      const json2 = await DB.SupportTickets.findAll();
      this.setState({ Tickets: json2 });
    }
    var date = new Date();
    this.setState({ TodayDate: date });
    if(json.Subscriptions.length !== 0){
      const json3 = await DB.Subscriptions.findOne(json.Subscriptions[0].Id)
      this.setState({ SubscriptionLastDay: json3.ExpiryDate });
      console.log(this.state.SubscriptionLastDay)
    }
    console.log(date.toLocaleDateString())
  
  }
  
  handleProfileEdit = () => {
    this.setState({editMode:!this.state.editMode})
  }

  handleDate = (item) => {
    const datetime = new Date(item)
    return `${datetime.toDateString()} - ${datetime.toLocaleTimeString()}`
  }
  async handleEditDB() {
    const response = await DB.Users.editProfile({
      Email: this.state.User.Email,
      Name: this.state.Name,
      Phone: this.state.Phone,
      RoleID: this.state.User.RoleID

    });

    if (response) {
      this.setState({ isEdited: true,refreshPage:true });
    }
    
  }

  handleName = event => {
    this.setState({ Name: event.target.value });
  };
  handlePhone = event => {
    this.setState({ Phone: event.target.value });
  };

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
    const url = `http://localhost:3000/api/UploadImages?type=Profile`;
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


  render() {
    return this.state.User ? (
        <div style={{backgroundImage:`url(https://w.wallhaven.cc/full/4o/wallhaven-4o75p5.jpg)`, minWidth:"99vh",
      minHeight:"94.2vh"
     }}>
      {this.state.refreshPage ? 
      window.location.reload()
      : null}
      
    <Grid container>
       
      <Grid item>
      
  { this.state.editMode ?
    <div style={{float:'left', marginLeft:10,marginTop:10}}>
  <form onSubmit={this.onFormSubmit}>
  <Paper style={this.useStyles.paper}>      
        <Avatar style={this.useStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          User Profile
          </Typography>
          <Tabs
            value={this.state.accountType}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.switchType}
            style={{paddingTop:10}}
            aria-label="disabled tabs example"
          >
          </Tabs>
          <div style={this.useStyles.form}>

            <Grid container spacing={1}>
            <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={this.state.Name}
                  type="text"
                  onChange={this.handleName}
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  value={this.state.Phone}
                  type="number"
                  onChange={this.handlePhone}
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={this.state.User.Email}
                  type="text"
                  disabled
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Role"
                  name="email"
                  value={this.state.User.Role.Name}
                  type="text"
                  disabled
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                Profile Image
              </Typography>
              </Grid>
              <Grid item xs={12}>
              <img 
                src={`/profileImages/${Auth.username()}.png`}
                onError={this.onError}
                alt="Profile Image" 
                style={{width:390,textAlign:"center"}}
              />
                
              </Grid>
              <input
                  style={{padding:5,paddingBottom:10}}
                  name="file"
                  type="file"
                  onChange={this.onChange}
                />
            </Grid>

            <Grid style={{float:"auto"}} item xs={12}>
             <Button  style={this.useStyles.submit} type="submit" onClick={() => this.handleEditDB()}>Save</Button> 
             <Button  style={{marginTop:4,marginRight:0,marginBottom:10,float:"right"}} onClick={this.handleProfileEdit} >Cancel</Button>
            </Grid>
          </div>
        </Paper> 
        </form> 
        </div>
        :
        <div style={{float:'left', marginLeft:10,marginTop:10}}>
        <Paper style={this.useStyles.paper}>      
        <Avatar style={this.useStyles.avatar} alt="Remy Sharp" src={`/profileImages/${Auth.username()}.png`} onClick={this.handleMenu} />
          <Typography component="h1" variant="h5">
           Profile Details
          </Typography>
          <Tabs
            value={this.state.accountType}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.switchType}
            style={{paddingTop:10}}
            aria-label="disabled tabs example"
          >
          </Tabs>
          <div style={this.useStyles.form}>

            <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={this.state.User.Name}
                  type="text"
                  disabled
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  value={this.state.User.Phone}
                  type="number"
                  disabled
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={this.state.User.Email}
                  type="text"
                  disabled
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Role"
                  name="email"
                  value={this.state.User.Role.Name}
                  type="text"
                  disabled
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button onClick={this.handleProfileEdit}>Edit Profile</Button>
          </div>
        </Paper>
        </div>
      }
       {this.state.User.Role.Name === "Renter" ? 
        this.state.User.Renter ?
       <div style={{float:'Right', marginLeft:10,marginTop:10}}>
      <Paper style={this.useStyles.paper}>      
          <Typography component="h1" variant="h5">
          Store Information
          </Typography>
          <Tabs
            value={this.state.accountType}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.switchType}
            style={{paddingTop:10}}
            aria-label="disabled tabs example"
          >
          </Tabs>
          <div style={this.useStyles.form}>

            <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="StoreName"
                  label="Store Name"
                  name="StoreName"
                  value={this.state.User.Renter.StoreName}
                  type="text"
                  disabled
                  autoComplete="StoreName"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="Type"
                  label="Type"
                  name="Type"
                  value={this.state.User.Renter.Type}
                  type="number"
                  disabled
                  autoComplete="Type"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="Description"
                  label="Description"
                  name="Description"
                  value={this.state.User.Renter.Description}
                  type="text"
                  disabled
                  autoComplete="Description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="Tokens"
                  label="Tokens"
                  name="Tokens"
                  value={this.state.User.Renter.Tokens}
                  type="text"
                  disabled
                  autoComplete="Tokens"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="Status"
                  label="Status"
                  name="Status"
                  value={this.state.User.Renter.Status}
                  type="text"
                  disabled
                  autoComplete="Status"
                />
              </Grid>
              
              <Grid item xs={12}>
              </Grid>
            </Grid>
          </div>
          <Grid xs={12}>
          <Link to={`/profile/complete`}><Button>Edit Renter Info </Button></Link>
          <Link style={{float:"Right"}} to={`/cleanings/create/`}><Button>Create Cleaning Request</Button></Link>
          </Grid>
          <Grid xs={12}>
          <Link  to={`/cleaningsPro/`}><Button>Cleaning Request Process</Button></Link> 
          </Grid>
        </Paper>
        </div>
        :<Redirect to={`/profile/complete/${this.state.User.Email}`}/>
        :null}
        </Grid >
        
        {this.state.User.Role.Name === "Renter" ? (
            
        <Grid item>
          <div>
            <br/>
            <h2 style={{color:"white"}}>My Rents</h2>

            <Paper >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Start Date/Time</TableCell>
              <TableCell align="left">End Date/Time</TableCell>
              <TableCell align="left">Assets</TableCell>
              <TableCell align="left">Total Price</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">ReferalCode</TableCell>
              <TableCell align="left">Security Company Name</TableCell>
              <TableCell align="left">Security Level</TableCell>
              <TableCell align="left">Renew Contract</TableCell>
              <TableCell align="left">End Contract</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {this.state.User.Renter ?
                    this.state.User.Renter.Rentings.map(item => (
                <TableRow key={item.Id}>
                  <TableCell align="left">{this.handleDate(item.StartDateTime)}</TableCell>
                  <TableCell align="left">{this.handleDate(item.EndDateTime)}</TableCell>
                <TableCell>
                  <TableHead>
                    <TableRow>
                      <TableCell>Asset Type</TableCell>
                      <TableCell>Asset Size</TableCell>
                      <TableCell>Asset Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                    {console.log(item.AssetRentings)}
                    {item.AssetRentings.map(item => (
                      <TableRow key={item.Id}>
                        <TableCell>{item.Asset.Type}</TableCell>
                        <TableCell>{item.Asset.Store.StorePM.Description}</TableCell>
                        <TableCell>{item.Asset.LocationCode}</TableCell>
                      </TableRow>
                    ))}
                  </TableHead>
                  </TableCell>
                  <TableCell align="left">{item.TotalPrice}</TableCell>
                  <TableCell align="left">{item.Status}</TableCell>
                  <TableCell align="left">{item.ReferalCode === null || item.ReferalCode === ""?
                  "No Code"
                :
                item.ReferalCode
                }
                 </TableCell>
                  <TableCell align="left">{item.Security.CompanyName}</TableCell>
                  <TableCell align="left">{item.Security.Level}</TableCell>
                  
                  <TableCell align="left">
                  <Link to={`/renting/renew/${item.Id}`}>Renew Contract</Link>
                  </TableCell>
                  <TableCell align="left">
                  <Link to={`/renting/end/${item.Id}`}>End Contract</Link>
                  </TableCell>
                  </TableRow>
                )):
                null}
          </TableBody>
        </Table>
      </Paper>
           


            <h2 style={{color:"white"}}>My Ads</h2>

            <Paper >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Start Date/Time</TableCell>
              <TableCell align="left">End Date/Time</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {this.state.User.Advertisements ?
                    this.state.User.Advertisements.map(item => (
                <TableRow key={item.Id}>
                  <TableCell align="left">{item.Type}</TableCell>
                  <TableCell align="left">{this.handleDate(item.StartDateTime)}</TableCell>
                  <TableCell align="left">{this.handleDate(item.EndDateTime)}</TableCell>
                  <TableCell align="left">{item.Description}</TableCell>    
                  <TableCell align="left">{item.Status}</TableCell>
                  <TableCell align="left">
                    <Link to={`/Advertisment/delete/${item.Id}`}>End Advertisment</Link>
                  </TableCell>
                  <TableCell align="left">
                    <Link to={`/Advertisment/edit/${item.Id}`}>Edit Advertisment</Link>
                  </TableCell>
                  </TableRow>
                )):
                null}
          </TableBody>
        </Table>
      </Paper>
          </div>
          </Grid>
          
        ) : null}
        {this.state.User.Role.Name === "SupportAgent" ? (
          this.state.Tickets ? (
    <Grid item xs >
          <div>
            <h2 style={{color:"white"}}>Tickets</h2>

            <Paper style={{width:"99%"}} >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Agent Name</TableCell>
              <TableCell align="left">User Email</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Priority</TableCell>
              <TableCell align="left">Details</TableCell>
              <TableCell align="left">Ticket</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {this.state.Tickets.map(item => (
                  item.Status === "open" ? ( 
                    <TableRow key={item.Id}>
                  <TableCell component="th" scope="row">
                  {item.User ? ( item.User.Name ):("")}
                </TableCell>
                  <TableCell align="left">{item.UserEmail}</TableCell>
                  <TableCell align="left">{this.handleDate(item.SubmitDate)}</TableCell>
                  <TableCell align="left">{item.Description}</TableCell>
                  <TableCell align="left">{item.Status}</TableCell>
                  <TableCell align="left">{item.STicketType.Name}</TableCell>
                  <TableCell align="left">{item.STicketType.Priority}</TableCell>
                  <TableCell align="left">
                  <td>
                    {
                      item.AgentEmail === Auth.username() ? (
                      <Link to={`/support/details/${item.Id}`}>Details</Link>
                      ):("Not Available")
                    }
                  </td>
                  </TableCell>
                  <TableCell align="left">
                  <td>
                    {item.AgentEmail === Auth.username() ? ( 
                      <Link to={`/support/close/${item.Id}`}>Close Ticket</Link>
                    ): item.AgentEmail ? ( "Ticket Taken" ):( <Link to={`/support/accept/${item.Id}`}>Take Ticket</Link>)
                    }
                  </td>
                  </TableCell>
                  </TableRow>
                  ):(null)
                ))}
          </TableBody>
        </Table>
      </Paper>
          </div>
          </Grid>
          ) : (
            <h2>Loading..</h2>
          )
         ) : this.state.User.Role.Name !== "SupportAgent" ? (
    
        <Grid item>
          <div>
            <h2 style={{color:"white"}}>My Support Tickets</h2>
            <Paper >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Topic</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">Close Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Details</TableCell>
              <TableCell align="left">Close Ticke</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {this.state.User.SupportTickets1 ?
                  this.state.User.SupportTickets1.map(item => (
                  item.Status === "open" ? ( 
                    <TableRow key={item.Id}>
                  <TableCell align="left">{item.STicketType.Name}</TableCell>
                  <TableCell align="left">{item.Description}</TableCell>
                  <TableCell align="left">{this.handleDate(item.SubmitDate)}</TableCell>
                  <TableCell align="left">{item.ClosedDate ? ( this.handleDate(item.ClosedDate)):("Waiting")}</TableCell>
                  <TableCell align="left">{item.Status}</TableCell>
                  <TableCell align="left">
                  <Link to={`/support/details/${item.Id}`}>Details</Link>
                  </TableCell>
                  <TableCell align="left">
                  {item.ClosedDate ? ( "Ticket Closed" ):( <Link to={`/support/close/${item.Id}`}>Close Ticket</Link>)} 
                  </TableCell>
                  </TableRow>
                  ):(null)
                )):
                null
                }
          </TableBody>
        </Table>
      </Paper>
          </div>
</Grid>
         ) 
         : (
        <h1>Nothing else for your role. Soooon</h1>

        )}
        </Grid>
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  }
}
