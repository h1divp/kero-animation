import { StyleSheet, StatusBar, Text, View } from 'react-native'
import { useState, useEffect } from 'react'

export const PostScreen = () => {
  const [data, setData] = useState("")
  const getPostData = async () => {
    const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL
    const serverPort = process.env.EXPO_PUBLIC_SERVER_PORT
    const postData = await fetch(`${serverUrl}:${serverPort}/posts?postId=wsVoqVLvkYH2ukQHj7rY`, {
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
      const fetchPost = async () => {
          const data = await getPostData()
          setData(data)
          console.log("flag")
          console.log(data)
      }
  }, [])

  return (
      <View style={styles.View}>
          <Text>hiii :3</Text>
          <Text>{data}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    View: {
        backgroundColor: '#fff',
        marginTop: StatusBar.currentHeight || 0,
        height: 100
    }
})
