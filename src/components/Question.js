import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatQuestion} from "../utils/_DATA";
import {answerQuestion} from "../actions/questions";
import {Link, withRouter} from "react-router-dom";
import {Button, Card, Feed} from 'semantic-ui-react'
import {convert} from "../utils/helper";
import LoaderComponent from "./LoaderComponent";
import {Redirect} from 'react-router-dom'

class Question extends Component {

  render() {

    if (this.props.authedUser === null) {
      return <Redirect to='/login'/>
    }

    const {question, author, authedUser} = this.props
    if (question === null) {
      return <LoaderComponent />
    }

    return (
        <div>
          <Card style={{margin: 'auto', width: '50%'}}>
            <Card.Content>
              <Card.Header>{author.name} Asks: </Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <div style={{width: '45%', padding: '5%'}} className='label'>
                    <img src={author.avatarURL}></img>
                  </div>
                  <div className='content'>
                    <h3>Would you rather</h3>
                    <div style={{paddingTop: '8%'}} className='summary'>
                      {`Created at: ${convert(question.timestamp)}`}
                    </div>
                  </div>
                </Feed.Event>
              </Feed>
            </Card.Content>
            <Card.Content extra>
              <div className='ui header buttons'>
                <Link to={`/questions/${question.id}`}>
                  <Button inverted fluid color='blue'>
                    View Poll
                  </Button>
                </Link>
              </div>
            </Card.Content>
          </Card>
        </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
  const question = questions[id]
  return {
    authedUser,
    question: question
        ? question
        : null,
    author: users[question.author]
  }
}

export default withRouter(connect(mapStateToProps)(Question))
