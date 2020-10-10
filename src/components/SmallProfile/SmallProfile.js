import React from 'react';
import './SmallProfile.css';
import { Link } from 'react-router-dom';
const profile= props =>{
    return (
        <div className='smallProfile'>
            
            <Link to = {'/acc/'+props.user_id}>
                <img src = {props.profileImg} alt={props.authorName} className="smallProfileImg"/>
                <span className='smallProfileName'>{props.authorName}</span>
            </Link>
        </div>
    );
}
export default profile;