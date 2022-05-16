/** *
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

const generateArray = (size: number) => {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = { number: i, array: [i * 10, i * 100, i * 1000] };
  }
  return arr;
};

interface Item {
  number: number;
  array: number[];
}

const List = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(generateArray(100));

  const list = useRef<FlashList<number> | null>(null);

  const removeItem = (item: Item) => {
    setData(
      data.filter((dataItem) => {
        return dataItem.number !== item.number;
      })
    );
    list.current?.prepareForLayoutAnimationRender();
    // after removing the item, we start animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const renderItem = ({ item }: { item: Item }) => {
    const backgroundColor = item.number % 2 === 0 ? "#00a1f1" : "#ffbb00";
    return (
      <Pressable
        onPress={() => {
          removeItem(item);
        }}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor,
            height: item.number % 2 === 0 ? 100 : 200,
          }}
        >
          <Text>Cell Id: {item.number}</Text>
          {item.array.map((number, index) => {
            return <Text key={index}>Number: {number}</Text>;
          })}
        </View>
      </Pressable>
    );
  };

  return (
    <FlashList
      ref={list}
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }}
      keyExtractor={(item: Item) => {
        return item.number.toString();
      }}
      renderItem={renderItem}
      estimatedItemSize={100}
      data={data}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 120,
    backgroundColor: "#00a1f1",
  },
});
