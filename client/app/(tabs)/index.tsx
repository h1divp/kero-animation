import { StyleSheet, Dimensions, SafeAreaView, StatusBar, FlatList, Image } from 'react-native';

import { Text, View } from '../../components/Themed';

const DATA = [
    {
        imgUrl: "hehehe"
    },
    {
        imgUrl: "hehehe"
    },
    {
        imgUrl: "hehehe"
    },
    {
        imgUrl: "hehehe"
    },
    {
        imgUrl: "hehehe"
    },
    {
        imgUrl: "hehehe"
    },
    {
        imgUrl: "hehehe"
    },
    {
        imgUrl: "hehehe"
    },
    {
        imgUrl: "hehehe"
    },
    {
        imgUrl: "hehehe"
    },
    {
        imgUrl: "hehehe"
    },
    {
        imgUrl: "hehehe"
    },
]

type PostProps = {imgUrl: string};
const Post = ({imgUrl}: PostProps) => (
    <View style={styles.post}>
        <Image style={styles.image} source={require("../../assets/images/kero.jpg")} />
    </View>
)

export default function IndexScreen() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
        <FlatList
            data={DATA}
            renderItem={({item}) => <Post imgUrl={item.imgUrl} />}
            numColumns={2}
            columnWrapperStyle={styles.postList}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            keyExtractor={item => item.imgUrl}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginLeft: 5,
    marginRight: 5,
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
