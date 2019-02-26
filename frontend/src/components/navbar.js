import React from 'react'
import { connect } from 'react-redux'

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <h1>GameRoom NavBar</h1>
          {this.props.user === null ?
            <>
              <button onClick={() => this.props.dispatch({type: 'NAV_TO_LOGIN'})}>Log In</button>
              <button onClick={() => this.props.dispatch({type: 'NAV_TO_SIGNUP'})}>Sign Up</button>
            </>
          :
              <button onClick={() => {
                  this.props.dispatch({type: 'LOG_OUT'})
                  this.props.dispatch({type: 'NAV_TO_HOME'})
                }}>Log Out</button>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser
  }
}

export default connect(mapStateToProps)(NavBar)
