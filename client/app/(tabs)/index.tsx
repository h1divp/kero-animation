import { StyleSheet, Dimensions, SafeAreaView, StatusBar, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ref, list, getDownloadURL } from 'firebase/storage'

import { Text, View } from '../../components/Themed'
import { storage } from '../../utilities/firebaseInit'

type PostProps = {imgUrl: string}
const Post = ({imgUrl}: PostProps) => (
    <View style={styles.post}>
        <Image style={styles.image} source={{uri: imgUrl}} />
    </View>
)

export default function IndexScreen() {
  const [data, setData] = useState<Array<{imgUrl: string}>>([])
  useEffect(() => {
      setData([]) // clear data to prevent duplicates
      const fetchPosts = async () => {
          console.log('flag')
          // const listRef = ref(storage, 'images')
          // const imageUrls = await list(listRef, { maxResults: 20 })
          // console.log(imageUrls)

          getDownloadURL(ref(storage, 'images/kero.jpg')).then(url => {
              const urlData: {imgUrl: string} = {imgUrl: url}
              console.log(urlData)
              setData(oldData => [...oldData, urlData])
          })
        
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
    // alignItems: 'center',
    marginBottom: 10,
    width: Dimensions.get('window').width / 2 - 10,
    height: 160,
    // backgroundColor: '#fff',
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
