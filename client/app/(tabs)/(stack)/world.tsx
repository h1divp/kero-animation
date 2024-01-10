import { StyleSheet, Dimensions, SafeAreaView, StatusBar, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ref, list, getDownloadURL } from 'firebase/storage'
import { Link } from 'expo-router'

import { Text, View } from '../../../components/Themed'
import { storage } from '../../../utilities/firebaseInit'

type PostProps = {imgUrl: string}
const Post = ({imgUrl}: PostProps) => (
    <Link href='./post' asChild>
        <TouchableOpacity style={styles.post}>
            <Image style={styles.image} source={{uri: imgUrl}} />
        </TouchableOpacity>
    </Link>
)

export default function World() {
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
    <SafeAreaView style={styles.safeAreaContainer}>
        <FlatList
            data={data}
            renderItem={({item}) => <Post imgUrl={item.imgUrl} />}
            numColumns={2}
            columnWrapperStyle={styles.postList}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            keyExtractor={item => item.imgUrl}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#fff'
  },
  postList: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  post: {
    marginBottom: 10,
    width: Dimensions.get('window').width / 2 - 10,
    height: 160,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#BFE4FF',
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
      flex: 1,
      width: 100,
      height: undefined,
      aspectRatio: 1
  }
});
