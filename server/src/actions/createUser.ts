import { doc, setDoc } from '@firebase/firestore'
import { users } from '../utilities/firebaseInit'

export const createUser = async (userId: string, displayName: string, avatarUrl: string, bio: string, postIdCollection: Array<string>, timeCreated: number, star1: number, star2: number, star3: number, star4: number) => {
   const ref = doc(users, userId) 
   const docData = {
       displayName: displayName,
       avatarUrl: avatarUrl,
       bio: bio,
       postIdCollection: postIdCollection,
       timeCreated: timeCreated,
       star1: star1,
       star2: star2,
       star3: star3,
       star4: star4,
   }
   setDoc(ref, docData)
}
