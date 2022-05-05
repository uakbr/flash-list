import React, { useContext, useRef } from "react";
import { FlatList, View } from "react-native";

import { DebugContext } from "../Debug";

import { tweets } from "./data/tweets";
import TweetCell from "./TweetCell";
import { Header, Footer, Divider, Empty } from "./Twitter";

const TwitterFlatList = () => {
  const debugContext = useContext(DebugContext);
  const flatList = useRef<FlatList>(null);
  setTimeout(() => {
    console.log("node: ", flatList.current?.getScrollableNode());
    console.log("native scroll ref:", flatList.current?.getNativeScrollRef());
    console.log("Scroll responder:", flatList.current?.getScrollResponder());
    flatList.current?.flashScrollIndicators();
    flatList.current?.setNativeProps({ scrollEnabled: false });
  }, 500);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatList}
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
        ListEmptyComponent={Empty()}
        data={debugContext.emptyListEnabled ? [] : tweets}
        initialScrollIndex={debugContext.initialScrollIndex}
        viewabilityConfig={{
          waitForInteraction: true,
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 1000,
        }}
        onViewableItemsChanged={(info) => {
          console.log(info);
        }}
      />
    </View>
  );
};

export default TwitterFlatList;
