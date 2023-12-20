import express from 'express'

import 'dotenv/config';
import { Post } from './types/Post'
import { getPosts, getPostById, getPostsByAuthorId } from './actions/getPosts'
import { createPost } from './actions/createPost'
import { updatePostStarCount, updatePostTitle, updatePostTags, updatePostLock } from './actions/updatePost'
import { deletePostById } from './actions/deletePost'

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
        res.json({"errorType":2,"errorMsg":"Could not retrieve data from /posts."})
    }
})

app.post('/posts', async (req, res) => {
    try {
        const timeCreated = Number(req.body.timeCreated)
        if(isNaN(timeCreated)) throw new Error(`The timeSent parameter must be a valid integer`);

        const body = req.body
        await createPost(
            body.postId.toString(),
            body.authorId.toString(),
            body.frogUrl.toString(),
            body.title.toString(),
            body.tags.toString(),
            body.isLocked, // Todo: check type
            Date.now(),
            Number(body.star1),
            Number(body.star2),
            Number(body.star3),
            Number(body.star4),
        )
        res.json({"success":""})
    } catch (err) {
        console.error(`Error sending <POST /posts> request: ${err.message}`)
        res.json({"errorType":3,"errorMsg":"Could not create post."})
    }
})

app.delete('/posts', async (req, res) => {
    try {
        if (req.query.postId && typeof req.query.postId === 'string') {
            const deletionStatus = await deletePostById(req.query.postId)
            if (deletionStatus.status) {
                res.json({"success":""})
            } else {
                throw new Error(deletionStatus.errorReason)
            }
        } else {
            throw new Error("Invalid path.")
        }
    } catch (err) {
        console.error(`Error sending <DELETE /posts> request: ${err.message}`)
        res.json({"errorType":4,"errorMsg":"Could not delete post.","reason":err.message})
    }
})

app.put('/posts', async(req, res) => {
    try {
        // update title, star counts
        if (req.query.postId && typeof req.query.postId === 'string') {
            if (req.query.starType) {
                if (!req.query.starVal) throw new Error("Must include starVal parameter.")
                if (!req.query.method || typeof req.query.method !== 'string') throw new Error("Must include method paramter, or it is not a string.")
                // Todo: throw an error
                const starType: number = Number(req.query.starType)
                const starVal: number = Number(req.query.starVal)
                if(isNaN(starType)) throw new Error(`starType parameter must be a valid integer`);
                if(isNaN(starVal)) throw new Error(`starVal parameter must be a valid integer`);

                const updateStatus = await updatePostStarCount(req.query.postId, starType, starVal, req.query.method)
                if (updateStatus.status) {
                    res.json({"success":""})
                } else {
                    throw new Error(updateStatus.errorReason)
                }
            } else if (req.query.title) {
                if (typeof req.query.title !== 'string') throw new Error("Title parameter must be a string.")
                const updateStatus = await updatePostTitle(req.query.postId, req.query.title, Date.now())
                if (updateStatus.status) {
                    res.json({"success":""})
                } else {
                    throw new Error(updateStatus.errorReason)
                }
            } else if (req.query.tags) {
                if (typeof req.query.tags !== 'string') throw new Error("Tags parameter must be a string.")
                const updateStatus = await updatePostTags(req.query.postId, req.query.tags, Date.now())
                if (updateStatus.status) {
                    res.json({"success":""})
                } else {
                    throw new Error(updateStatus.errorReason)
                }
            } else if (req.query.isLocked) {
                const param = req.query.isLocked
                if (param != 'true' && param != 'false') throw new Error("isLocked must be set to 'true' or 'false'.")
                let isLocked = false
                if (param == 'true') isLocked = true
                const updateStatus = await updatePostLock(req.query.postId, isLocked)
                if (updateStatus.status) {
                    res.json({"success":""})
                } else {
                    throw new Error(updateStatus.errorReason)
                }
            } else {
                throw new Error("Invalid parameters.")
            }
        } else {
            throw new Error("Invalid path.")
        }
    } catch (err) {
        console.error(`Error sending <POST /posts> request: ${err.message}`)
        res.json({"errorType":5,"errorMsg":"Could not update post.","reason":err.message})
    }
})

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
