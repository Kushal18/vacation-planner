import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Form, DateTimeField, FormControl,Col, FormGroup, Checkbox, Button, Card,InputGroup, Input,Toast } from 'react-bootstrap';

const API_KEY = "f9cae2b6a1f3b8dd51b0cbcb9c6da16f"


export class TripDetails extends Component {
    constructor(props) {
      super(props);
    }

  render() {
    getWeather = async (e,data) => {
      e.preventDefault();
      const lat = data.latitude;
      const lon = data.longitude;
      const api_call = await
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat={lat}1&lon={lon}&appid={API_KEY}`);
      const data = await api_call.json();
      console.log(data);
    }
  }
}
