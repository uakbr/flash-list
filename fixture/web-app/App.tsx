import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { Twitter } from "./twitter";

export default function App() {
  return (
    <View style={styles.container}>
      <Twitter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});
