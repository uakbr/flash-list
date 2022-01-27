import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Animated,
  TouchableOpacity,
} from "react-native";
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

const EditingItem = (props) => {
  const appear = useRef(new Animated.Value(0)).current;

  const [selected, setSelected] = useState(false);

  const ToggleSelected = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    const newValue = props.editing ? 44 : 0;
    Animated.spring(appear, {
      toValue: newValue,
      bounciness: 0,
      useNativeDriver: false,
    }).start();
  }, [appear, props.editing]);

  return (
    <TouchableOpacity
      onPress={ToggleSelected}
      style={[
        { flexDirection: "row", alignItems: "center" },
        selected ? styles.selected : { backgroundColor: "#FFF" },
      ]}
    >
      <Animated.View style={{ width: appear, alignItems: "center" }}>
        <Image
          style={{ width: 20, height: 20 }}
          source={
            props.editing && selected
              ? require("./assets/on.png")
              : require("./assets/off.png")
          }
        ></Image>
      </Animated.View>
      <View
        style={[
          { flexGrow: 1 },
          props.editing && selected
            ? styles.selected
            : { backgroundColor: "#FFF" },
        ]}
      >
        {props.children}
      </View>
    </TouchableOpacity>
  );
};
const Products = ({ navigation }) => {
  const [editing, setEditing] = useState(false);

  const StartEditing = () => {
    setEditing(editing ? false : true);
  };

  navigation.setOptions({
    headerRight: () => (
      <Button onPress={StartEditing} title={editing ? "Done" : "Edit"} />
    ),
  });

  return (
    <RecyclerFlatList
      keyExtractor={(item) => {
        return item.id + editing;
      }}
      extraData={editing}
      renderItem={({ item }) => {
        return (
          <EditingItem editing={editing}>
            <ProductCell item={item} />
          </EditingItem>
        );
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
    backgroundColor: "#ccc",
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
  },
  selected: {
    backgroundColor: "#efefef",
  },
});

export default Products;
