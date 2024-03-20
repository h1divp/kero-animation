import React from 'react'
import { Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

interface PostProps {
  imgUrl: string
}

export const Post: React.FC<PostProps> = ({ imgUrl }) => {
    return (
      <Link href='./post' asChild>
          <TouchableOpacity style={styles.post}>
              <Image style={styles.image} source={{uri: imgUrl}} />
          </TouchableOpacity>
      </Link>
    )
}

const styles = StyleSheet.create({
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
  image: {
      flex: 1,
      width: 100,
      height: undefined,
      aspectRatio: 1
  }
})
