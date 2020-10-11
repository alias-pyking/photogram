import React from 'react';
import './Posts.css';
import Post from './Post/Post';
class Posts extends React.Component{

   render(){
        const {posts} = this.props;
        const displayPosts = posts.map((post) => {
            return <Post
                    user={ post.userName }
                    key ={ post.id }
                    image ={ post.image }
                    caption ={ post.caption }
                    id ={ post.id }
                    likes ={ post.likes }
                    comments ={ post.comments }
            />
        });
        return (
            <div className='row'>
                {displayPosts}
            </div>
        );
   }
};

export default Posts;