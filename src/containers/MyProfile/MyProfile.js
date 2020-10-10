import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadProfilePosts,loadProfile} from '../../store/actions/index';
import Profile from './Profile/Profile';
import Posts from '../../components/Posts/Posts';
import './MyProfile.css';
import Spinner from '../../components/UI/Spinner/Spinner';
class MyProfile extends Component{
    componentDidMount(){ 
        const {userId, token, onLoadProfile, onLoadProfilePosts}  = this.props;
        onLoadProfile(token);
        onLoadProfilePosts(userId, token);
    }
    render () {
        const {profileLoading,profilePostsLoading} = this.props;
        let displayProfile = <Spinner/>;
        let profilePosts = <Spinner/>;
        if(!profileLoading) {
            const {profile} = this.props;
            displayProfile = <Profile
                        username = {profile.username}
                        user_id = {profile.user_id}
                        profileImg = {profile.profileImage}
                        followers = {profile.followers}
                        following = {profile.following}
                        />
        }
        if(!profilePostsLoading) {
            const {posts} = this.props;
            profilePosts = <Posts posts = {posts}/>;
        }
        return (
            <div className='col s12'>
            <div className='account'>
                    {displayProfile}
                    {profilePosts}
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        userId:state.auth.userId,
        token:state.auth.token,
        profile:state.account.profile,
        profileLoading:state.account.profileLoading,
        profliePostsLoading:state.account.profilePostsLoading,
        posts:state.account.posts
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        onLoadProfile:(token) => dispatch(loadProfile(token)),
        onLoadProfilePosts:(userId,token) => dispatch(loadProfilePosts(userId,token)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyProfile);