import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from '@firebase/firestore'
import { users, firestore } from '../utilities/firebaseInit'

export const updateUserStarCount = async (userId: string, starType: number, starVal: number, method: string) => {
  const ref = doc(users, userId)
  const userDoc = await getDoc(ref)
  const updateStatus = {
      errorReason: "",
      status: false
  }

  if (!userDoc.exists()) {
      updateStatus.errorReason = "Post does not exist"
      return updateStatus
  }

  const starTypeStr = "star" + starType;
  let starCount: number = userDoc.data()[starTypeStr];
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
  
  await updateDoc(doc(firestore, "users", userId), updateObj)
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

export const addPostId = async (userId: string, postId: string) => {
  const ref = doc(users, userId)
  const userDoc = await getDoc(ref)
  const updateStatus = {
      errorReason: "",
      status: false
  }

  if (!userDoc.exists()) {
      updateStatus.errorReason = "Post does not exist"
      return updateStatus
  }

  await updateDoc(doc(firestore, "users", userId), {
      postIdCollection: arrayUnion(postId)
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

export const removePostId = async (userId: string, postId: string) => {
  const ref = doc(users, userId)
  const userDoc = await getDoc(ref)
  const updateStatus = {
      errorReason: "",
      status: false
  }

  if (!userDoc.exists()) {
      updateStatus.errorReason = "Post does not exist"
      return updateStatus
  }

  await updateDoc(doc(firestore, "users", userId), {
      postIdCollection: arrayRemove(postId)
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

export const updateUserDisplayName = async (userId: string, displayName: string) => {
  const ref = doc(users, userId)
  const userDoc = await getDoc(ref)
  const updateStatus = {
      errorReason: "",
      status: false
  }

  if (!userDoc.exists()) {
      updateStatus.errorReason = "Post does not exist"
      return updateStatus
  }

  await updateDoc(doc(firestore, "users", userId), {
      displayName: displayName
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

export const updateUserAvatarUrl = async (userId: string, avatarUrl: string) => {
  const ref = doc(users, userId)
  const userDoc = await getDoc(ref)
  const updateStatus = {
      errorReason: "",
      status: false
  }

  if (!userDoc.exists()) {
      updateStatus.errorReason = "Post does not exist"
      return updateStatus
  }

  await updateDoc(doc(firestore, "users", userId), {
      avatarUrl: avatarUrl
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

export const updateUserBio = async (userId: string, bio: string) => {
  const ref = doc(users, userId)
  const userDoc = await getDoc(ref)
  const updateStatus = {
      errorReason: "",
      status: false
  }

  if (!userDoc.exists()) {
      updateStatus.errorReason = "Post does not exist"
      return updateStatus
  }

  await updateDoc(doc(firestore, "users", userId), {
      bio: bio
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
