import { doc, getDoc, deleteDoc} from '@firebase/firestore'
import { posts } from '../utilities/firebaseInit'

export const deleteUserById = async (postId: string) => {
  // TODO: find a way to assuredly know if a document is deleted after deleteDoc is called.
  const ref = doc(posts, postId)
  const userDoc = await getDoc(ref)
  const deletionStatus = {
      errorReason: "",
      status: false
  }
  
  if (!userDoc.exists()) {
      // Do not attempt to delete the requested doc if it does not exist.
      deletionStatus.errorReason = "User does not exist"
      return deletionStatus
  }

  await deleteDoc(ref)
    .then(
        // .then()'s first parameter runs on success, and the second runs when there is an error
        () => { 
            deletionStatus.status = true
        },
        () => { 
            deletionStatus.errorReason = "Request was not fulfilled."
        }
    )
  return deletionStatus
}
