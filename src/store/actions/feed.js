import * as actionTypes from './actionTypes';
import axios from '../../axios-insta';
const feedLoadingStart = () => {
    return {
        type:actionTypes.FEED_LOADING_START,
    }
};

const feedLoadingSuccess = (posts,prev,page, next) =>{
    return {
        type: actionTypes.FEED_LOADING_SUCCESS,
        posts:posts,
        prev: prev,
        page: page,
        next: next
    }
};

const feedLoadingFailed = (error) =>{
    return {
        type: actionTypes.FEED_LOADING_FAIL,
        error : error
    }
}

export const loadFeed = (token, page) => {
    return dispatch => {
        dispatch(feedLoadingStart());
        const url = `home/?page=${page}`;
        const header = {
            headers:{'Authorization': `token ${token}`},
        };
        axios.get(url, header)
        .then((response) => {
            const{results, previous, next} = response.data;
            dispatch(feedLoadingSuccess(results,previous,page, next));
        })
        .catch((error) =>{
            console.log(error);
            dispatch(feedLoadingFailed(error));
        });
        

    }
};