import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  ViewProps,
  Pressable,
} from "react-native";
import {
  Swipeable,
  SwipeableIOSAction,
  SwipeableProvider,
} from "@shopify/react-native-swipe-actions";
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeOut, Layout } from "react-native-reanimated";

interface Reminder {
  id: string;
  title: string;
  selected: boolean;
}

interface CheckboxProps {
  checked: boolean;
}

const Checkbox = (props: CheckboxProps) => {
  const source = props.checked
    ? require("assets/checkboxOn.png")
    : require("assets/checkboxOff.png");
  return <Image source={source} style={styles.checkboxImage} />;
};

interface ReminderCellProps extends ViewProps {
  item: Reminder;
  onCompleted: (item: Reminder) => void;
  onChangeText: (item: Reminder, text: string) => void;
  onIntroPressed: () => void;
}

const ReminderCell = ({
  item,
  onCompleted,
  onChangeText,
  onIntroPressed,
  onLayout,
}: ReminderCellProps) => {
  const [checked, setChecked] = useState(false);

  const toggle = () => {
    setChecked(!checked);
  };

  const rightActions: SwipeableIOSAction[] = [
    {
      color: "red",
      destructive: true,
      renderContent: () => (
        <Image
          style={styles.action}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Trash_font_awesome.svg/1200px-Trash_font_awesome.svg.png",
          }}
          resizeMode="cover"
        />
      ),
      onPress: () => {
        onCompleted(item);
      },
    },
  ];

  useEffect(() => {
    if (!checked) {
      return;
    }
    // We delete the element after 1s
    // like the reminders app does on iOS
    setTimeout(() => {
      setChecked(false);
      onCompleted(item);
    }, 1000);
  }, [checked, item, onCompleted]);

  return (
    /* eslint-disable react/jsx-pascal-case */
    <Swipeable.iOS
      identifier={item.id}
      rightActions={rightActions}
      rightFullSwipeEnabled
    >
      <Animated.View
        onLayout={onLayout}
        style={styles.cell}
        layout={Layout}
        exiting={FadeOut}
      >
        <View style={styles.checkbox}>
          <Pressable onPress={toggle}>
            <Checkbox checked={checked} />
          </Pressable>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={(newText) => {
            const newTextNoLineBrakes = newText.replace("\n", "");
            onChangeText(item, newTextNoLineBrakes);
          }}
          value={item.title}
          autoFocus
          multiline
          numberOfLines={0}
          onKeyPress={({ nativeEvent: { key: keyValue } }) => {
            if (keyValue === "Enter") {
              onIntroPressed();
              return false;
            }
          }}
          onEndEditing={() => {
            if (item.title.length === 0) {
              onCompleted(item);
            }
          }}
        />
      </Animated.View>
    </Swipeable.iOS>
  );
};

const Reminders = () => {
  const newID = () => {
    return Math.random().toString(36).substring(2, 15);
  };
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: newID(), title: "Buy milk", selected: false },
    { id: newID(), title: "Clean room", selected: false },
  ]);

  const lastCreatedId = useRef<string>("");

  const addReminder = () => {
    createEmptyReminder();
  };
  const createEmptyReminder = () => {
    lastCreatedId.current = newID();
    setReminders((prevReminders) => [
      ...prevReminders,
      {
        id: lastCreatedId.current,
        title: "",
        selected: false,
      },
    ]);
  };

  const updateTitle = useCallback(
    (id: string, title: string) => {
      const newReminders = [...reminders];
      const elem = newReminders.find((reminder) => reminder.id === id);
      if (elem !== undefined) {
        elem.title = title;
      }
      setReminders(newReminders);
    },
    [setReminders, reminders]
  );

  const removeItem = useCallback(
    (reminder: Reminder) => {
      list.current?.prepareForLayoutAnimationRender();
      setReminders(
        reminders.filter(({ title }) => {
          return title !== reminder.title;
        })
      );
    },
    [setReminders, reminders]
  );

  const list = useRef<FlashList<Reminder> | null>(null);

  const onChangeText = useCallback(
    (item: Reminder, text: string) => {
      updateTitle(item.id, text);
    },
    [updateTitle]
  );

  const onCompleted = useCallback(
    (item: Reminder) => {
      removeItem(item);
    },
    [removeItem]
  );

  const animateToBottomIfNewItemAdded = (item: Reminder) => {
    if (lastCreatedId.current === item.id) {
      list.current?.scrollToEnd({ animated: true });
    }
  };

  const renderItem = ({ item }: { item: Reminder }) => {
    return (
      <ReminderCell
        item={item}
        onChangeText={onChangeText}
        onCompleted={onCompleted}
        onIntroPressed={addReminder}
        onLayout={() => animateToBottomIfNewItemAdded(item)}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={addReminder}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          justifyContent: "space-between",
        }}
      >
        <SwipeableProvider>
          <FlashList
            ref={list}
            renderItem={renderItem}
            keyExtractor={(item: Reminder) => {
              return item.id;
            }}
            ListHeaderComponent={Header}
            estimatedItemSize={50}
            ItemSeparatorComponent={Divider}
            data={reminders}
          />
        </SwipeableProvider>
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
  action: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
});

export default Reminders;
