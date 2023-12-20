import express from 'express'

import 'dotenv/config';
import { Post } from './types/Post'
import { getPosts, getPostById, getPostsByAuthorId } from './actions/getPosts'

const app = express()
const port = process.env.port
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/posts', async (req, res) => {
    try {
        // Get messages from Firestore
        let posts: Post[] | Partial<Post>[] = [];
        if (req.originalUrl === '/posts') {
            posts = await getPosts()
        } else if (req.query.postId && typeof req.query.postId === 'string') {
            const post: Post = await getPostById(req.query.postId)
            if (post) posts.push(post)
        } else if (req.query.authorId && typeof req.query.authorId === 'string') {
            posts = await getPostsByAuthorId(req.query.authorId)
        } else {
            console.error("Invalid path")
        }
        res.json(posts)
    } catch (err) {
        console.error(`Error sending <GET /posts> request: ${err.message}`)
    }
})

app.post('/messages', async (req, res) => {

})

// app.delete('/messages', async (req, res) => {
// })
//
// app.get('/users', async (req, res) => {
// })
//
// app.post('/users', async (req, res) => {
// })
//
// // Updates user location so far, going to add updating and checking messages in next push
// app.put('/users', async (req, res) => {
// })
//
// app.delete('/users', async (req, res) => {
// })
//
// Error handling
app.get('*', (req, res) => {
    // res.json("404: Path could not be found! COULD NOT {GET}")
    res.json({"errorType":1,"errorMsg":"Invalid Path"})
    res.status(404)
})

app.post('*', (req, res) => {
    // res.json("404: Path could not be found! COULD NOT {POST}")
    res.json({"errorType":1,"errorMsg":"Invalid Path"})
    res.status(404)
})

app.put('*', (req, res) => {
    // res.json("404: Path could not be found! COULD NOT {PUT}")
    res.json({"errorType":1,"errorMsg":"Invalid Path"})
    res.status(404)
})

app.delete('*', (req, res) => {
   // res.json("404: Path could not be found! COULD NOT {DELETE}")
   res.json({"errorType":1,"errorMsg":"Invalid Path"})
   res.status(404)
})

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`)
})
