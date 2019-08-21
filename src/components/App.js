import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from "../actions/shared";
import Home from './Home'
import Nav from './Nav'
import UnAnsweredQuestion from './UnAnsweredQuestion'
import NewQuestion from './NewQuestion'
import Users from './Users'
import LoginComponent from './LoginComponent'
import NotFound from './NotFound'

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
                      <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/login' exact component={LoginComponent} />
                        <Route path='/add' exact component={NewQuestion} />
                        <Route path='/questions/:id' exact component={UnAnsweredQuestion} />
                        <Route path='/leaderboard' exact component={Users} />
                        <Route path='*' exact component={NotFound} />
                      </Switch>
                    </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }


}

export default connect()(App);
