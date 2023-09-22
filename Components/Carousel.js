import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

function Item({ index, color, performSwipe, length }) {
  var offset = useSharedValue(0);
  var verticalOffset = useSharedValue(0);

  const inputRange = [0, 150, 500];

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      offset.value = event.translationX;
      verticalOffset.value = event.translationY;
    })
    .onFinalize((event) => {
      if (Math.abs(event.translationX) > 120 || Math.abs(event.translationY) > 120) {
        runOnJS(performSwipe)();
      }
      offset.value = withTiming(0);
      verticalOffset.value = withTiming(0);
    });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value },
        { translateY: verticalOffset.value },
        { scaleX: withTiming(-Math.max(1 - (length - index - 1) / 10, 0.8)) },
        { translateY: withTiming(Math.min((length - index - 1) * 15, 30)) },
      ],
      zIndex: index,
      height: 200,
      width: 200,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[styles.box1, { backgroundColor: color }, cardStyle]}
      ></Animated.View>
    </GestureDetector>
  );
}

export default function Carousel() {
  const [indexData, setIndexData] = useState([
    "#2f7fb3",
    "#f8766d",
    "#009e41",
    "orange",
    "purple",
    "teal",
  ]);

  function performSwipe() {
    setIndexData((lastData) => {
      var lastElement = lastData.pop();
      lastData.unshift(lastElement);
      console.log("lastData", lastData);
      return [...lastData];
    });
  }

  return (
    <View style={{ height: "100%" }}>
      <View style={styles.container}>
        {indexData.map((color, index) => {
          return (
            <Item
              color={color}
              index={index}
              performSwipe={performSwipe}
              key={color}
              length={indexData.length}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    top: "50%",
  },

  box1: {
    position: "absolute",
    cursor: "grab",
    borderRadius: 12,
    borderColor: "white",
    borderWidth: 2
  },
});
