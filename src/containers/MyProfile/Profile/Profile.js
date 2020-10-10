import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';
import {connect} from 'react-redux';
class Profile extends React.Component{
    state = {
        follows : this.props.follows,
    }
    handleFollowClick = () => {
        const {follows} = this.state;
        const {user_id, token} = this.props;
        const url = 'https://instaclone.pythonanywhere.com/api';
        const accountUrl = `${url}/auth/accounts/${user_id}`;
        let followUrl;
        if(follows) {
            // user already follows the current profile user 
            // Make url for unfollowing the profile 
            followUrl = `${accountUrl}/unfollow/`;
        } else {
            followUrl = `${accountUrl}/follow/`;
        }
        const headers ={
            headers:{Authorization:`token ${token}`}
        }
        axios.post(followUrl,null,headers)
        .then(response => {
            this.setState({follows:!follows});
        })
        .catch(error => {
            console.log(error);

        })
    }
    render(){
        const {user_id,userId} = this.props;
        const {follows} = this.state;
        const show = user_id == userId;
        console.log(user_id);
        return (
            <div className='profile'>
                <div className='profileUpperSection'>
                    <img src={this.props.profileImg} alt = {this.props.username} className='profileImg'/>
                    <div className = 'upperRightSection'>
                        <div className='followSection'>
                            <Link to={`/acc/${user_id}/followers`}>Followers {this.props.followers}</Link>
                            <Link to= {`/acc/${user_id}/following`}>Following {this.props.following}</Link>
                        </div>
                        
                        {show? 
                       <> 
                    <Link to='/profile/edit' className='edit waves-effect waves-light'>Edit_Profile</Link>
                    <Link to='/logout' className ="red waves-effect waves-light">Logout</Link>
                    </>
                        :
                        <button
                        onClick={this.handleFollowClick}
                        className = 'btn waves-effect waves-light blue'
                        >
                            {follows?'Unfollow':'Follow' }
                        </button> 
                        }
                    </div>
                </div>
                <b className='username'>{this.props.username}</b>
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        token:state.auth.token,
        userId:state.auth.userId,
    }
}
export default connect(mapStateToProps)(Profile);