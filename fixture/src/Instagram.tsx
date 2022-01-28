import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RecyclerFlatList } from "@shopify/recycler-flat-list";
import { photos } from "./data/photos.js";
import FastImage from "react-native-fast-image";

const Icon = ({ asset }) => {
  return (
    <View>
      <Image
        style={{ width: 30, height: 30, margin: 8, marginRight: 6 }}
        source={asset}
      ></Image>
    </View>
  );
};
const InstagramActions = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Icon asset={require("./assets/instalike.png")} />
      <Icon asset={require("./assets/instacomment.png")} />
      <Icon asset={require("./assets/message.png")} />
      <View style={{ flexGrow: 1 }}></View>
      <Icon asset={require("./assets/bookmark.png")} />
    </View>
  );
};

const InstagramCell = ({ item }) => {
  return (
    <View style={{ marginBottom: 10, backgroundColor: "#FFF" }}>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 8,
          paddingTop: 8,
          alignItems: "center",
          marginLeft: 8,
        }}
      >
        <FastImage
          style={{ width: 40, height: 40, borderRadius: 20 }}
          source={{
            uri: "https://scontent-mad1-1.cdninstagram.com/v/t51.2885-19/s320x320/123295080_1046024422532406_8491171948819305446_n.jpg?_nc_ht=scontent-mad1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=ecDrsUMQwbgAX-8a6oi&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT-xlR2zAmrqZOYOu8j3TOHOaUhbkQoZoA2ZX5rAph52pA&oe=61F908A2&_nc_sid=7bff83",
          }}
        ></FastImage>
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            @beckiandchris
          </Text>
        </View>
      </View>

      <FastImage
        style={{ height: 400, width: "100%" }}
        source={{ uri: item.image }}
      ></FastImage>
      <InstagramActions />
      <View style={{ padding: 8 }}>
        <Text>Liked by davebcn87</Text>
        <Text>davebcn87: Nice picture!</Text>
      </View>
    </View>
  );
};

const Instagram = () => {
  return (
    <RecyclerFlatList
      keyExtractor={(item) => {
        return item.name;
      }}
      renderItem={({ item }) => {
        return <InstagramCell item={item} />;
      }}
      ListHeaderCompomentStyle={{ backgroundColor: "#ccc" }}
      estimatedHeight={800}
      ItemSeparatorComponent={Divider}
      data={photos}
    />
  );
};

const Divider = () => {
  return <View style={styles.divider} />;
};

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>New tweets available</Text>
    </View>
  );
};
const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerTitle}>No more tweets</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#DDD",
  },
  header: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DA1F2",
  },
  footer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    padding: 8,
    borderRadius: 12,
    fontSize: 12,
  },
  footerTitle: {
    padding: 8,
    borderRadius: 12,
    fontSize: 12,
  },
});

export default Instagram;
