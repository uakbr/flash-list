/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import RecyclerFlatList from "./RecyclerFlatList";

/***
 * To test out just copy this component and render in you root component
 */
export default class Grid extends React.Component {

  render() {
    return (
      <RecyclerFlatList
        keyExtractor={(item) => {
          return item;
        }}
        numColumns={3}
        renderItem={(item) => {
          return (
            <Image style={{ borderWidth: 0.5, borderColor: '#000', aspectRatio: 1, flex: 1, resizeMode: 'cover' }} source={item.image} />
          );
        }
        }
        estimatedHeight={100}
        data={gridData}
      />
    );
  }
}

const gridData = [
  { image: require('./assets/img/2.jpg') },
  { image: require('./assets/img/3.jpg') },
  { image: require('./assets/img/4.jpg') },
  { image: require('./assets/img/5.jpg') },
  { image: require('./assets/img/6.jpg') },
  { image: require('./assets/img/7.jpg') },
  { image: require('./assets/img/8.jpg') },
  { image: require('./assets/img/9.jpg') },
  { image: require('./assets/img/10.jpg') },
  { image: require('./assets/img/11.jpg') },
  { image: require('./assets/img/12.jpg') },
  { image: require('./assets/img/13.jpg') },
  { image: require('./assets/img/14.jpg') },
  { image: require('./assets/img/15.jpg') },
  { image: require('./assets/img/16.jpg') },
  { image: require('./assets/img/17.jpg') },
  { image: require('./assets/img/18.jpg') },
  { image: require('./assets/img/19.jpg') },
  { image: require('./assets/img/20.jpg') },
  { image: require('./assets/img/21.jpg') },
  { image: require('./assets/img/22.jpg') },
  { image: require('./assets/img/23.jpg') },
  { image: require('./assets/img/24.jpg') },
  { image: require('./assets/img/25.jpg') },
  { image: require('./assets/img/26.jpg') },
  { image: require('./assets/img/27.jpg') },
  { image: require('./assets/img/28.jpg') },
  { image: require('./assets/img/29.jpg') },
  { image: require('./assets/img/30.jpg') },
  { image: require('./assets/img/31.jpg') },
  { image: require('./assets/img/32.jpg') },
  { image: require('./assets/img/33.jpg') },
  { image: require('./assets/img/34.jpg') },
  { image: require('./assets/img/35.jpg') },
  { image: require('./assets/img/36.jpg') },
  { image: require('./assets/img/37.jpg') },
  { image: require('./assets/img/38.jpg') },
  { image: require('./assets/img/39.jpg') },
  { image: require('./assets/img/40.jpg') },
  { image: require('./assets/img/41.jpg') },
  { image: require('./assets/img/42.jpg') },
  { image: require('./assets/img/43.jpg') },
  { image: require('./assets/img/44.jpg') },
  { image: require('./assets/img/45.jpg') },
  { image: require('./assets/img/46.jpg') },
  { image: require('./assets/img/47.jpg') },
  { image: require('./assets/img/48.jpg') },
  { image: require('./assets/img/49.jpg') },
  { image: require('./assets/img/50.jpg') },
  { image: require('./assets/img/51.jpg') },
  { image: require('./assets/img/52.jpg') },
  { image: require('./assets/img/53.jpg') },
  { image: require('./assets/img/54.jpg') },
  { image: require('./assets/img/55.jpg') },
  { image: require('./assets/img/56.jpg') },
  { image: require('./assets/img/57.jpg') },
  { image: require('./assets/img/58.jpg') },
  { image: require('./assets/img/59.jpg') },
  { image: require('./assets/img/60.jpg') },
  { image: require('./assets/img/61.jpg') },
  { image: require('./assets/img/62.jpg') },
  { image: require('./assets/img/63.jpg') },
  { image: require('./assets/img/64.jpg') },
  { image: require('./assets/img/65.jpg') },
  { image: require('./assets/img/66.jpg') },
  { image: require('./assets/img/67.jpg') },
  { image: require('./assets/img/68.jpg') },
  { image: require('./assets/img/69.jpg') },
  { image: require('./assets/img/70.jpg') },
  { image: require('./assets/img/71.jpg') },
  { image: require('./assets/img/72.jpg') },
  { image: require('./assets/img/73.jpg') },
  { image: require('./assets/img/74.jpg') },
  { image: require('./assets/img/75.jpg') },
  { image: require('./assets/img/76.jpg') },
  { image: require('./assets/img/77.jpg') },
  { image: require('./assets/img/78.jpg') },
  { image: require('./assets/img/79.jpg') },
  { image: require('./assets/img/80.jpg') },
  { image: require('./assets/img/81.jpg') },
  { image: require('./assets/img/82.jpg') },
  { image: require('./assets/img/83.jpg') },
  { image: require('./assets/img/84.jpg') },
  { image: require('./assets/img/85.jpg') },
  { image: require('./assets/img/86.jpg') },
  { image: require('./assets/img/87.jpg') },
  { image: require('./assets/img/88.jpg') },
  { image: require('./assets/img/89.jpg') },
  { image: require('./assets/img/90.jpg') },
  { image: require('./assets/img/91.jpg') },
  { image: require('./assets/img/92.jpg') },
  { image: require('./assets/img/93.jpg') },
  { image: require('./assets/img/94.jpg') },
  { image: require('./assets/img/95.jpg') },
  { image: require('./assets/img/96.jpg') },
  { image: require('./assets/img/97.jpg') },
  { image: require('./assets/img/98.jpg') },
  { image: require('./assets/img/99.jpg') },
  { image: require('./assets/img/100.jpg') },
  { image: require('./assets/img/101.jpg') },
  { image: require('./assets/img/102.jpg') },
  { image: require('./assets/img/103.jpg') }
];

const styles = {
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 120,
    backgroundColor: "#00a1f1",
  },
};
