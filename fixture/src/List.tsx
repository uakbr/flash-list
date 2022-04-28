/** *
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { Children, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  LayoutAnimation,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import { AnimatedFlashList, FlashList } from "@shopify/flash-list";
import Animated, {
  BaseAnimationBuilder,
  Layout,
} from "react-native-reanimated";

const generateArray = (size: number) => {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = i;
  }
  return arr;
};

const AnimatedView = Animated.createAnimatedComponent(View);

const createCellRenderer = (itemLayoutAnimation?: BaseAnimationBuilder) => {
  const cellRenderer: React.FC<{
    onLayout: (event: LayoutChangeEvent) => void;
  }> = (props) => {
    return (
      <AnimatedView
        layout={itemLayoutAnimation}
        onLayout={props.onLayout}
        {...props}
      >
        {props.children}
      </AnimatedView>
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

  const cellRenderer = React.useMemo(() => createCellRenderer(Layout), []);

  return (
    <AnimatedFlashList
      CellRendererComponent={cellRenderer}
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
