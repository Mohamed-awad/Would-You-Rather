import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'
import {Redirect} from 'react-router-dom'

class Users extends Component {
  render() {

    if (this.props.authedUser === null) {
      return <Redirect to='/login'/>
    }

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


function mapStateToProps({ authedUser, users }) {
  return {
    userIds: Object.keys(users)
        .sort((a, b) => {
          return (Object.keys(users[b].answers).length + users[b].questions.length)
          - (Object.keys(users[a].answers).length + users[a].questions.length)
        }),
    authedUser
  }
}


export default connect(mapStateToProps)(Users)
