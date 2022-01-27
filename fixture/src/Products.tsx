import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { RecyclerFlatList } from "@shopify/recycler-flat-list";
import { products } from "./data/products.js";

export interface Product {
  name: string;
  status: string;
  stock: number;
  variants: number;
  image: string;
}
const ProductCell = (data) => {
  const product: Product = data.item;
  return (
    <View style={styles.productCell}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: product.image }} />
      </View>
      <View>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.subtitle}>
          {product.variants} available · {product.variants} variants ·{" "}
          {product.status}
        </Text>
      </View>
    </View>
  );
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
  return <Button color="green" title={title}></Button>;
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
  imageContainer: {
    width: 44,
    height: 44,
    overflow: "hidden",
    marginRight: 8,
  },
  image: {
    flex: 1,
    width: 44,
    height: 44,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 6,
  },
  subtitle: {
    color: "#777",
    fontSize: 13,
  },
  productCell: {
    flexDirection: "row",
    height: 60,
    padding: 8,
    backgroundColor: "#FFF",
  },
});

export default Products;
