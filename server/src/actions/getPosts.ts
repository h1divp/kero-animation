import { doc, getDoc, getDocs, collection, query, orderBy, limit, where } from '@firebase/firestore'

import { posts, firestore } from '../utilities/firebaseInit'
import { Post } from '../types/Post'

export const getPosts = async () => {
  const searchLimit = 100 // only retrieve 100 posts at max
  const ref = collection(firestore, "posts")
  const q = query(ref, orderBy("timeCreated", "desc"), limit(searchLimit))
  const postDocs = await getDocs(q)
  const postObjs: Partial<Post>[] = [];

  postDocs.docs.forEach((doc) => {
    const data = doc.data()
    const postObj = {
        postId: doc.id,
        authorId: data.authorId,
        frogUrl: data.frogUrl,
        timeCreated: data.timeCreated,
        star1: data.star1,
        star2: data.star2,
        star3: data.star3,
        star4: data.star4,
    }
    postObjs.push(postObj)
  })
  return postObjs
}

export const getPostById = async (postId: string) => {
  const ref = doc(posts, postId)
  const postDoc = await getDoc(ref)

  if (!postDoc.exists()) return

  const data = postDoc.data()
  const postObj = {
      postId: postDoc.id,
      authorId: data.authorId,
      frogUrl: data.frogUrl,
      timeCreated: data.timeCreated,
      star1: data.star1,
      star2: data.star2,
      star3: data.star3,
      star4: data.star4,
  }
  return postObj
}

export const getPostsByAuthorId = async (authorId: string) => {
  const ref = collection(firestore, "posts")
  const q = query(ref, where("authorId", "==", authorId))
  const postDocs = await getDocs(q)
  const postObjs: Partial<Post>[] = [];

  postDocs.docs.forEach((doc) => {
    const data = doc.data()
    const postObj = {
        postId: doc.id,
        authorId: data.authorId,
        frogUrl: data.frogUrl,
        timeCreated: data.timeCreated,
        star1: data.star1,
        star2: data.star2,
        star3: data.star3,
        star4: data.star4,
    }
    postObjs.push(postObj)
  })
  return postObjs
}
