import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Posts from '../../components/Posts/Posts';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-insta';
function getPageNumber(url){
    const idx = url.lastIndexOf('page=');
    const pageNumber = Number(url.substr(idx + 5,url.length));
    return pageNumber;
    
}   
class Explore extends React.Component {
    componentDidMount(){
        const{token,loadPosts} = this.props;
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
        const { loading } = this.props;
        let displayPosts = <Spinner/>;
        let previous = null;
        let nextPosts = null;
        if(!loading) {
            const {posts, prev, next} = this.props;
            displayPosts = <Posts posts = {posts}/>
            if(!prev){
                previous = <li className="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>;
            } else {
                const previousPageNumber = getPageNumber(prev);
                console.log(previousPageNumber);
                previous = <li><div onClick = {() => this.loadPaginationPosts(previousPageNumber)}>
                            <i class="material-icons">chevron_left</i></div></li>;
            }
            if(!next){
                nextPosts = <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>;
            } else {
                const nextPageNumber = getPageNumber(next);
                nextPosts = <li class="waves-effect"><div onClick = {() => this.loadPaginationPosts(nextPageNumber)}>
                            <i class="material-icons">chevron_right</i></div></li>;
            }
        }
        return (
            <div className='col s12'>
                {displayPosts}
                <ul class="pagination">
                        {previous}
                        <li class="active blue"><a href="#!">{!loading? this.props.currentPage:''}</a></li>
                        {nextPosts}
                </ul>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token:state.auth.token,
        posts:state.explore.posts,
        loading:state.explore.loading,
        prev:state.explore.prev,
        next: state.explore.next,
        currentPage: state.explore.page,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        loadPosts:(token,page) => dispatch(actionCreators.loadExplorePosts(token,page)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Explore,axios));