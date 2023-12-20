import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { posts, firestore } from '../utilities/firebaseInit'

export const updatePostStarCount = async (postId: string, starType: number, starVal: number, method: string) => {
  const ref = doc(posts, postId)
  const postDoc = await getDoc(ref)
  const updateStatus = {
      errorReason: "",
      status: false
  }

  if (!postDoc.exists()) {
      updateStatus.errorReason = "Post does not exist"
      return updateStatus
  }

  const starTypeStr = "star" + starType;
  let starCount: number = postDoc.data()[starTypeStr];
  console.log(starCount)
  console.log("starCount", starCount)
  if (method == "add") {
      starCount = starCount + starVal;
  } else if (method == "subtract") {
      starCount = starCount - starVal;
  } else {
      updateStatus.errorReason = "Invalid method parameter."
      return updateStatus
  }

  let updateObj = {}
  switch(starType) {
      case 2:
          updateObj = { star2: starCount }
          break
      case 3:
          updateObj = { star3: starCount }
          break
      case 4:
          updateObj = { star4: starCount }
          break
      default:
        updateObj = { star1: starCount }
  }
  
  await updateDoc(doc(firestore, "posts", postId), updateObj)
    .then(
        // .then()'s first parameter runs on success, and the second runs when there is an error
        () => { 
            updateStatus.status = true
        },
        () => { 
            updateStatus.errorReason = "Request was not fulfilled."
        }
    )
  return updateStatus
}

export const updatePostTitle = async (postId: string, postTitle: string, timeUpdated: number) => {
  const ref = doc(posts, postId)
  const postDoc = await getDoc(ref)
  const updateStatus = {
      errorReason: "",
      status: false
  }

  if (!postDoc.exists()) {
      updateStatus.errorReason = "Post does not exist"
      return updateStatus
  }

  await updateDoc(doc(firestore, "posts", postId), {
      title: postTitle
  })
    .then(
        // .then()'s first parameter runs on success, and the second runs when there is an error
        () => { 
            updateStatus.status = true
        },
        () => { 
            updateStatus.errorReason = "Request was not fulfilled."
        }
    )
  return updateStatus
}

export const updatePostTags = async (postId: string, postTags: string, timeUpdated: number) => {
  const ref = doc(posts, postId)
  const postDoc = await getDoc(ref)
  const updateStatus = {
      errorReason: "",
      status: false
  }

  if (!postDoc.exists()) {
      updateStatus.errorReason = "Post does not exist"
      return updateStatus
  }

  await updateDoc(doc(firestore, "posts", postId), {
      tags: postTags,
      timeUpdated: timeUpdated
  })
    .then(
        // .then()'s first parameter runs on success, and the second runs when there is an error
        () => { 
            updateStatus.status = true
        },
        () => { 
            updateStatus.errorReason = "Request was not fulfilled."
        }
    )
  return updateStatus
}

export const updatePostLock = async (postId: string, isLocked: boolean) => {
  const ref = doc(posts, postId)
  const postDoc = await getDoc(ref)
  const updateStatus = {
      errorReason: "",
      status: false
  }

  if (!postDoc.exists()) {
      updateStatus.errorReason = "Post does not exist"
      return updateStatus
  }

  await updateDoc(doc(firestore, "posts", postId), {
      isLocked: isLocked 
  })
    .then(
        // .then()'s first parameter runs on success, and the second runs when there is an error
        () => { 
            updateStatus.status = true
        },
        () => { 
            updateStatus.errorReason = "Request was not fulfilled."
        }
    )
  return updateStatus
}
