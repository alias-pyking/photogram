import React from 'react';
import Header from '../../components/Header/header';
import './FeedPost.css';
import LikeCompnent from './LikeCompnent/LikeComponent';


const feedpost = (props) => {
    return (
        
        <div className="card feedpost mt-2 mb-2">
            <Header user_id = {props.user_id} authorImg = { props.authorProfileImage } username = {props.username}/>
            <img src={props.image} alt={props.caption} className='card-img-top postImg' />
            <div className='card-body'>
                <h5 className='card-title'>{ props.username }</h5>
                <p className='card-text'>{ props.caption }</p>
                <LikeCompnent
                    feedpost
                    url = {props.url}
                    id = {props.id}
                    token = {props.token}
                    likes = {props.likes}
                    liked = {props.liked}/>
            </div>
        </div>
    );
}

export default feedpost;