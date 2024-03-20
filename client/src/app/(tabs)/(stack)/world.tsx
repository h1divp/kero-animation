import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { WorldScreen } from "../../../components/World/WorldScreen";
import { StyledSafeArea } from "../../../components/Common/SafeAreaView";

export default function World() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <WorldScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff'
  },
})
