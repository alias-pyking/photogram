import React from 'react';
import axios from '../../axios-insta';
import {connect} from 'react-redux';
import Profile from '../MyProfile/Profile/Profile';
import Posts from '../../components/Posts/Posts';
import Spinner from '../../components/UI/Spinner/Spinner';

class Account extends React.Component {
    state = {
        posts:[],
        postsLoading:true,
        profile:null,
        profileLoading:true,
        error:null,
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        const accountUrl = `auth/accounts`;
        const profileUrl = `${accountUrl}/${id}/`;
        const postsUrl = `${accountUrl}/${id}/posts`;
        const {token} = this.props;
        const headers = {
            headers:{Authorization:`token ${token}`}
        }
        axios.get(profileUrl,headers)
        .then(response => {
            console.log(response.data);
            this.setState({profileLoading:false,profile:response.data});
        })
        .catch(error => {
            this.setState({profileLoading:false,error:error})
            console.log(error);
        });
        axios.get(postsUrl,headers)
        .then(response => {
            console.log(response.data);
            this.setState({postsLoading:false,posts:response.data.results});
        })
        .catch(error => {
            this.setState({postsLoading:false,error:error});
        });
    }
    render(){
        const {profileLoading,postsLoading} = this.state;
        let displayProfile = <Spinner/>;
        let profilePosts = <Spinner/>;
        if(!profileLoading) {
            const {profile} = this.state;
            displayProfile = <Profile
                                username = {profile.userName}
                                user_id = {profile.user_id}
                                profileImg = {profile.image}
                                followers = {profile.followers}
                                following = {profile.following}
                                follows = {profile.follows}
                                />
        }
        if(!postsLoading) {
            const {posts} = this.state;
            profilePosts = <Posts posts = {posts}/>
        }
        return(
            <div className='col s12'>
                <div className='account'>
                    {displayProfile}
                    {profilePosts}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    }
}
export default connect(mapStateToProps)(Account);