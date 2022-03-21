import React, { useRef } from "react";
import { FlatList } from "react-native";
import { FlatListPerformanceView } from "@shopify/react-native-performance-lists-profiler";
import {
  FlashList,
  useFlatListBenchmark,
  useDataMultiplier,
} from "@shopify/flash-list";
import { tweets } from "./data/tweets";
import TweetCell from "./TweetCell";
import { Header, Footer, Divider } from "./Twitter";
import { BenchConfig } from "./restyle/Constants";

const TwitterFlatList = () => {
  const ref = useRef(null);
  useFlatListBenchmark(
    ref,
    (res) => {
      alert(res.formattedString);
    },
    { ...BenchConfig, targetOffset: 150000 }
  );
  const [data] = useDataMultiplier(tweets, 1000);
  return (
    <FlatListPerformanceView listName="TwitterFlatList">
      <FlatList
        ref={ref}
        renderItem={({ item, index }) => {
          return <TweetCell tweet={item} />;
        }}
        ListHeaderComponent={Header}
        ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
        ListFooterComponent={Footer}
        ItemSeparatorComponent={Divider}
        data={data}
      />
    </FlatListPerformanceView>
  );
};

export default TwitterFlatList;
