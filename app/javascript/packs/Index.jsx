// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { LoginForm } from '../components/LoginForm'
import { DashBoard } from '../components/DashBoard'
import { Register } from '../components/Register'
import { NextTrip } from '../components/NextTrip'
import { LocationDetails } from '../components/LocationDetails'
import { Header } from '../components/Header/Header'
import { PreviousTripDetails } from '../components/PreviousTripDetails'

import axios from 'axios'
import { HashRouter, Route,Switch, Redirect} from 'react-router-dom'

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

export class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }
    this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this);
  }

handleSuccesfulAuth(data) {
    console.log(data.user);
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user : data.user
    })
  }

  render() {
    return (
      <div>
        <Header />
         <HashRouter history= { history }>
           <Switch>
            <Route
            exact
            path="/"
            render={props => (
            <LoginForm {...props} loggedInStatus={this.state.loggedInStatus} handleSuccesfulAuth={this.handleSuccesfulAuth}/>
            )}/>
            <Route
            path="/register"
            render={props => (
            <Register {...props} loggedInStatus={this.state.loggedInStatus} handleSuccesfulAuth={this.handleSuccesfulAuth}/>
            )}/>
            <Route
            path="/dashboard"
            render={props => (
            <DashBoard {...props} user={this.state.user} handleLogout = {this.handleLogout} handleSuccesfulAuth={this.handleSuccesfulAuth}/>
            )}/>
            <Route
            path="/upcomingTrips"
            render={props => (
            <NextTrip {...props} user={this.state.user} handleSuccesfulAuth={this.handleSuccesfulAuth}/>
            )}/>
            <Route
            path="/previousTrips"
            render={props => (
            <PreviousTripDetails {...props} user={this.state.user} handleSuccesfulAuth={this.handleSuccesfulAuth}/>
            )}/>
            <Route
            path="/locationDetail"
            render={props => (
            <LocationDetails {...props} user={this.state.user} handleSuccesfulAuth={this.handleSuccesfulAuth}/>
            )}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index/>,
    document.body.appendChild(document.createElement('div')),
  )
})
