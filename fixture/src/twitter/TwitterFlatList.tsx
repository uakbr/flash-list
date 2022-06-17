import React, { useContext } from "react";
import { FlatList, View } from "react-native";

import { DebugContext } from "../Debug";

import { tweets } from "./data/tweets";
import TweetCell from "./TweetCell";
import { Header, Footer, Divider, Empty } from "./Twitter";

const TwitterFlatList = () => {
  const debugContext = useContext(DebugContext);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        testID="FlatList"
        keyExtractor={(_, index) => {
          return index.toString();
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
      />
    </View>
  );
};

export default TwitterFlatList;
