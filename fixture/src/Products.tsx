import React, { useEffect, useRef, useState } from "react";
import { HeaderBackButton } from "@react-navigation/stack";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Animated,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { RecyclerFlatList } from "@shopify/recycler-flat-list";
import { products } from "./data/products.js";
import FastImage from "react-native-fast-image";
import { SearchBar } from "react-native-screens";

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
          <Text style={product.stock === 0 ? { color: "#aa0a0a" } : {}}>
            {product.stock} available
          </Text>{" "}
          · {product.variants} variants · {product.status}
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
    <TouchableHighlight
      activeOpacity={1.0}
      onPress={ToggleSelected}
      style={touchableStyle}
      disabled={!editing}
      underlayColor={"#efefef"}
    >
      <View
        style={[
          rowStyle,
          { flex: 1, flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Animated.View
          style={{
            width: appear,
            alignItems: "center",
          }}
        >
          <Checkbox selected={selected} editing={editing} />
        </Animated.View>
        <View>{props.children}</View>
      </View>
    </TouchableHighlight>
  );
};

const productsSorted = products.sort(function (a, b) {
  return a.name > b.name ? 1 : -1;
});

const values = new Map(
  productsSorted.map((item) => [item["name"], item])
).values();
console.log("values");
console.log(values);
const productsMult = [...values];

const Products = ({ navigation }) => {
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const StartEditing = () => {
    setSelected([]);
    setEditing(editing ? false : true);
  };

  const Title = () => {
    if (editing) {
      if (selectedCount === 0) {
        return "Select products";
      } else {
        return selectedCount + " selected";
      }
    } else {
      return "Products";
    }
  };

  useEffect(() => {
    const shopifyGreen = "#058060";
    navigation.setOptions({
      headerTintColor: shopifyGreen,
      headerBackTitle: "Products",
      headerTitleStyle: {
        color: "black",
      },
      title: Title(),
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: 8 }}>
          <Button
            onPress={StartEditing}
            color={shopifyGreen}
            title={editing ? "Done" : "Select"}
          />
          <Button color={shopifyGreen} title="+" />
        </View>
      ),
    });
  }, [navigation, editing, selectedCount]);

  const OnSelectToggle = (index) => {
    const s = selected;
    if (selected.includes(index)) {
      s.pop(index);
    } else {
      s.push(index);
    }
    setSelected(s);
    setSelectedCount(s.length);
  };
  const OnRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const fakeHeader = require("./assets/fakeheader.png");

  const Header = () => {
    const opacity = editing ? 0.5 : 1.0;
    return (
      <FastImage
        style={{
          width: "100%",
          height: 110,
          opacity: opacity,
        }}
        source={fakeHeader}
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

  return (
    <FlatList
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

const Footer = () => {
  return <View style={styles.footer}></View>;
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ddd",
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
  // editingItemTouchable: {
  //   flexDirection: "row",
  //   backgroundColor: "#FFF",
  //   alignItems: "center",
  // },
});

export default Products;
