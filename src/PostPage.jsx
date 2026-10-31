import React from 'react'
import {Link,useParams} from 'react-router-dom'
import PostLayout from './PostLayout'
const PostPage = ({posts,handleDelete}) => {
  const {id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)
  return (
    <main className="PostPage">
      <h1>
            PostPage
      </h1>
        
      <article className="post">
        {
          post &&
          <>
             <h2>{post.title}</h2>
             <p className="postDate">{post.datetime}</p>
             <p className="postBody">{post.body}</p> 
             <button className="deleteButton" onClick={() => handleDelete(post.id)}  >Delete Post</button>
             <Link to={`/post/edit/${post.id}`}>
                <button className="editButton" >Edit Post</button>
             </Link>
          </>
        }
        {!post &&
        <>
          <h2>
            Post Not Found
          </h2>
          <Link to="/"><p>VISIT OUR HOME PAGE!!</p></Link>
        </>}
      </article>
        
    </main>
  )
}

export default PostPage