import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Form, DateTimeField, FormControl,Col, FormGroup, Checkbox, Button, Card,InputGroup, Input,Toast } from 'react-bootstrap';
import { GoogleMap, Marker } from "react-google-maps"

const mapStyles = {
  width: '20%',
  height: '20%'
};

export class PreviousTripDetails extends Component {

    constructor(props) {
      super(props);

      this.state = {
        trips: []
      }

      this.fetchPreviousTrips = this.fetchPreviousTrips.bind(this);
    }

    componentDidMount() {
      this.fetchPreviousTrips();
    }

    fetchPreviousTrips() {
      axios.get('http://localhost:3000/previousTrips',{
      },{ withCredentials: true }
    ).then(response => {
      if(response.data.status === 'created') {
        console.log(response.data.trip);
        this.setState({
          trips: response.data.trip
        })
        }
      }).catch(error =>{
        console.log("login error ", error);
     })
}

    render() {
      return(
        <div >
          {this.state.trips.map(trip =>
            <div key={trip.id}>
              <br/>
              <Card style={{width: '50rem'}} className="mx-auto">
                <Card.Body>
                    <Card.Title>{trip.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">StartDate: {trip.startDate}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">EndDate: {trip.endDate}</Card.Subtitle>
                      <Card.Text>
                        {trip.address}
                    </Card.Text>
                </Card.Body>
              </Card>
                <br/>
            </div>
          )}
      </div>
      );
    }

}
