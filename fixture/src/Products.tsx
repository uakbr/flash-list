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
import FastImage from "react-native-fast-image";

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
        <FastImage style={styles.image} source={{ uri: product.image }} />
      </View>
      <View>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.subtitle}>
          {product.stock} available · {product.variants} variants ·{" "}
          {product.status}
        </Text>
      </View>
    </View>
  );
};

const Checkbox = ({ editing, selected }) => {
  return (
    <Image
      style={{ width: 20, height: 20, display: !editing ? "none" : "flex" }}
      source={
        editing && selected
          ? require("./assets/on.png")
          : require("./assets/off.png")
      }
    ></Image>
  );
};

const EditingItem = (props) => {
  const appear = useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = useState(false);
  const editing = props.editing;

  const ToggleSelected = () => {
    if (!editing) return;
    props.onSelectToggle(props.index);
    setSelected(!selected);
  };

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  useEffect(() => {
    const newValue = props.editing ? 44 : 8;
    Animated.spring(appear, {
      toValue: newValue,
      bounciness: 0,
      useNativeDriver: false,
    }).start();
  }, [appear, editing]);

  const rowStyle = [
    { flexGrow: 1, backgroundColor: "#FFF" },
    editing && selected ? styles.selected : {},
  ];

  const touchableStyle = [
    styles.editingItemTouchable,
    editing && selected ? styles.selected : {},
  ];

  return (
    <TouchableOpacity
      onPress={ToggleSelected}
      style={touchableStyle}
      disabled={!editing}
    >
      <Animated.View
        style={{
          width: appear,
          alignItems: "center",
        }}
      >
        <Checkbox selected={selected} editing={editing} />
      </Animated.View>
      <View style={rowStyle}>{props.children}</View>
    </TouchableOpacity>
  );
};

const productsMult = products
  .map(function (elem) {
    return products;
  })
  .flat();

const Products = ({ navigation }) => {
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const StartEditing = () => {
    setSelected([]);
    setEditing(editing ? false : true);
  };
  const shopifyGreen = "#058060";
  navigation.setOptions({
    headerTintColor: shopifyGreen,
    title: editing ? "Select products" : "Products",
    headerRight: () => (
      <Button
        onPress={StartEditing}
        color={shopifyGreen}
        title={editing ? "Done" : "Select"}
      />
    ),
  });

  const OnSelectToggle = (index) => {
    const s = selected;
    if (selected.includes(index)) {
      s.pop(index);
    } else {
      s.push(index);
    }
    setSelected(s);
  };
  const OnRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <RecyclerFlatList
      refreshing={refreshing}
      onRefresh={OnRefresh}
      keyExtractor={(item) => {
        return item.id;
      }}
      extraData={{ editing: editing, selected: selected }}
      renderItem={(data, index) => {
        const item = data.item;
        return (
          <EditingItem
            editing={editing}
            onSelectToggle={OnSelectToggle}
            index={data.index}
            selected={index ? selected.includes(index) : false}
          >
            <ProductCell item={item} />
          </EditingItem>
        );
      }}
      ListHeaderComponent={Header}
      ListHeaderCompomentStyle={{ backgroundColor: "#ccc" }}
      // ListFooterComponent={Footer}
      estimatedHeight={60}
      ItemSeparatorComponent={Divider}
      data={productsMult}
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
    <Image
      style={{ width: "100%", height: 110, resizeMode: "contain" }}
      source={require("./assets/fakeheader.png")}
    />
  );
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
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  selected: {
    backgroundColor: "#efefef",
  },
  editingItemTouchable: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    alignItems: "center",
  },
});

export default Products;
