import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'


class Users extends Component {
  render() {
    return (
        <div>
          <ul className='dashboard-list'>
            {this.props.userIds.map((id) => (
                <li key={id}>
                  <User id={id} />
                </li>
            ))}
          </ul>
        </div>
    )
  }
}


function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users)
        .sort((a, b) => {
          return (Object.keys(users[b].answers).length + users[b].questions.length)
          - (Object.keys(users[a].answers).length + users[a].questions.length)
        })
  }
}


export default connect(mapStateToProps)(Users)
