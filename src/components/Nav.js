import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from "semantic-ui-react";
import {setAuthedUser} from '../actions/authedUser'

class Nav extends Component {

  logout = () => {
    const {dispatch} = this.props
    dispatch(setAuthedUser(null))
  }

  render() {
    const {currentUser} = this.props
    return (
        <nav className='nav'>
          <ul>
            <li style={{
              paddingTop: '2.3%'
            }}>
              <NavLink to='/' exact activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li style={{
              paddingTop: '2.3%'
            }}>
              <NavLink to='/add' exact activeClassName='active'>
                New Question
              </NavLink>
            </li>
            <li style={{
              paddingTop: '2.3%',
              marginRight: '30%'
            }}>
              <NavLink to='/leaderboard' exact activeClassName='active'>
                Leader Board
              </NavLink>
            </li>
          {
            this.props.authedUser == null
                ? null
                : <li>
                  <ul>
                    <li>
                      <strong style={{
                        fontSize: '20px',
                        marginRight: '20px'
                      }}>Hello, {currentUser.name}</strong>
                      <img style={{
                        verticalAlign: 'middle',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%'
                      }} src={currentUser.avatarURL} />
                    </li>
                    <li style={{
                      paddingTop: '4%'
                    }}>
                      <Button basic onClick={this.logout}>Logout</Button>
                    </li>
                </ul></li>
          }
          </ul>
        </nav>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    currentUser: authedUser
      ? users[authedUser]
      :null
  }
}

export default connect(mapStateToProps)(Nav)
