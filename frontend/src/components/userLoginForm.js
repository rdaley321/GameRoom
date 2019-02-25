import React from 'react'
import { connect } from 'react-redux';

class UserLoginForm extends React.Component {


    handleSubmit = (e) => {
      e.preventDefault()

      let data = {
        email: e.target.email.value,
        password: e.target.password.value
      }

      fetch('http://localhost:5000/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
        localStorage.token = res.token
        this.props.dispatch({type: 'LOG_IN', payload: data})
      })
      .catch(err => {
        return err
      })
    }

  render () {
    return (
      <div>
        <h2>Please Login</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text" name="email" placeholder="Email"/>
          <input type="password" name="password" placeholder="Password"/>
          <button type="submit" name="button">Log In</button>
        </form>
      </div>
    )
  }
}




export default connect()(UserLoginForm);
