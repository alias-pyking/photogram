import React from 'react';
import './App.css';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
// Components
import  Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Feed from './containers/Feed/Feed';
import Fullpost from './containers/Fullpost/Fullpost';
import MyProfile from './containers/MyProfile/MyProfile';
import Account from './containers/Account/Account';
import Following from './containers/Following/Following';
import Followers from './containers/Followers/Followers';
import EditProfile from './containers/EditProfile/EditProfile';
import Logout from './containers/Auth/Logout/Logout';

import AddPost from './containers/AddPost/AddPost';
import FollowNew from './containers/FollowNew/FollowNew';
import Explore from './containers/Explore/Explore';
import {connect} from 'react-redux';
import * as action from './store/actions/index';

class  App extends React.Component {

  componentDidMount(){
    this.props.tryAutoSignIn();
  }

  render(){
    let routes = (
    <Switch>
        <Route path='/auth' exact component = {Auth} />
        <Redirect to ='/auth'/>
    </Switch>);

    const { isAuth } = this.props;
    if(isAuth) {
      routes = (
        <Switch>
            <Route path="/new" component = {AddPost}/>
            <Route path="/auth" component = {Auth} />
            <Route path = "/logout" component = {Logout} />
    
            <Route path= "/profile/edit" component = {EditProfile} />
            <Route path = "/profile" component = {MyProfile} />
            
            <Route path="/explore" exact component = {Explore} />
            <Route path='/search' exact component = {FollowNew} />
    
            <Route path="/p/:id" component = {Fullpost} />
    
            <Route path="/acc" exact component = {FollowNew}/>
            <Route path='/acc/:id/followers' exact component = {Followers}/>
            <Route path ='/acc/:id/following' exact component ={Following} />
            <Route path='/acc/:id' exact component = {Account}/>
    
            <Route path = "/" exact component={Feed} />
            <Redirect to='/' /> 
    
          </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  }
};


const mapDispatchToprops = dispatch => {
  return {
    tryAutoSignIn:()=> dispatch(action.authCheckState()),
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToprops)(App));
