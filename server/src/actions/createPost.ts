import { doc, setDoc } from '@firebase/firestore'
import { posts } from '../utilities/firebaseInit'

export const createPost = async (postId: string, authorId: string, frogUrl: string, title: string, tags: string, isLocked: boolean, timeCreated: number, star1: number, star2: number, star3: number, star4: number) => {
   const ref = doc(posts, postId) 
   const docData = {
       authorId: authorId,
       frogUrl: frogUrl,
       title: title,
       tags: tags,
       isLocked: isLocked,
       timeUpdated: timeCreated, // both of these are the same
       timeCreated: timeCreated,
       star1: star1,
       star2: star2,
       star3: star3,
       star4: star4,
   }
   setDoc(ref, docData)
}
