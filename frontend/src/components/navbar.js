import React from 'react'
import { connect } from 'react-redux'

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <h1>GameRoom NavBar</h1>
        <div>
          <button onClick={() => this.props.dispatch({type: 'NAV_TO_LOGIN'})}>Log In</button>
          <button onClick={() => this.props.dispatch({type: 'NAV_TO_SIGNUP'})}>Sign Up</button>
        </div>
      </div>
    )
  }
}

export default connect()(NavBar)
