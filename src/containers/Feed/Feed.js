import React,{ Component} from 'react';
import './Feed.css';
import FeedPost from '../FeedPost/FeedPost';
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-insta';
import { Link } from 'react-router-dom';

function getPageNumber(url){
    const idx = url.lastIndexOf('page=');
    const pageNumber = Number(url.substr(idx + 5,url.length));
    return pageNumber;
    
}
class Feed extends Component{
    componentDidMount(){
        const {isAuth}  = this.props;
        if(!isAuth) {
            this.props.history.push('/auth');
        }
        const {loadPosts,token} = this.props;
        loadPosts(token,1);

    }
    loadPaginationPosts = (pageNumber) => {
        const{loadPosts, token} = this.props;
        if(!pageNumber){
            pageNumber = 1;
        }
        loadPosts(token, pageNumber);
    }
    render(){
        let displayPosts = <Spinner/>;
        let previous = null;
        let nextPosts = null;
        const {loading} = this.props;
        if(!loading) {
            const {posts, prev, next} = this.props;

            if(posts.length === 0) {
                displayPosts = <h4>No Posts Found in Your feed. Follow more users <Link to='/acc'>here</Link></h4>
            } else  {
                displayPosts = posts.map((post) => {
                    return <FeedPost
                        key = {post.id}
                        id = {post.id}
                        url ={post.url}
                        user_id= {post.user_id}
                        token = {this.props.token}
                        authorProfileImage= {post.userProfileImage}
                        authorProfileUrl = {post.userProfileUrl}
                        username = {post.userName}
                        image = {post.image}
                        caption = {post.caption}
                        likes = {post.likes}
                        liked = {post.liked}
                        commentsUrl = {post.comments}
                        />
                });
                if(!prev){
                    previous = <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>;
                } else {
                    const previousPageNumber = getPageNumber(prev);
                    console.log(previousPageNumber);
                    previous = <li><div onClick = {() => this.loadPaginationPosts(previousPageNumber)}>
                                <i className="material-icons">chevron_left</i></div></li>;
                }
                if(!next){
                    nextPosts = <li className="disabled"><a href="#!"><i className="material-icons">chevron_right</i></a></li>;
                } else {
                    const nextPageNumber = getPageNumber(next);
                    nextPosts = <li className="waves-effect"><div onClick = {() => this.loadPaginationPosts(nextPageNumber)}>
                                <i className="material-icons">chevron_right</i></div></li>;
                }

            }
        }
        return (
            <div>
            <div className='row'>
                <div className='col s12 m7'>
                    {displayPosts}
                    <ul className="pagination">
                        {previous}
                        <li className="active blue"><a href="#!">{!loading? this.props.currentPage:''}</a></li>
                        {nextPosts}
                    </ul>
                </div>
            </div>
            
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        posts:state.feed.posts,
        next: state.feed.next,
        prev: state.feed.prev,
        currentPage: state.feed.page,
        isAuth: state.auth.token !== null,
        token: state.auth.token,
        loading:state.feed.loading,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        loadPosts:(token,page) => dispatch(actionCreators.loadFeed(token,page)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Feed,axios));
