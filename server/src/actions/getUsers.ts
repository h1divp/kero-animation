import { doc, getDoc, getDocs, collection, query, orderBy, limit, where } from '@firebase/firestore'

import { users, firestore } from '../utilities/firebaseInit'
import { User } from '../types/User'

export const getUserById = async (postId: string) => {
  const ref = doc(users, postId)
  const userDoc = await getDoc(ref)

  if (!userDoc.exists()) return

  const data = userDoc.data()
  const userObj = {
      displayName: data.displayName,
      avatarUrl: data.avatarUrl,
      bio: data.bio,
      postIdCollection: data.postIdCollection,
      timeCreated: data.timeCreated,
      star1: data.star1,
      star2: data.star2,
      star3: data.star3,
      star4: data.star4
  }
  return userObj
}
