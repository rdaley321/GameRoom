import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar'
import CreateUserForm from './components/createUserForm'
import UserLoginForm from './components/userLoginForm'

class App extends Component {

  constructor(){
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:5000/api/users')
      .then(response => {
        return response.json();
      }).then(data => {
        let users = data.map((user) => {
          return(
            <div key={user._id}>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <hr/>
            </div>
          )
        })
        this.setState({users: users})
      })
  }

  render() {
    return (
      <div className="App">
        <NavBar/>
        <CreateUserForm />
        <UserLoginForm />
        <p>All Users:</p>
        <hr/>
        {this.state.users}
      </div>
    );
  }
}

export default App;
