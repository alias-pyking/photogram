import * as actionTypes from './actionTypes';
import axios from '../../axios-insta';

const explorePostsLoadingStart = () =>{
    return {
        type:actionTypes.EXPLORE_POSTS_LOADING_START
    }
};

const explorePostsLoadingFail= (error) => {
    return {
        type:actionTypes.EXPLORE_POSTS_LOADING_FAIL,
        error:error
    }
};

const explorePostsLoadingSuccess = (posts, prev,page, next) => {
    return {
        type: actionTypes.EXPLORE_POSTS_LOADING_SUCCESS,
        posts:posts,
        prev : prev,
        page: page,
        next: next
    }
};

export const loadExplorePosts = (token,page) => {
    return dispatch => {
        dispatch(explorePostsLoadingStart());
        const url = `explore/?page=${page}`;
        const header = {
            headers:{'Authorization': `token ${token}`},
        };
        axios.get(url, header)
        .then((response) => {
            const {results, previous, next} = response.data;
            dispatch(explorePostsLoadingSuccess(results, previous,page, next));
        })
        .catch((error) =>{
            console.log(error);
            dispatch(explorePostsLoadingFail(error));
        });
    }
};