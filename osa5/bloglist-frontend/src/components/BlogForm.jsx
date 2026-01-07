import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {

    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            user: user
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h1>Create a new blog</h1>
            <form onSubmit={addBlog}>
                <div>
                    <label>
                        title:
                        <input
                            type="text"
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        author:
                        <input
                            type="text"
                            value={author}
                            onChange={event => setAuthor(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        url:
                        <input
                            type="text"
                            value={url}
                            onChange={event => setUrl(event.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm