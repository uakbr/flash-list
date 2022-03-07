/** *
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React from "react";
import { View, Text, Pressable, LayoutAnimation } from "react-native";
import { RecyclerFlatList } from "@shopify/recycler-flat-list";

/** *
 * To test out just copy this component and render in you root component
 */
export default class List extends React.Component {
  state = {
    refreshing: false,
    data: this._generateArray(3000),
  };

  private _generateArray(size) {
    const arr = new Array<number>(size);
    for (let i = 0; i < size; i++) {
      arr[i] = i;
    }
    return arr;
  }

  render() {
    const removeItem = (item) => {
      this.setState({
        data: this.state.data.filter((dataItem) => {
          return dataItem !== item;
        }),
        refreshing: this.state.refreshing,
      });
      // after removing the item, we start animation
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    return (
      <RecyclerFlatList
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true });
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 2000);
        }}
        keyExtractor={(item) => {
          return item;
        }}
        renderItem={({ item }) => {
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
        }}
        estimatedItemSize={200}
        data={this.state.data}
      />
    );
  }
}

const styles = {
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 120,
    backgroundColor: "#00a1f1",
  },
};
