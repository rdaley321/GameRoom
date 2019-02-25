import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './history'

import NavBar from './components/Navbar'
import CreateUserForm from './components/CreateUserForm'
import UserLoginForm from './components/UserLoginForm'
import UserDashboard from './components/UserDashboard'
import Home from './components/Home'


class App extends Component {

  state = {
    token: localStorage.getItem('token')
  }


  render() {
    return (
      <div className="App">
          <Router history={history}>
            <>
              <NavBar/>
              <Switch>
                <Route path='/dashboard' component={UserDashboard} />
                <Route path="/signup" component={CreateUserForm} />
                <Route path="/login" component={UserLoginForm} />
                <Route path="/" component={Home} />
              </Switch>
            < />
          </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(App)
