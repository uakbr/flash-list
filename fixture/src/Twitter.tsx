import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { FlashListPerformanceView } from "@shopify/react-native-performance-lists-profiler";

import TweetCell from "./TweetCell";
import { tweets } from "./data/tweets";

const Twitter = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(tweets);
  return (
    <FlashListPerformanceView listName="Twitter">
      <FlashList
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
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => {
            setData([
              {
                author: {
                  name: "Aram Miquel",
                  screenName: "aram_miquel",
                  avatar:
                    "https://pbs.twimg.com/profile_images/1214669524009701379/NL0AFKcN_normal.jpg",
                },
                id: "1480837336535646209",
                fullText:
                  "Apple should pay more attention. It’s unfair to users, but even more to the small developers that play by the rules!",
                retweetCount: 2,
                replyCount: 1,
                favoriteCount: 5,
              },
              {
                author: {
                  name: "Gergely Orosz",
                  screenName: "GergelyOrosz",
                  avatar:
                    "https://pbs.twimg.com/profile_images/673095429748350976/ei5eeouV_normal.png",
                },
                id: "1480833114096214018",
                fullText:
                  "I write about real-world hiring insights for paid subscribers of https://t.co/SLe64y6YsX - many of whom are hiring managers themselves.\n\nIt might be a hard pill to swallow, but retaining existing folks, not overloading them with too many in-person interviews comes before hiring.",
                retweetCount: 0,
                replyCount: 0,
                favoriteCount: 3,
              },
            ]);
            setRefreshing(false);
          }, 200);
        }}
        data={data}
        // data={tweets}
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
