import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './header.css'
import { Form, Col, FormControl,FormGroup, Checkbox, Button, Card,Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg" >
          <Navbar.Brand href="#home">Vacation-Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">View Your Previous Trips</Nav.Link>
              <Nav.Link>View Your upcoming Trips</Nav.Link>
              <NavDropdown
                title="Dropdown"
                id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
