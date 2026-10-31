import { useState ,useEffect} from 'react'
import {format} from 'date-fns'
import Header from './Header'
import Footer from './Footer'
import About from './About'
import Home from './Home'
import Missing from './Missing'
import Nav from "./Nav"
import NewPost from './NewPost'
import PostPage from './PostPage'
import Post from './Post'
import PostLayout from './PostLayout'
import EditPost from './EditPost'
import { useNavigate } from 'react-router-dom'
import api from './api/posts'

import './App.css'
import { Link,Routes,Route } from 'react-router-dom'
function App() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [search,setSearch] = useState('')
  const [searchResults,setSearchResults] = useState([])
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')
  const [editTitle,setEditTitle] = useState('')
  const [editBody,setEditBody] = useState('')
  useEffect(() => {
    const fetchPosts = async ()=> {
        try {
            const response = await api.get('/posts')
            setPosts(response.data)   
        }
        catch(err) {
            if(err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            }
            else {
                console.log(`Error:${err.message}`)
            }
        }
    }
    fetchPosts()
  },[])
  useEffect(()=> {
    const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
    ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResults(filteredResults.reverse())
  },[posts,search])
  

 
   const handleSubmit = async (e) => {
    e.preventDefault()
    const id = (posts.length) ? posts[posts.length-1].id + 1 : 1
    const datetime = format(new Date(),'MMMM dd,yyyypp')
    const newPost = {title:postTitle,datetime,body:postBody};
    try {
        const response = await api.post('/posts',newPost)
        const allPosts = [...posts,response.data]
        console.log(response.data)
        setPosts(allPosts)
        setPostTitle('')
        setPostBody('')
        navigate('/')
        
    }
    catch(err) {
         if(err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            }
            else {
                console.log(`Error:${err.message}`)
            }
    }
  }
  const handleDelete = async (id) => {
    await api.delete(`/posts/${id}`)
    const postsList = posts.filter((post) => post.id !== id)
    setPosts(postsList)
    navigate('/')
  }
  const handleEdit = async(id) => {
    const datetime = format(new Date(),'MMMM dd,yyyypp')
    const updatedPost = {id,title:editTitle,datetime,body:editBody};
    try {
        const response = await api.put(`/posts/${id}`,updatedPost)
        
        setPosts(posts.map(post => (post.id).toString() === id?  response.data : post ))
        setEditTitle('')
        setEditBody('')
        navigate('/')
        
    }
    catch(err) {
         if(err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            }
            else {
                console.log(`Error:${err.message}`)
            }
    }
    
  }
  return (
    <div className="app">
      <Header title="Nova" />
      <Nav 
      search={search}
      setSearch = {setSearch}
      />
      
      <Routes>

          {/* Home page */}
          <Route
              path="/"
              element={<Home posts={searchResults} />}
          />

          {/* Post parent route */}
          <Route path="post">

              {/* Create new post */}
              <Route
                  index
                  element={
                      <NewPost
                          handleSubmit={handleSubmit}
                          postTitle={postTitle}
                          setPostTitle={setPostTitle}
                          postBody={postBody}
                          setPostBody={setPostBody}
                      />
                  }
              />

              

              {/* Individual post */}
              <Route
                  path=":id"
                  element={
                      <PostPage
                          posts={posts}
                          handleDelete={handleDelete}
                      />
                  }
              />

          </Route>

          <Route
                  path= "post/edit/:id"
                  element={
                      <EditPost
                          posts = {posts}
                          handleEdit={handleEdit}
                          editTitle={editTitle}
                          setEditTitle={setEditTitle}
                          editBody={editBody}
                          setEditBody={setEditBody}
                      />
                  }
              />

          {/* About page */}
          <Route
              path="about"
              element={<About />}
          />

          {/* Invalid URL */}
          <Route
              path="*"
              element={<Missing />}
          />

      </Routes>

            
      
      <Footer />

      
      
    </div>
    
    
  )
}

export default App
