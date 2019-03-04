import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './history'

import NavBar from './components/Navbar'
import CreateUserForm from './components/CreateUserForm'
import UserLoginForm from './components/UserLoginForm'
import UserDashboard from './components/UserDashboard'
import Home from './components/Home'
import Room from './components/Room'
import PrivateRoute from './components/PrivateRoute'
import Chat from './components/Chat'


class App extends Component {
  render() {
    return (
      <div className="App">
          <Router history={history}>
            <>
              <NavBar/>
              <Switch>
                <PrivateRoute path="/room"><Room /></PrivateRoute>
                <PrivateRoute path="/dashboard"><UserDashboard /></PrivateRoute>
                <Route path="/signup" component={CreateUserForm} />
                <Route path="/login" component={UserLoginForm} />
                <Route path="/" component={Home} />
              </Switch>
              {this.props.currentUser && <Chat />}
            < />
          </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(App)
