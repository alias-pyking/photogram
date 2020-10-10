import React from 'react';
import './header.css';
import SmallProfile from '../SmallProfile/SmallProfile'
const header = props => {
    return (
        <div className='mheader'>
            <SmallProfile user_id = {props.user_id} profileImg = {props.authorImg} authorName = {props.username}/>
        </div>
    );
}


export default header;