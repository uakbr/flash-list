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
import { CellContainer, FlashList } from "@shopify/flash-list";
import Animated, { Layout } from "react-native-reanimated";

const generateArray = (size: number) => {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = i;
  }
  return arr;
};

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const createCellRenderer = () => {
  const cellRenderer: React.FC = (props) => {
    return (
      <Animated.View layout={Layout.duration(3000)}>
        <CellContainer>{props.children}</CellContainer>
      </Animated.View>
    );
  };

  return cellRenderer;
};

const List = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(generateArray(100));

  const list = useRef<FlashList<number> | null>(null);

  const removeItem = (item: number) => {
    setData(
      data.filter((dataItem) => {
        return dataItem !== item;
      })
    );
    list.current?.prepareForLayoutAnimationRender();
    // after removing the item, we start animation
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const renderItem = ({ item }: { item: number }) => {
    const backgroundColor = item % 2 === 0 ? "#00a1f1" : "#ffbb00";
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
            height: item % 2 === 0 ? 100 : 200,
          }}
        >
          <Text>Cell Id: {item}</Text>
        </View>
      </Pressable>
    );
  };

  const cellRenderer = React.useMemo(() => createCellRenderer(), []);

  return (
    <AnimatedFlashList
      ref={list}
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }}
      keyExtractor={(item: number) => {
        return item.toString();
      }}
      CellRendererComponent={cellRenderer}
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
