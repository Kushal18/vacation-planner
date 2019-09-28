import React,{ Component } from 'react'
import { Form, Col, FormGroup, Checkbox, Button, Card } from 'react-bootstrap';

import axios from 'axios'

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email : "",
        password: "",
        name: "",
        gender: "",
        location: "",
        error: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(event.target.value);
  }

  handleSubmit(event) {

    let user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      sex: this.state.gender,
      address: this.state.location
    }




    axios.post('http://localhost:3000/registrations',{
        user
    },
    { withCredentials: true }
  ).then(response => {
    if(response.data.status === 'created') {
        this.props.handleSuccesfulAuth(response.data);
        this.props.history.push("/dashboard");
      }
   }).catch(error => {
     this.setState({
       error: error.response.data
     });
   })
 }

  render() {
      return (
        <div>
          <br/>
          <br/>
        <Card style={{width: '24rem'}} className="mx-auto">
        <Card.Body>
          <Card.Title>Sign Up here!</Card.Title>
          <Card.Text>
          </Card.Text>
          <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Your Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Your Full Name" name="name"  value={this.state.name} onChange={this.handleChange} />
         </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
          <Form.Check name="gender" onChange={this.handleChange} value={this.state.gender} type="radio" value="male" label="Male" />
          <Form.Check name="gender" onChange={this.handleChange} value={this.state.gender} type="radio" value="female" label="Female" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
           <Form.Label>Enter Your City</Form.Label>
           <Form.Control type="text" placeholder="City" name="location" value={this.state.location} onChange={this.handleChange} />
          </Form.Group>
         </Form>
        <Button variant="primary" onClick ={this.handleSubmit}>Sign Up</Button>
        </Card.Body>
        <Card.Footer>
          {this.state.error.map((error,idx) =>
            <Alert key={idx} variant={variant}>
                error
            </Alert>
          )}
        </Card.Footer>
        </Card>
        </div>
      );
  }
}
