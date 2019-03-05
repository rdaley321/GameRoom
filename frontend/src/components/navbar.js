import React from 'react'
import { connect } from 'react-redux'

class NavBar extends React.Component {
  render() {
    let rightSideNav
    if(this.props.user === null) {
      rightSideNav = (
        <>
          <button className='pointer' onClick={() => this.props.dispatch({type: 'NAV_TO_LOGIN'})}>Log In</button>
          <button className='pointer' onClick={() => this.props.dispatch({type: 'NAV_TO_SIGNUP'})}>Sign Up</button>
        </>
      )
    } else {
      rightSideNav = (
        <>
          <span style={{marginRight: '10px'}}>{this.props.user}</span>
          <button className='pointer' onClick={() => {
              this.props.dispatch({type: 'LOG_OUT'})
              this.props.dispatch({type: 'NAV_TO_HOME'})
            }}>Log Out</button>
        </>
      )
    }

    return (
      <div className="navbar">
        <h1 className='pointer' onClick={() => this.props.user === null ? this.props.dispatch({type: 'NAV_TO_HOME'})
          :
        this.props.dispatch({type: 'NAV_TO_DASHBOARD'})
        }>GAMEROOM</h1>
        <div className="invis-div">
        </div>
          {rightSideNav}
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
