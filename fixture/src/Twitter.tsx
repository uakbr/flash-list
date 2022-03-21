import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  FlashList,
  useBenchmark,
  useDataMultiplier,
} from "@shopify/flash-list";
import { FlashListPerformanceView } from "@shopify/react-native-performance-lists-profiler";

import TweetCell from "./TweetCell";
import { tweets } from "./data/tweets";
import { BenchConfig } from "./restyle/Constants";

const Twitter = () => {
  const ref = useRef(null);
  useBenchmark(
    ref,
    (res) => {
      alert(res.formattedString);
    },
    { ...BenchConfig }
  );
  const [data] = useDataMultiplier(tweets, 1000);
  return (
    <FlashListPerformanceView listName="Twitter">
      <FlashList
        ref={ref}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return <TweetCell tweet={item} />;
        }}
        ListHeaderComponent={Header}
        ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
        ListFooterComponent={Footer}
        estimatedItemSize={150}
        ItemSeparatorComponent={Divider}
        data={data}
      />
    </FlashListPerformanceView>
  );
};

export const Divider = () => {
  return <View style={styles.divider} />;
};

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>New tweets available</Text>
    </View>
  );
};

export const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerTitle}>No more tweets</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#DDD",
  },
  header: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DA1F2",
  },
  footer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    padding: 8,
    borderRadius: 12,
    fontSize: 12,
  },
  footerTitle: {
    padding: 8,
    borderRadius: 12,
    fontSize: 12,
  },
});

export default Twitter;
