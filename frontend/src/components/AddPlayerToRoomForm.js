import React from 'react'

class AddPlayerToRoomForm extends React.Component {
  handleSubmit = () => {
    return null
  }
  render () {
    return(
    <form onSubmit={e => this.handleSubmit(e)}>
      <input type="text" name="handle" placeholder="handle..."/>
      <input type="text" name="nickname" placeholder="nickname..."/>
      <button type="submit">Add player</button>
    </form>
    )
  }
}

export default AddPlayerToRoomForm;
