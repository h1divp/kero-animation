import { doc, setDoc } from '@firebase/firestore'
import { posts } from '../utilities/firebaseInit'

export const createPost = async (postId: string, authorId: string, frogUrl: string, timeCreated: number, star1: number, star2: number, star3: number, star4: number) => {
   const ref = doc(posts, postId) 
   const docData = {
       postId: postId,
       authorId: authorId,
       frogUrl: frogUrl,
       timeCreated: timeCreated,
       star1: star1,
       star2: star2,
       star3: star3,
       star4: star4,
   }

   setDoc(ref, docData)
}

