import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Form, DateTimeField, FormControl,Col, FormGroup, Checkbox, Button, Card,InputGroup, Input,Toast } from 'react-bootstrap';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"

const mapStyles = {
  width: '20%',
  height: '20%'
};

function Map() {
  return <GoogleMap
    defaultZoom={10}
    defaultCenter={{lat: 45.433,lng:-75.6888}}
    />
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export class LocationDetails extends Component {

    constructor(props) {
      super(props);
    }

    render() {
      return(
        <div style={{width:'100vw',height:'100vh'}}>
          <WrappedMap
            googleMapUrl = "https://maps.googleapis.com/maps/api/js?key={API_KEY}&libraries=places,drawing"
            loadingElement={<div style={{ height: "100%"}} />}
            containerElement={<div style={{ height: "100%"}} />}
            mapElement={<div style={{ height: "100%"}}/>}
            />
        </div>

      );
    }

}
