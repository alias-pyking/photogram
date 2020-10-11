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
        });
    }


    render() {
        const {follows} = this.state;
        const {username,user_id, profileImg,userId} = this.props;
        const show = user_id == userId;
        return (
            <div className='card m-2'>
            <div className='card-body user'>
                <SmallProfile 
                    profileImg= {profileImg}
                    user_id = {user_id} 
                    authorName = {username}
                    />
                {show?'':
                    <button
                    className='btn btn-primary m-2'
                    onClick = {this.handleFollowClick}
                    >
                    {follows ? 'Unfollow': 'Follow'}
                    
                    </button>
                }
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

export default connect(mapStateToProps)(User);