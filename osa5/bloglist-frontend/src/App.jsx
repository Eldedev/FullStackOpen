import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from "./components/Notification"





const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [url, setUrl] = useState("")
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")




  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = event => {
    event.preventDefault()
    const BlogObject = {
      title: title,
      author: author,
      url: url,
      user: user
    }





    blogService.create(BlogObject).then( returnedBlog  => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${BlogObject.title} by ${BlogObject.author} added!`)
      setAuthor("")
      setTitle("")
      setUrl("")
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    })
        .catch(error => {
          setErrorMessage("all fields required")
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
        })}

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }



  const loginForm = () => (
      <form onSubmit={handleLogin}>
        <h1>Log in to application</h1>
        <Notification message={errorMessage} />
        <div>
          <label>
            username
            <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
  )

  const blogForm = () => (
      <form onSubmit={addBlog}>
        <h1>Create a new blog</h1>
        <div>
          <label>
            title:
            <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>

  )




  return (
      <div>

        {!user && loginForm()}
        {user && (
            <div>
              <h1>Blogs</h1>
              <Notification message={errorMessage} />
              <p>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></p>

              {blogForm()}

              {blogs.map(blog =>
                  <Blog key={blog.id} blog={blog} />
              )}

            </div>
        )}
      </div>
  )
}


export default App