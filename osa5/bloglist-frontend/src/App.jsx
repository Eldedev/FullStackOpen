import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'





const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [blogformVisible, setBlogformVisible] = useState(false)




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

    const addBlog = (BlogObject) => {
        blogService.create(BlogObject).then( returnedBlog  => {
            const returnedBlogFix = {
                ...returnedBlog,
                user: user
            }
            setBlogs(blogs.concat(returnedBlogFix))
            setErrorMessage(`a new blog ${BlogObject.title} by ${BlogObject.author} added!`)
            setBlogformVisible(false)
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)
        })
            .catch(() => {
                setErrorMessage('all fields required')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 4000)
            })}




    const blogForm = () => {
        const hideWhenVisible = { display: blogformVisible ? 'none' : '' }
        const showWhenVisible = { display: blogformVisible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setBlogformVisible(true)}>create</button>
                </div>
                <div style={showWhenVisible}>
                    <BlogForm
                        createBlog={addBlog}
                        user={user}
                    />
                    <button onClick={() => setBlogformVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }

    const addLike = async blog => {

        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1
        }

        const newBlog = await blogService.update(blog.id, updatedBlog )

        const newBlogFix = {
            ...newBlog,
            user: blog.user
        }
        setBlogs(blogs.map(blog1 => blog.id === blog1.id ? newBlogFix : blog1))
    }

    const deleteBlog = async blog => {
        const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

        if (confirmation) {
            await blogService.remove(blog.id)
            setBlogs(blogs.filter(blog1 => blog1.id !== blog.id))
        }
    }


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






    return (
        <div>

            {!user && loginForm()}
            {user && (
                <div>
                    <h1>Blogs</h1>
                    <Notification message={errorMessage} />
                    <p>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></p>

                    {blogForm()}

                    {blogs
                        .sort((a, b) => b.likes - a.likes)
                        .map(blog =>
                            <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog}/>
                        )}

                </div>
            )}
        </div>
    )
}


export default App