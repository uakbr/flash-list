/** *
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

/** *
 * To test out just copy this component and render in you root component
 */

const generateArray = (size: number) => {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = { value: i };
  }
  return arr;
};

const List = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(generateArray(3000));

  const renderItem = ({ item }: { item: { value: number } }) => {
    const backgroundColor = item.value % 2 === 0 ? "#00a1f1" : "#ffbb00";
    return (
      <View
        style={{
          ...styles.container,
          backgroundColor,
          height: item.value % 2 === 0 ? 100 : 200,
        }}
      >
        <Text>Cell Id: {item.value}</Text>
      </View>
    );
  };

  return (
    <FlashList
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        setTimeout(() => {
          setData(generateArray(2));
          setRefreshing(false);
        }, 100);
      }}
      keyExtractor={(item: { value: number }) => {
        return item.value.toString();
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
