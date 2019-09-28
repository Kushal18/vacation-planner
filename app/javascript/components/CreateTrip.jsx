import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, DateTimeField, ButtonGroup, FormControl,Col, FormGroup, Checkbox, Button, Card,InputGroup, Input,Toast } from 'react-bootstrap';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId,getLatLng} from 'react-places-autocomplete';
/* global google */


import axios from 'axios'

export class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: "",
      startDate: "",
      endDate: "",
      location: "",
      tripSaveMessage: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
    console.log(place.formatted_address);
    this.setState({
      location: place.formatted_address
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]:event.target.value
    });

  }



  handleSubmit() {
    let trip = {
      tripName: this.state.tripName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      location: this.state.location
    }

    console.log(tripName,startDate,endDate,location);


  axios.post('http://localhost:3000/trips',{
      trip,
      id: this.props.user.id
    },
    { withCredentials: true }
  ).then(response => {
    if(response.data.status === 'created') {
      console.log("trip created ", response.data);
      this.setState({
        tripSaveMessage: "Yay! Your vacation details are saved, It's time to view your upcoming trip."
      })
      }
    }).catch(error =>{
      console.log("login error ", error);
   })
  }

 render() {
     return(
       <div>
         <br/>
         <br/>
         <Card
           style={{width: '50rem'}}
           className="mx-auto"
           bg="light">

           <Card.Title>
             <Toast className="mx-auto">
               <Toast.Header>
                 <strong className="mr-auto">
                   Enter Trip Details for your next Vacation!
                 </strong>
               </Toast.Header>
               <Toast.Body>
                 {this.state.tripSaveMessage}
               </Toast.Body>
             </Toast>
           </Card.Title>

         <Card.Body>


           <InputGroup className="mb-3">
             <InputGroup.Prepend>
               <InputGroup.Text id="basic-addon1">Name:</InputGroup.Text>
             </InputGroup.Prepend>
             <FormControl
               type="text"
               placeholder="Name of Your Trip"
               aria-label="Name of Your Trip"
               aria-describedby="basic-addon1"
               value={this.state.tripName}
               onChange = {this.handleChange}
               name="tripName"
               />
           </InputGroup>

           <InputGroup className="mb-3">
             <InputGroup.Prepend>
               <InputGroup.Text id="basic-addon1">StartDate:</InputGroup.Text>
             </InputGroup.Prepend>
             <FormControl
               placeholder="Enter start date in yyyy-mm-dd"
               aria-label="start date"
               aria-describedby="basic-addon1"
               value={this.state.startDate}
               onChange = {this.handleChange}
               name="startDate"
               />
           </InputGroup>

           <InputGroup className="mb-3">
             <InputGroup.Prepend>
               <InputGroup.Text id="basic-addon1">EndDate:</InputGroup.Text>
             </InputGroup.Prepend>
             <FormControl
               placeholder="Enter end date in yyyy-mm-dd"
               aria-label="end date"
               aria-describedby="basic-addon1"
               value={this.state.endDate}
               onChange = {this.handleChange}
               name="endDate"
               />
           </InputGroup>

           <InputGroup className="mb-3">
             <InputGroup.Prepend>
               <InputGroup.Text id="basic-addon1">Location:</InputGroup.Text>
             </InputGroup.Prepend>
             <FormControl
               ref={this.autocompleteInput}
               id="autocomplete"
               placeholder="Enter your address"
               type="text"/>
           </InputGroup>
           <div className="d-flex flex-column">
             <ButtonGroup size="sm" className="mt-3">
               <Button
                 variant="primary"
                 onClick ={this.handleSubmit}>
                 Create Trip
               </Button>
               <Button
                 variant="primary"
                 onClick ={this.props.previousTrips}>
                  Prevous Trips
               </Button>
               <Button
                 variant="primary"
                 onClick ={this.props.handleClick}>
                  Upcoming Trips
               </Button>
               <Button
                 variant="primary"
                 onClick ={this.props.handleLogout}>
                  Log Out
               </Button>
             </ButtonGroup>
           </div>
        </Card.Body>

         <Card.Footer className="text-muted" bg="light">Once created view your upcoming vacation Plan!</Card.Footer>
      </Card>
       </div>
    );
  }
}
