import React, { useContext, useRef } from "react";
import { Alert, FlatList } from "react-native";
import { FlatListPerformanceView } from "@shopify/react-native-performance-lists-profiler";
import { useFlatListBenchmark } from "@shopify/flash-list";
import { SwipeableProvider } from "@shopify/react-native-swipe-actions";

import { DebugContext } from "../Debug";

import { tweets } from "./data/tweets";
import TweetCell from "./TweetCell";
import { Header, Footer, Divider } from "./Twitter";
import Tweet from "./models/Tweet";

const TwitterFlatList = () => {
  const debugContext = useContext(DebugContext);
  const flatListRef = useRef<FlatList<Tweet>>(null);
  // useFlatListBenchmark(
  //   flatListRef,
  //   (report) => {
  //     Alert.alert("Report", report.formattedString ?? "");
  //   },
  //   { targetOffset: 1000000 }
  // );

  return (
    <SwipeableProvider>
      <FlatListPerformanceView listName="TwitterFlatList">
        <FlatList
          ref={flatListRef}
          testID="FlatList"
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return <TweetCell tweet={item} />;
          }}
          ListHeaderComponent={Header}
          ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
          ListFooterComponent={Footer}
          ItemSeparatorComponent={Divider}
          data={tweets}
          initialScrollIndex={debugContext.initialScrollIndex}
        />
      </FlatListPerformanceView>
    </SwipeableProvider>
  );
};

export default TwitterFlatList;
