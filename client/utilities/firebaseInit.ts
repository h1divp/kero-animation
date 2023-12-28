import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Make sure that config is up to date in /.env
export const firebaseApp = initializeApp({
  apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINSENDERID,
  appId: process.env.EXPO_PUBLIC_APPID,
})

export const storage = getStorage(firebaseApp)

console.log("Storage database synced")
