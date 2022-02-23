import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { RecyclerFlatList } from "@shopify/recycler-flat-list";
import Animated, {
  FadeOut,
  Layout,
  SlideOutRight,
} from "react-native-reanimated";

interface Reminder {
  title: string;
  selected: boolean;
}

const Checkbox = (props) => {
  if (props.on) {
    return (
      <Image
        style={styles.checkboxImage}
        source={require("./assets/checkboxOn.png")}
      />
    );
  } else {
    return (
      <Image
        style={styles.checkboxImage}
        source={require("./assets/checkboxOff.png")}
      />
    );
  }
};

const ReminderCell = (props) => {
  const item = props.item.item;
  const [on, setOn] = React.useState(false);
  const currentValue = React.useRef({ text: "" });

  const toggle = () => {
    setOn(!on);
  };

  useEffect(() => {
    if (on) {
      setTimeout(() => {
        props.onCompleted();
        setOn(false);
      }, 1000);
    }
  }, [on]);

  return (
    <Animated.View style={styles.cell} layout={Layout} exiting={SlideOutRight}>
      <View style={styles.checkbox}>
        <TouchableOpacity onPress={toggle}>
          <Checkbox on={on} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          const newText = text.replace("\n", "");
          currentValue.current.text = newText;
          props.onChangeText(newText);
        }}
        value={item.title}
        autoFocus
        multiline
        numberOfLines={0}
        onKeyPress={({ nativeEvent: { key: keyValue } }) => {
          if (keyValue === "Enter") {
            props.onIntroPressed();
            return false;
          }
        }}
        onEndEditing={(text) => {
          console.log(currentValue.current.text);

          // if (currentValue.current.text.length === 0) {
          //   props.onCompleted();
          // }
        }}
      />
    </Animated.View>
  );
};

const Reminders = () => {
  const [reminders, setReminders] = React.useState([] as Reminder[]);

  const addReminder = () => {
    setReminders([...reminders, { title: "", selected: false }]);
    // setTimeout(() => {
    //   list.current.scrollToEnd({ animated: false });
    // }, 400);
  };

  const updateTitle = (item: Reminder, title) => {
    const index = reminders.indexOf(item);
    console.log(index);

    const elem = reminders[index];
    console.log(elem);

    const updatedElem = { ...elem, title };
    const items = [...reminders];
    items[index] = updatedElem;
    setReminders(items);
  };

  const removeItem = (reminder: Reminder) => {
    console.log("remove item called");

    const remaining = reminders.filter((i) => {
      return i.title !== reminder.title;
    });
    setReminders([...remaining]);
  };
  useEffect(() => {
    console.log(reminders);
  }, [reminders]);

  const list = useRef(null);

  return (
    <TouchableWithoutFeedback onPress={addReminder}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          justifyContent: "space-between",
        }}
      >
        <RecyclerFlatList
          ref={list}
          renderItem={(item) => {
            return (
              <ReminderCell
                item={item}
                onChangeText={(text) => {
                  updateTitle(item.item, text);
                }}
                onCompleted={() => {
                  // removeItem(item.item);
                }}
                onIntroPressed={() => {
                  addReminder();
                }}
              />
            );
          }}
          keyExtractor={(item) => {
            return item.title;
          }}
          ListHeaderComponent={Header}
          estimatedItemSize={50}
          ItemSeparatorComponent={Divider}
          data={reminders}
        />
        <View style={styles.bottomButton}>
          <Button title="Add Reminder" onPress={addReminder} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Divider = () => {
  return <View style={styles.divider} />;
};

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Your reminders</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#DDD",
    marginLeft: 55,
  },
  header: {
    backgroundColor: "white",
    padding: 8,
  },
  headerTitle: {
    color: "#007AFE",
    fontSize: 32,
    fontWeight: "700",
    padding: 8,
  },
  bottomButton: {
    // position: "absolute",
    height: 100,
    alignItems: "flex-start",
    padding: 18,
  },
  cell: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    flexDirection: "row",
  },
  checkbox: {
    padding: 6,
    height: 40,
    width: 40,
    marginRight: 8,
    marginTop: 4,
  },
  checkboxImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  textInput: {
    fontSize: 17,
    flex: 1,
    marginVertical: 6,
    marginBottom: 12,
  },
});

export default Reminders;
