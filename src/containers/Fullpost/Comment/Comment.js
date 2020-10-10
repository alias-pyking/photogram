import React from 'react';
import './Comment.css';
import SmallProfile from '../../../components/SmallProfile/SmallProfile';
const comment = props => {
    return (
        <div className='comment'>
            <SmallProfile user_id ={props.user_id} profileImg = {props.profileImg} authorName = {props.username}/>
            <p>{props.comment}</p>
        </div>
    );
}
export default comment