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
        const{ token, loadPosts } = this.props;
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
                nextPosts = (
                <li className='page-item'>
                    <button className='page-link' onClick = {() => this.loadPaginationPosts(nextPageNumber)}>
                        Next
                    </button>
                </li>);
            }
        }
        return (
            <div className='col s12'>
                {displayPosts}
                <ul className="pagination">
                        {previous}
                        <li className="page-item active">
                            <a href="#!" className='page-link'>{!loading? this.props.currentPage:''}</a></li>
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