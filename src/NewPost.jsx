import React from 'react'

const NewPost = ({handleSubmit,postTitle,setPostTitle,postBody,setPostBody}) => {
  return (
    <main className="NewPost">
      <form className="newPostForm" onSubmit ={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input 
          type="text"
          required
          id="postTitle"
          value = {postTitle}
          onChange = {(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Body:</label>
        <textarea
          type="text"
          required
          id="postBody"
          value = {postBody}
          onChange = {(e) => setPostBody(e.target.value)}
        />
        <button type="submit" id="submitbtn">Submit</button>

      </form>
       
    </main>
  )
}

export default NewPost