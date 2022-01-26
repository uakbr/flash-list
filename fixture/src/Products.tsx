import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RecyclerFlatList } from "@shopify/recycler-flat-list";
import { products } from "./data/products.js";

const ProductCell = () => {
  return <View />;
};
const Products = () => {
  return (
    <RecyclerFlatList
      keyExtractor={(item) => {
        return item.id;
      }}
      renderItem={({ item }) => {
        return <ProductCell item={item} />;
      }}
      ListHeaderComponent={Header}
      ListHeaderCompomentStyle={{ backgroundColor: "#ccc" }}
      ListFooterComponent={Footer}
      estimatedHeight={150}
      ItemSeparatorComponent={Divider}
      data={products}
    />
  );
};

const Divider = () => {
  return <View style={styles.divider} />;
};

const HeaderButton = ({ title }) => {
  return (
    <Button color="#fabada" backgroundColor="#fabada" title={title}></Button>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <HeaderButton title="All"></HeaderButton>
      <HeaderButton title="Active"></HeaderButton>
      <HeaderButton title="Draft"></HeaderButton>
      <HeaderButton title="Archived"></HeaderButton>
    </View>
  );
};
const Footer = () => {
  return <View style={styles.footer}></View>;
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#aaa",
  },
  header: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
  headerButton: {
    backgroundColor: "green",
  },
});

export default Products;
