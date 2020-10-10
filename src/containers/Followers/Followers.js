import React from 'react';
import './Followers.css';
import axios from '../../axios-insta';
import {connect} from 'react-redux';
import User from '../User/User';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
class Followers  extends React.Component {
    state ={
        users:[],
        loading:true,
        error:null,
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        const profileUrl = 'auth/accounts/'+id;
        const followersUrl = `${profileUrl}/followers`;
        const {token} = this.props;
        const headers = {
            headers:{Authorization:`token ${token}`}
        };
        axios.get(followersUrl,headers)
        .then(response =>{
            this.setState({loading : false, users : response.data });
        })
        .catch(error => {
            this.setState({error : error,loading : false });
        });
    }
    render(){
        let displayUsers = <Spinner/>;
        const {loading} = this.state;
        if(!loading){
            const {users} = this.state;
            if(users.length === 0) {
                displayUsers = <h4>No Followers</h4>;
            } else {
                displayUsers = this.state.users.map(user => {
                    return <User
                            key = {user.user_id}
                            follows = {user.follows}
                            user_id = {user.user_id}
                            profileImg = {user.userProfileImage}
                            username = {user.userName}
                            />;
                });
            }
        }
        return (
            <div className='row'>
                <div className='col s12 m8'>
                {displayUsers}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        token : state.auth.token,
    }
}
export default connect(mapStateToProps)(withErrorHandler(Followers,axios));