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

export class NextTrip extends Component {

    constructor(props) {
      super(props);

      this.state = {
        trips: []
      }

      this.fetchUpcomingTrips = this.fetchUpcomingTrips.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.props.history.push("/locationDetail");
    }

    componentDidMount() {
      this.fetchUpcomingTrips();
    }

    fetchUpcomingTrips() {
      const trip = "upcoming"
      axios.get('http://localhost:3000/allTrips',{
        trip
      },{ withCredentials: true }
    ).then(response => {
      if(response.data.status === 'created') {
        //console.log("trip created ", response.data);
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
                        Click on View details to know about the weather conditions and nearBy places in {trip.address}
                    </Card.Text>
                </Card.Body>
                 <Card.Footer className="text-muted" bg="light">
                   <Button variant="light" onClick ={this.handleClick}>
                     Details.
                   </Button>
                 </Card.Footer>
              </Card>
                <br/>
            </div>
          )}
      </div>
      );
    }

}
