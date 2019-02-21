import React from 'react'

class CreateUserForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()

    let data = {
      email: e.target.email.value,
      password: e.target.password.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value
    }

    fetch('http://localhost:5000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => localStorage.token = res.token)
  }

  render () {
    return (
      <div>
        <h2>Please Create An Account</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text" name="email" placeholder="Email"/>
          <input type="password" name="password" placeholder="Password"/>
          <input type="text" name="firstName" placeholder="First Name"/>
          <input type="text" name="lastName" placeholder="Last Name"/>
          <button type="submit" name="button">Create</button>
        </form>
      </div>
    )
  }
}

export default CreateUserForm;
