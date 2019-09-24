import React,{ Component } from 'react'
import { Register } from './Register'
import { BrowserRouter as Router,HashRouter, Route,Switch, Redirect, Link,NavLink} from 'react-router-dom'
import { Form, Col, FormGroup, Checkbox, Button, Card, ButtonGroup } from 'react-bootstrap';
import { Header } from '../components/Header/Header'

import axios from 'axios'

export class LoginForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      emailId: "",
      password:"",
      showRegistrationPage: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    let emailId = this.state.emailId
    let password = this.state.password

    axios.post('http://localhost:3000/sessions',{
      email: emailId,
      password: password
    },
    { withCredentials: true }
  ).then(response => {
      if(response.data.status === 'created') {
        this.props.handleSuccesfulAuth(response.data);
        this.props.history.push("/dashboard");
      }
      console.log("response login ", response.data);
    }).catch(error =>{
      console.log("login error ", error);
   })
  }

  handleClick() {
    this.props.history.push('/register');
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(event.target.name);
  }


 render() {
    return (
      <div>
        <br/>
        <br/>

        <Card style={{width: '24rem'}} className="mx-auto">
        <Card.Body>
          <Card.Title>Login! And Plan your next trip</Card.Title>
          <Card.Text>
          </Card.Text>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="emailId" value={this.state.emailId} onChange={this.handleChange} />
              <Form.Text className="text-muted">
               We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
           <Form.Group controlId="formBasicPassword">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
        </Form.Group>
       </Form>
       <div className="d-flex flex-column">
         <ButtonGroup size="sm" className="mt-3">
           <Button variant="primary" onClick={this.handleSubmit}>Login</Button>
           <Button variant="primary" onClick ={this.handleClick}>Sign Up</Button>
         </ButtonGroup>
       </div>
          </Card.Body>
        </Card>
    </div>
   );
}
}
