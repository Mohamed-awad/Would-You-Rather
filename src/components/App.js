import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from "../actions/shared";
import Home from './Home'
import Nav from './Nav'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Users from './Users'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav/>
            {
              this.props.loading === true
                ? <h1>loading</h1>
                  : <div>
                      <Route path='/' exact component={Home} />
                      <Route path='/add' exact component={NewQuestion} />
                      <Route path='/questions/:id' exact component={QuestionPage} />
                      <Route path='/leaderboard' exact component={Users} />
                    </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }


}

export default connect()(App);
