import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {setAuthedUser} from '../actions/authedUser'
import {
  Button,
  Card,
  Image,
  Dropdown,
} from 'semantic-ui-react'


class LoginComponent extends Component {

  state = {
    loginUser: ''
  }

  handleChange = (e) => {
    let loginUser = e.target.innerText
    this.setState(() => ({
      loginUser
    }))
  }


  handleSubmit = (e) => {
    e.preventDefault()

    const { loginUser } = this.state

    const { dispatch, usersValues } = this.props
    let currentUser = usersValues.filter((u) => {
      return u.name === loginUser
    })[0]
    dispatch(setAuthedUser(currentUser.id))

  }


  render() {
    const {loginUser} = this.state
    const {usersValues} = this.props
    console.log('auth ', this.props.authedUser)
    if (this.props.authedUser !== null) {
      return <Redirect to='/'/>
    }
    let options = usersValues.map((u) => {
      return {
        key: u.id,
        text: u.name,
        value: u.id,
        image: {avatar: true, src: u.avatarURL.toString()}
      }
    })
    return (
        <div>
          <Card style={{margin: 'auto', width: '70%',
            textAlign: 'center', backgroundColor: '#F9FAFB'}}>
            <Card.Content>
              <Card.Header> Welcome to the Would You Rather App! </Card.Header>
              Please sign in to continue
            </Card.Content>
            <Image src={process.env.PUBLIC_URL + '/logo.png'} wrapped ui={false} />
            <Card.Content extra>
              <div className='ui header buttons'>
                <form onSubmit={this.handleSubmit}>
                  <Dropdown
                    onChange={this.handleChange}
                    placeholder='Select User'
                    fluid
                    selection
                    options={options}
                  />
                  <Button
                      style={{marginTop: '5%'}}
                      type='submit'
                      fluid
                      color='green'
                      >
                    Submit
                  </Button></form>
              </div>
            </Card.Content>
          </Card>
        </div>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    usersValues: Object.values(users)
  }
}

export default connect(mapStateToProps)(LoginComponent)
