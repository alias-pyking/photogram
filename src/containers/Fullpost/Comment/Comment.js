import React from 'react';
import './Comment.css';
import SmallProfile from '../../../components/SmallProfile/SmallProfile';
const comment = props => {
    return (
        <div className='card p-2'>

            <p className='card-title'>
                <SmallProfile user_id ={props.user_id} profileImg = {props.profileImg} authorName = {props.username}/>
            </p>
            <p className='card-text m-1'>{props.comment}</p>
        </div>
    );
}
export default comment