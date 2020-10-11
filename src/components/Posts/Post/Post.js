import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
const post = props =>{
    const styles = {
        maxHeight:'320px'
    }
    return (
        <div className='col-12 col-md-6 col-lg-4 mb-3'>
        <div className='card'>
            <div className='hovereffect'>
                <img src={ props.image } className='card-img-top' alt={ props.caption } style={styles}/>
                <div className='overlay'>
                    <h2>{ props.likes } <i className='fas fa-thumbs-up'></i> | { props.comments } comments</h2>
                    <Link className='info' to={'/p/'+props.id}> View </Link>
                </div>
            </div>
        <div className='card-body'>
            <div className='card-text'>
            <p> <b>{ props.user }</b>  { props.caption }</p>
            </div>
        </div>
        </div>
        </div>
    )
};
export default post;
