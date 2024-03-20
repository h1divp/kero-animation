import { useState, useEffect } from 'react'
import { FlatList, StatusBar, StyleSheet } from 'react-native'
import { ref, list, getDownloadURL } from 'firebase/storage'
import { storage } from '../../utilities/firebaseInit'

import { Post } from './Post'

export const WorldScreen = () => {
  const [data, setData] = useState<Array<{imgUrl: string}>>([])

  const getPostData = async () => {
    const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL
    const serverPort = process.env.EXPO_PUBLIC_SERVER_PORT
    const postData = await fetch(`${serverUrl}:${serverPort}/posts`, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "same-origin",
    })
    return postData.json()
  }

  useEffect(() => {
      setData([]) // clear data to prevent duplicates
      const fetchPosts = async () => {
          try {
              const postData = await getPostData()
              for (const post of postData) {
                  const thumbPath: string = post.frogUrl
                  getDownloadURL(ref(storage, thumbPath)).then(url => {
                      const urlData: {imgUrl: string} = {imgUrl: url}
                      setData(oldData => [...oldData, urlData])
                  })
              }
          } catch(err) {
              console.error(err)
          }
      }
      fetchPosts();
  }, [])
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Post imgUrl={item.imgUrl} />}
      numColumns={2}
      columnWrapperStyle={styles.postList}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      keyExtractor={item => item.imgUrl}
    />
  )
}

const styles = StyleSheet.create({
  postList: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
