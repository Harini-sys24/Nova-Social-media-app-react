import React from 'react'
import { useEffect } from 'react'
import {useParams,Link} from 'react-router-dom'

const EditPosts = ({posts,handleEdit,editTitle,setEditTitle,editBody,setEditBody}) => {
  const {id} = useParams()
  const post = posts.find(post => (post.id).toString() === id)
  useEffect(() => {
    if(post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  },[post,setEditTitle,setEditBody])
  return (
    
    <main className="EditPost">
      <h2>Edit Post</h2>
      <form className="editPostForm" onSubmit = {(e) => {
        e.preventDefault()
        handleEdit(id)
      }}
      >
        <label htmlFor="editTitle">Title:</label>
        <input 
          type="text"
          required
          id="editTitle"
          value = {editTitle}
          onChange = {(e) => setEditTitle(e.target.value)}
        />
        <label htmlFor="editBody">Body:</label>
        <textarea
          type="text"
          required
          id="editBody"
          value = {editBody}
          onChange = {(e) => setEditBody(e.target.value)}
        />
        <button type="submit" id="editbtn">Submit</button>

      </form>
       
    </main>
  )
}

export default EditPosts