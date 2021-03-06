import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Card,
  Feed,
  Form,
  Radio,
  Divider
} from 'semantic-ui-react'
import {convert} from "../utils/helper";
import LoaderComponent from './LoaderComponent'
import AnsweredQuestion from './AnsweredQuestion'
import {handleAnswerQuestion} from "../actions/questions"
import {handleAddAnswer} from "../actions/users"
import {Redirect} from 'react-router-dom'

class UnAnsweredQuestion extends Component {

  state = {
    userOption: null,
  }

  handleChangeOption = (e, {value}) => this.setState({
    userOption: value
  })

  handleSubmit = (e) => {
    e.preventDefault()
    const { userOption } = this.state
    const { dispatch, question, currentUser } = this.props

    dispatch(handleAnswerQuestion({
      qid: question.id,
      authedUser: currentUser.id,
      answer: userOption
    }))
    dispatch(handleAddAnswer({
      qid: question.id,
      authedUser: currentUser.id,
      answer: userOption
    }))

    this.setState(() => ({
      userOption: null
    }))
  }

  render() {

    const {userOption} = this.state
    const {question, author, currentUser} = this.props
    if (question === null) {
      return <Redirect to="/404"/>
    }

    if (this.props.authedUser === null) {
      return <Redirect to='/login'/>
    }

    if( currentUser &&
        Object.keys(currentUser.answers).indexOf(question.id) !== -1) {
      return <AnsweredQuestion id={question.id} />
    }
    return (
        <div>
          <Card style={{margin: 'auto', width: '70%'}}>
            <Card.Content>
              <Card.Header>{author.name} Asks: </Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <div style={{width: '45%', padding: '5%', borderRight: '1px solid'}}
                       className='label'>
                    <img src={author.avatarURL}></img>
                  </div>
                  <div className='content'>
                    <div style={{paddingTop: '8%'}} className='summary'>
                      <h2>Would you rather</h2>
                      <Divider/>
                      <Form>
                        <Form.Field>
                          <Radio
                              label={question.optionOne.text}
                              name='radioGroup'
                              value='optionOne'
                              checked={this.state.userOption === 'optionOne'}
                              onChange={this.handleChangeOption}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Radio
                              label={question.optionTwo.text}
                              name='radioGroup'
                              value='optionTwo'
                              checked={this.state.userOption === 'optionTwo'}
                              onChange={this.handleChangeOption}
                          />
                        </Form.Field>
                      </Form>
                      <Divider/>
                      {`Created at: ${convert(question.timestamp)}`}
                    </div>
                  </div>
                </Feed.Event>
              </Feed>
            </Card.Content>
            <Card.Content extra>
              <div className='ui header buttons'>
                <form onSubmit={this.handleSubmit}>
                  <Button
                      type='submit'
                      inverted
                      fluid
                      color='green'
                      disabled={userOption === null}
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

function mapStateToProps({users, questions, authedUser}, props) {
  const {id} = props.match.params
  const question = questions[id]
  return {
    currentUser: users[authedUser],
    question: question
        ? question
        : null,
    author: question
        ? users[question.author]
        : null,
    authedUser
  }
}

export default connect(mapStateToProps)(UnAnsweredQuestion)
