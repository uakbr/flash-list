import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useRef } from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import {
  SwipeableIOSAction,
  Swipeable,
} from "@shopify/react-native-swipe-actions";

import { RootStackParamList } from "../constants";

import Tweet from "./models/Tweet";
import TweetContent from "./TweetContent";

export interface TweetCellProps {
  tweet: Tweet;
}

const TweetCell = ({ tweet }: TweetCellProps) => {
  const { navigate } =
    useNavigation<StackNavigationProp<RootStackParamList, "Twitter">>();
  const rightActions: SwipeableIOSAction[] = useRef([
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
      onPress: () => {},
    },
  ]).current;
  return (
    <Swipeable.iOS
      identifier={tweet.id}
      rightActions={rightActions}
      rightFullSwipeEnabled
    >
      <Pressable
        onPress={() => {
          navigate("TweetDetailScreen", { tweet });
        }}
      >
        <TweetContent tweet={tweet} />
      </Pressable>
    </Swipeable.iOS>
  );
};

const styles = StyleSheet.create({
  action: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
});

export default TweetCell;
