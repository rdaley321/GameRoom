import React from 'react'
import { connect } from 'react-redux'

class UserDashboard extends React.Component {
  render () {
    return (
      <div>
        <h1>Welcome {this.props.currentUser}</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(UserDashboard);
