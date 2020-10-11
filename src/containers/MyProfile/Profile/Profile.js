import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';
import {connect} from 'react-redux';

class Profile extends React.Component{
    state = {
        follows : this.props.follows,
        error: null,
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
            this.setState({error:error});
        })
    }
    render(){
        let { user_id, userId } = this.props;
        user_id = Number(user_id);
        userId = Number(userId);
        const { follows } = this.state;
        const show = user_id === userId;
        return (
            <div className='row m-4'>
                <div className='col-lg-4 profileSection'>
                    <img src={this.props.profileImg} alt = { this.props.username } className='rounded-circle profileImg'/>
                    <b> { this.props.username }</b>
                </div>
                <div>
                <div className = 'col-lg-8'>
                        <div className='followSection'>
                            <Link className='btn followBtn' to={`/acc/${user_id}/followers`}>Followers {this.props.followers}</Link>
                            <Link className='btn followBtn' to= {`/acc/${user_id}/following`}>Following {this.props.following}</Link>
                        </div>
                        
                        {show? 
                       <> 
                    <Link to='/profile/edit' className='btn btn-warning m-2'>Edit Profile</Link>
                    <Link to='/logout' className ="btn btn-danger m-2">Logout</Link>
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