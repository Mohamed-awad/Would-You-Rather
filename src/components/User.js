import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";
import {Card, Divider, Feed} from 'semantic-ui-react'
import LoaderComponent from "./LoaderComponent";

class User extends Component {

  render() {
    const {user} = this.props
    if (user === null) {
      return <LoaderComponent/>
    }

    return (
        <div>
          <Card style={{margin: 'auto', width: '70%'}}>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <div style={{
                    width: '25%', padding: '5%',
                    paddingLeft: '0%', borderRight: '1px solid'
                  }}
                       className='label'>
                    <img src={user.avatarURL}></img>
                  </div>
                  <div style={{width: '40%', borderRight: '1px solid'}} className='content'>
                    <div className='summary'>
                      <h2>{user.name}</h2>
                      <div style={{paddingRight: '10%'}}>
                        Answered questions
                        <span style={{float: 'right'}}>{Object.keys(user.answers).length}</span>
                      </div>
                      <div style={{paddingRight: '10%'}}>
                        <Divider/>
                      </div>
                      <div style={{paddingRight: '10%'}}>
                        Created questions
                        <span style={{float: 'right'}}>{user.questions.length}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    border: '1px solid grey',
                    width: '25%', borderRadius: '10%',
                    margin: '2.5%', backgroundColor: '#F1F1F1'
                  }}>
                    <div style={{textAlign: 'center', marginTop: '15%'}}>
                      <h3>Score</h3>
                    </div>
                    <hr style={{border: '1px solid grey'}}/>
                    <div style={{textAlign: 'center', marginTop: '13%'}}>
                      <h2 style={{
                        borderRadius: '50%', width: '50%',
                        backgroundColor: 'teal', color: 'white', margin: 'auto'
                      }}>
                        backgroundColor: 'teal', color: 'white', margin: 'auto'}}>
                        {(Object.keys(user.answers).length + user.questions.length)}
                      </h2>
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

function mapStateToProps({users}, {id}) {
  const user = users[id]
  return {
    user: user
        ? user
        : null,
  }
}

export default withRouter(connect(mapStateToProps)(User))
