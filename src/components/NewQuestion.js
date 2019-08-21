import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAddQuestion} from "../actions/questions"
import {Redirect} from 'react-router-dom'
import {
  Button,
  Card,
  Form,
  Divider
} from 'semantic-ui-react'


class NewQuestion extends Component {

  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  }

  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value

    this.setState(() => ({
      optionOne
    }))
  }

  handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value

    this.setState(() => ({
      optionTwo
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }))
  }

  render() {

    if (this.props.authedUser === null) {
      return <Redirect to='/login'/>
    }

    const {optionOne, optionTwo, toHome} = this.state

    if (toHome === true) {
      return <Redirect to='/'/>
    }

    return (
        <div>
          <Card style={{margin: 'auto', width: '70%',
            textAlign: 'center', backgroundColor: '#F9FAFB'}}>
            <Card.Content>
              <Card.Header> Create New Question </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <div className='ui header buttons'>
                <form onSubmit={this.handleSubmit}>
                  <Form.Input
                      required
                      fluid
                      placeholder='First Option'
                      value={optionOne}
                      onChange={this.handleChangeOptionOne}
                  />
                  <Divider horizontal>Or</Divider>
                  <Form.Input
                      required
                      fluid
                      placeholder='Second Option'
                      value={optionTwo}
                      onChange={this.handleChangeOptionTwo}
                  />
                  <Button
                      style={{marginTop: '5%'}}
                      type='submit'
                      fluid
                      color='green'
                      disabled={optionOne === '' || optionTwo === ''}
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

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)
