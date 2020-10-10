import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
const post = props =>{
    const styles = {
        backgroundImage:`url(${props.image})`,
        backgroundRepeat:'no-repeat',
    }
    return (
        <div className='col s12 m6 l4'>

        <Link to={'/p/'+props.id}>
            
            <div className = 'img__wrap'>
            <div className='img__description'>
                <i className='material-icons'>thumb_up</i> <span> {props.likes}</span>
                <i className = 'material-icons'>add_comment</i> <span>{props.comments}</span>
            </div>
            <div 
                className='postImage'
                style = {styles}
            >
            </div>
            </div>
        </Link>
        </div>
    )
};
export default post;
