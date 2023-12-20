import express from 'express'

import 'dotenv/config';
import { Post } from './types/Post'
import { User } from './types/User'
import { getPosts, getPostById, getPostsByAuthorId } from './actions/getPosts'
import { getUserById } from './actions/getUsers'
import { createPost } from './actions/createPost'
import { createUser } from './actions/createUser'
import { updatePostStarCount, updatePostTitle, updatePostTags, updatePostLock } from './actions/updatePost'
import { updateUserStarCount, addPostId, removePostId, updateUserDisplayName, updateUserAvatarUrl, updateUserBio } from './actions/updateUser'
import { deletePostById } from './actions/deletePost'
import { deleteUserById } from './actions/deleteUser'

const app = express()
const port = process.env.port
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/posts', async (req, res) => {
    try {
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
        const body = req.body
        const lockParam = body.isLocked
        if (lockParam != 'true' && lockParam != 'false') throw new Error("isLocked must be set to 'true' or 'false'.")
        let isLocked = false

        if (lockParam == 'true') isLocked = true
        await createPost(
            body.postId.toString(),
            body.authorId.toString(),
            body.frogUrl.toString(),
            body.title.toString(),
            body.tags.toString(),
            isLocked, 
            Date.now(),
            Number(body.star1),
            Number(body.star2),
            Number(body.star3),
            Number(body.star4),
        )
        res.json({"success":""})
    } catch (err) {
        console.error(`Error sending <POST /posts> request: ${err.message}`)
        res.json({"errorType":3,"errorMsg":"Could not create post.","reason":err.message})
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

app.get('/users', async (req, res) => {
    try {
        // Get messages from Firestore
        let users: User[] | Partial<User>[] = [];
        if (req.query.userId && typeof req.query.userId === 'string') {
            const user: User = await getUserById(req.query.userId)
            if (user) users.push(user)
        } else {
            throw new Error("Invalid path")
        }
        res.json(users)
    } catch (err) {
        console.error(`Error sending <GET /users> request: ${err.message}`)
        res.json({"errorType":2,"errorMsg":"Could not retrieve data from /users.","reason":err.message})
    }
})

app.post('/users', async (req, res) => {
    try {
        const body = req.body
        
        const postIdCollection = JSON.parse(body.postIdCollection)
        // Will be sent as a JSONifyed array

        await createUser(
            body.userId.toString(),
            body.displayName.toString(),
            body.avatarUrl.toString(),
            body.bio.toString(),
            postIdCollection,
            Date.now(),
            Number(body.star1),
            Number(body.star2),
            Number(body.star3),
            Number(body.star4),
        )
        res.json({"success":""})
    } catch (err) {
        console.error(`Error sending <POST /users> request: ${err.message}`)
        res.json({"errorType":3,"errorMsg":"Could not create user.","reason":err.message})
    }
})

app.put('/users', async (req, res) => {
    // Update displayName, avatarUrl, bio, postIdCollection, stars
    try {
        if (req.query.userId && typeof req.query.userId === 'string') {
            if (req.query.starType) {
                if (!req.query.starVal) throw new Error("Must include starVal parameter.")
                if (!req.query.method || typeof req.query.method !== 'string') throw new Error("Must include method paramter, or it is not a string.")
                // Todo: throw an error
                const starType: number = Number(req.query.starType)
                const starVal: number = Number(req.query.starVal)
                if(isNaN(starType)) throw new Error(`starType parameter must be a valid integer`);
                if(isNaN(starVal)) throw new Error(`starVal parameter must be a valid integer`);

                const updateStatus = await updateUserStarCount(req.query.userId, starType, starVal, req.query.method)
                if (updateStatus.status) {
                    res.json({"success":""})
                } else {
                    throw new Error(updateStatus.errorReason)
                }
            } else if (req.query.addPostId) {
                if (typeof req.query.addPostId !== 'string') throw new Error("addPost parameter must be a string (postId).")
                const updateStatus = await addPostId(req.query.userId, req.query.addPostId)
                if (updateStatus.status) {
                    res.json({"success":""})
                } else {
                    throw new Error(updateStatus.errorReason)
                }
            } else if (req.query.removePostId) {
                if (typeof req.query.removePostId !== 'string') throw new Error("removePost parameter must be a string (postId).")
                const updateStatus = await removePostId(req.query.userId, req.query.removePostId)
                if (updateStatus.status) {
                    res.json({"success":""})
                } else {
                    throw new Error(updateStatus.errorReason)
                }
            } else if (req.query.displayName) {
                if (typeof req.query.displayName !== 'string') throw new Error("displayName parameter must be a string.")
                const updateStatus = await updateUserDisplayName(req.query.userId, req.query.displayName)
                if (updateStatus.status) {
                    res.json({"success":""})
                } else {
                    throw new Error(updateStatus.errorReason)
                }
            } else if (req.query.avatarUrl) {
                if (typeof req.query.avatarUrl !== 'string') throw new Error("avatarUrl parameter must be a string.")
                const updateStatus = await updateUserAvatarUrl(req.query.userId, req.query.avatarUrl)
                if (updateStatus.status) {
                    res.json({"success":""})
                } else {
                    throw new Error(updateStatus.errorReason)
                }
            } else if (req.query.bio) {
                if (typeof req.query.bio !== 'string') throw new Error("bio parameter must be a string.")
                const updateStatus = await updateUserBio(req.query.userId, req.query.bio)
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
        res.json({"errorType":5,"errorMsg":"Could not update user.","reason":err.message})
    }
})

app.delete('/users', async (req, res) => {
    try {
        if (req.query.userId && typeof req.query.userId === 'string') {
            const deletionStatus = await deleteUserById(req.query.userId)
            if (deletionStatus.status) {
                res.json({"success":""})
            } else {
                throw new Error(deletionStatus.errorReason)
            }
        } else {
            throw new Error("Invalid path.")
        }
    } catch (err) {
        console.error(`Error sending <DELETE /users> request: ${err.message}`)
        res.json({"errorType":4,"errorMsg":"Could not delete user.","reason":err.message})
    }
})

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
