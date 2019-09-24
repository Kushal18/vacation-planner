import React,{ Component } from 'react'
import { MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBModalFooter,MDBIcon,MDBCardHeader,MDBBtn,MDBInput } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css'
import { CreateTrip } from '../components/CreateTrip'

import axios from 'axios'


export class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.previousTrips = this.previousTrips.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    axios.delete("http://localhost:3000/logout",{
    },
    { withCredentials: true }
  ).then(response => {
      this.props.history.push("/");
    }).catch(error =>{
      console.log("logout error ", error);
   })
}

  handleClick() {
    this.props.history.push("/upcomingTrips");
  }

  previousTrips() {
    console.log("here");
    this.props.history.push("/previousTrips");
  }

  render() {
    return (
      <div>
        <CreateTrip handleLogout = {this.handleLogout} previousTrips={this.previousTrips} handleClick={this.handleClick} user={this.props.user}/>
      </div>
    );
  }
}
