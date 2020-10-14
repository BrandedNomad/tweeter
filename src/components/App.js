import React, { Component } from 'react'
import {handleInitialData} from "../actions/shared";
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";

import Dashboard from "./Dashboard";

class App extends Component {

 componentDidMount(){
   this.props.dispatch(handleInitialData())
 }

  render() {



    return (
      <div>
          <LoadingBar/>
          {this.props.loading === true
              ? null
              :<TweetPage match={{params:{id:"hbsc73kzqi75rg7v1e0i6a"}}}/>
          }
      </div>
    )
  }
}

function mapStateToProps({authedUser}){
    return {
        loading:authedUser === null
    }
}

export default connect(mapStateToProps)(App)