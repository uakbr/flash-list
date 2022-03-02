import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Pressable,
} from "react-native";
import { RecyclerFlatList } from "@shopify/recycler-flat-list";
import { RecyclerFlatListPerformanceView } from "@shopify/react-native-performance-lists-profiler";

import { tweets as tweetsData } from "./data/tweets";
import TweetCell from "./TweetCell";

const Twitter = () => {
  const [tweets, setTweets] = useState(tweetsData);
  const removeItem = (id) => {
    const filteredTweets = tweets.filter((item) => {
      return item.id !== id;
    });
    setTweets(filteredTweets);
    // after removing the item, we start animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <RecyclerFlatListPerformanceView listName="Twitter">
      <RecyclerFlatList
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                removeItem(item.id);
              }}
            >
              <TweetCell item={item} />
            </Pressable>
          );
        }}
        ListHeaderComponent={Header}
        ListHeaderCompomentStyle={{ backgroundColor: "#ccc" }}
        ListFooterComponent={Footer}
        estimatedItemSize={150}
        ItemSeparatorComponent={Divider}
        data={tweets}
      />
    </RecyclerFlatListPerformanceView>
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
