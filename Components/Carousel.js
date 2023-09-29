import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

function Item({ index, src, performSwipe, length }) {
  var offset = useSharedValue(0);
  var verticalOffset = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      offset.value = event.translationX;
      verticalOffset.value = event.translationY;
    })
    .onFinalize((event) => {
      if (
        Math.abs(event.translationX) > 120 ||
        Math.abs(event.translationY) > 120
      ) {
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
        {
          scaleX: withTiming(
            Math.max(
              1 - (length - index - 1) / 10 + 0.05 * (length - index - 1),
              0.8
            )
          ),
        },
        { translateY: withTiming(Math.min((length - index - 1) * 5, 10)) },
      ],
      zIndex: index,
      height: 200,
      width: 200,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.Image
        style={[styles.box1, cardStyle]}
        source={{
          url: src,
        }}
      ></Animated.Image>
    </GestureDetector>
  );
}

export default function Carousel() {
  const [indexData, setIndexData] = useState([
    "https://i.ibb.co/B4gb0HT/Screenshot-2023-09-21-at-11-31-15-AM.png",
    "https://i.ibb.co/tMhHdzr/Screenshot-2023-09-21-at-11-31-29-AM.png",
    "https://i.ibb.co/qp4Y18N/Screenshot-2023-09-21-at-7-34-54-PM.png",
    "https://i.ibb.co/ch46Cx5/Screenshot-2023-09-21-at-7-35-46-PM.png",
    "https://i.ibb.co/qxcZb55/Screenshot-2023-09-21-at-7-35-57-PM.png",
    "https://i.ibb.co/s5n1Pdv/Screenshot-2023-09-21-at-11-14-51-AM.png",
  ]);

  function performSwipe() {
    setIndexData((lastData) => {
      var lastElement = lastData.pop();
      lastData.unshift(lastElement);
      return [...lastData];
    });
  }

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          flex: 1,
          backgroundColor: "red",
        }}
      >
        <Image
          height={"100%"}
          resizeMode="streach"
          source={{
            url: "https://i.ibb.co/pPKzZZ3/iphone-14-pro-1080x1920-abstract-ios-16-4k-24141.jpg",
          }}
        ></Image>
      </View>
      <View style={styles.container}>
        {indexData.map((src, index) => {
          return (
            <Item
              src={src}
              index={index}
              performSwipe={performSwipe}
              key={src}
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
    top: "60%",
  },

  box1: {
    position: "absolute",
    cursor: "grab",
    borderRadius: 12,
    borderColor: "white",
    borderWidth: 0.5,
  },
});
