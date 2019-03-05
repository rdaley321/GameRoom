import React from 'react'
import { connect } from 'react-redux';

class CreateUserForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()

    let data = {
      email: e.target.email.value,
      password: e.target.password.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value
    }

    fetch('http://localhost:8080/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if(!res.error) {
      localStorage.token = res.token
      this.props.dispatch({type: 'LOG_IN', payload: data.email})
      this.props.dispatch({type: 'NAV_TO_DASHBOARD'})
      }
    })
  }

  render () {
    return (
      <div className="llama-bg">
        <div>
          <div className="form-bg">
            <h2 className="title">Create An Account</h2>
            <form className="form" onSubmit={e => this.handleSubmit(e)}>
              <input type="text" name="email" placeholder="Email"/>
              <input type="password" name="password" placeholder="Password"/>
              <input type="text" name="firstName" placeholder="First Name"/>
              <input type="text" name="lastName" placeholder="Last Name"/>
              <button type="submit" name="button">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(CreateUserForm)
