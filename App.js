import { View, Button, StyleSheet } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from "./Components/Carousel";

export default function AnimatedStyleUpdateExample(props) {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <Carousel />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    height: "100%",
    backgroundColor: "black"
  },
});
