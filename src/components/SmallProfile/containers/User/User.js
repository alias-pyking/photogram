import React from 'react';
import './User.css';
import SmallProfile from '../../components/SmallProfile/SmallProfile';
import {connect} from 'react-redux';
import axios from '../../axios-insta';
class User extends React.Component {
    state = {
        follows : this.props.follows,
    }
    handleFollowClick = () => {
        const {follows} = this.state;
        const {user_id, token} = this.props;
        const accountUrl = `auth/accounts/${user_id}`;
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
        });
    }
    render() {
        const {follows} = this.state;
        const {username,user_id, profileImg,userId} = this.props;
        console.log(userId,user_id);
        const show = user_id == userId;
        console.log(show);
        return (
            <div className='user card-panel'>
                <SmallProfile 
                profileImg= {profileImg}
                user_id = {user_id} 
                authorName = {username}
                />
            {show?'':
                <button
                className='blue waves-effect waves-light btn'
                onClick = {this.handleFollowClick}
                >
                {follows ? 'Unfollow': 'Follow'}
                
                </button>
            }
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
export default connect(mapStateToProps)(User);