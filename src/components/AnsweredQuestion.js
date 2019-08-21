import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Progress,
  Card,
  Feed,
} from 'semantic-ui-react'
import LoaderComponent from './LoaderComponent'
import {Redirect} from 'react-router-dom'

class AnsweredQuestion extends Component {

  render() {

    if (this.props.authedUser === null) {
      return <Redirect to='/login'/>
    }

    const {question, author, currentUser} = this.props
    if (question === null || !currentUser) {
      return <LoaderComponent/>
    }
    let optionOneVotes = question.optionOne.votes.length
    let optionTwoVotes = question.optionTwo.votes.length
    let allVotes =  optionOneVotes + optionTwoVotes
    let op1 = true
    console.log(currentUser)
    if(currentUser.answers[question.id] === 'optionTwo') {
      op1 = false
    }
    return (
        <div>
          <Card style={{margin: 'auto', width: '70%'}}>
            <Card.Content>
              <Card.Header>Asked by {author.name}</Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <div style={{width: '45%', padding: '5%', borderRight: '1px solid'}}
                       className='label'>
                    <img src={author.avatarURL}></img>
                  </div>
                  <div className='content'>
                    <div className='summary'>
                      <h2>Results :-</h2>
                      <div className='ui info message'>
                        would you rather {question.optionOne.text} ?
                        <Progress value={optionOneVotes} total={allVotes} progress='percent'
                                color='teal' label={`${optionOneVotes} out of ${allVotes} votes`} />
                        {
                          op1 && <div style={{textAlign: 'center',
                            color: 'white', backgroundColor: 'green'}}> Your Vote</div>
                        }
                      </div>
                      <div className='ui info message'>
                        would you rather {question.optionTwo.text} ?
                        <Progress value={optionTwoVotes} total={allVotes} progress='percent'
                                color='teal' label={`${optionTwoVotes} out of ${allVotes} votes`} />
                        {
                          !op1 && <div style={{textAlign: 'center',
                            color: 'white', backgroundColor: 'green'}}> Your Vote</div>
                        }
                      </div>
                    </div>
                  </div>
                </Feed.Event>
              </Feed>
            </Card.Content>
          </Card>
        </div>
    )
  }
}

function mapStateToProps({users, questions, authedUser}, {id}) {
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

export default connect(mapStateToProps)(AnsweredQuestion)
