import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import {Tab} from 'semantic-ui-react'


class Home extends Component {

  render() {
    const { currentUser, questionIds } = this.props
    let answeredQuestions = []
    let unAnsweredQuestions = []
    if (currentUser) {
      answeredQuestions = Object.keys(currentUser.answers)
      unAnsweredQuestions = questionIds.filter((id) => {
        if (answeredQuestions.indexOf(id) === -1) {
          return id
        }
      })
    }
    const panes = [
      {
        menuItem: 'UnAnswered Questions',
        render: () =>
          <Tab.Pane>
            <div>
              <ul className='dashboard-list'>
                {unAnsweredQuestions.map((id) => (
                    <li key={id}>
                      <Question id={id}/>
                    </li>
                ))}
              </ul>
            </div>
          </Tab.Pane>
      },
      {
        menuItem: 'Answered Questions',
        render: () =>
          <Tab.Pane>
            <div>
              <ul className='dashboard-list'>
                {answeredQuestions.map((id) => (
                    <li key={id}>
                      <Question id={id}/>
                    </li>
                ))}
              </ul>
            </div>
          </Tab.Pane>
      }]

    return (
        <Tab panes={panes} />
    )
  }
}


function mapStateToProps({ authedUser, users, questions }) {
  return {
    currentUser: users[authedUser],
    questionIds: Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }
}


export default connect(mapStateToProps)(Home)
