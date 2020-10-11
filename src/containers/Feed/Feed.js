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
                    previous = (
                        <li className="page-item disabled">
                            <button className='page-link' aria-label='previous'><span aria-hidden="true">Previous</span></button>
                        </li>);
                } else {
                    const previousPageNumber = getPageNumber(prev);
                    console.log(previousPageNumber);
                    previous = (
                        <li className='page-item'>
                        <button className='page-link' onClick = {() => this.loadPaginationPosts(previousPageNumber)}>
                            Previous
                        </button>
                        </li>);
                }
                if(!next){
                    nextPosts = (<li className="page-item disabled">
                                    <button className='page-link' aria-label='next'><span aria-hidden="true">Next</span></button>
                                </li>);
                } else {
                    const nextPageNumber = getPageNumber(next);
                    nextPosts =(
                        <li className='page-item'>
                            <button className='page-link' onClick = {() => this.loadPaginationPosts(nextPageNumber)}>
                                Next
                            </button>
                        </li>);
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
                        <li className="page-item active">
                            <a href="#!" className='page-link'>{!loading? this.props.currentPage:''}</a></li>
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
