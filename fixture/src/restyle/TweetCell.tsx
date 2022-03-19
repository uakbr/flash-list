import React from "react";
import { StyleSheet, View, Image, Text, ViewStyle } from "react-native";
import FastImage from "react-native-fast-image";
import { Box, RText } from "./Components";

import Author from "../models/Author";
import Tweet from "../models/Tweet";

import theme from "./theme";

export interface TweetCellProps {
  tweet: Tweet;
}

const tweetActions = (
  retweets: React.ReactNode,
  comments: React.ReactNode,
  likes: React.ReactNode
) => {
  return (
    <Box
      flex={1}
      justifyContent="space-between"
      flexDirection="row"
      marginTop="s"
      marginRight="m"
    >
      <Box flexDirection="row" alignItems="center" justifyContent="flex-start">
        <Image
          style={styles.actionButton}
          source={require("../assets/comment.png")}
        />
        <RText fontSize={12} color="primaryForeground">
          {comments}
        </RText>
      </Box>
      <Box flexDirection="row" alignItems="center" justifyContent="flex-start">
        <Image
          style={styles.actionButton}
          source={require("../assets/retweet.png")}
        />
        <RText fontSize={12} color="primaryForeground">
          {retweets}
        </RText>
      </Box>
      <Box flexDirection="row" alignItems="center" justifyContent="flex-start">
        <Image
          style={styles.actionButton}
          source={require("../assets/like.png")}
        />
        <RText fontSize={12} color="primaryForeground">
          {likes}
        </RText>
      </Box>
      <Image
        style={styles.actionButton}
        source={require("../assets/share.png")}
      />
    </Box>
  );
};

const avatar = (author: Author) => {
  const imageUrl = author.avatar.replace("_normal", "");
  return <FastImage style={styles.avatar} source={{ uri: imageUrl }} />;
};
interface GrayTextProps {
  children: React.ReactNode;
  numberOfLines?: number;
  style?: ViewStyle;
}

const GrayText = ({ children, numberOfLines, style: any }: GrayTextProps) => {
  return (
    <RText
      {...styles}
      color="grey"
      paddingRight="xxs"
      fontSize={13}
      numberOfLines={numberOfLines}
    >
      {children}
    </RText>
  );
};

const TweetCell = ({ tweet }: TweetCellProps) => {
  return (
    <Box
      paddingHorizontal="m"
      minHeight={44}
      flex={1}
      padding="m"
      backgroundColor="mainBackground"
    >
      <Box flexDirection="row">
        {avatar(tweet.author)}
        <Box flexShrink={1} flexGrow={1}>
          <Box style={styles.rowTop}>
            <RText
              numberOfLines={1}
              fontSize={14}
              fontWeight="bold"
              paddingBottom="xs"
              paddingRight="xs"
              color="black"
            >
              {tweet.author.name}
            </RText>
            <GrayText style={styles.author} numberOfLines={1}>
              @{tweet.author.screenName}
            </GrayText>
            <GrayText>·</GrayText>
            <GrayText>2h</GrayText>
          </Box>
          <RText fontSize={14} color="black">
            {tweet.fullText}
          </RText>
          <Box flex={1} justifyContent="space-between" flexDirection="row">
            {tweetActions(
              tweet.retweetCount,
              tweet.replyCount,
              tweet.favoriteCount
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  author: {
    flexShrink: 1,
  },
  actionBar: {
    marginTop: 8,
    justifyContent: "space-between",
    marginRight: 16,
  },
  actionButton: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  gray: {
    color: "#777",
    fontSize: 13,
    paddingRight: 2,
  },
  avatar: {
    height: 44,
    width: 44,
    borderRadius: 22,
    marginRight: 16,
    flexShrink: 0,
    marginTop: 4,
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 4,
    paddingRight: 4,
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#000",
  },
  singleItem: {
    paddingHorizontal: 16,
    minHeight: 44,
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
  },
  rowTop: {
    flexDirection: "row",
  },
  rowActions: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
  elemAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  actionText: {
    fontSize: 12,
    color: "#444",
  },
});

export default TweetCell;
