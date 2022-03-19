/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ListsProfiler } from "@shopify/react-native-performance-lists-profiler";

import List from "./List";
import PaginatedList from "./PaginatedList";
import Twitter from "./Twitter";
import { NavigationKeys, RootStackParamList } from "./constants";
import { ExamplesScreen } from "./ExamplesScreen";
import TwitterFlatList from "./TwitterFlatList";
import Reminders from "./Reminders";
import TwitterRestyle from "./restyle/Twitter";
import { ThemeProvider } from "@shopify/restyle";
import theme from "./restyle/Theme";

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ListsProfiler
      onInteractive={(TTI) => {
        console.log(`TTI in millis: ${TTI}`);
      }}
      onBlankArea={(offsetStart, offsetEnd) => {
        console.log(`Blank area: ${Math.max(offsetStart, offsetEnd)}`);
      }}
    >
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={NavigationKeys.EXAMPLES}
              component={ExamplesScreen}
            />
            <Stack.Screen name={NavigationKeys.LIST} component={List} />
            <Stack.Screen
              name={NavigationKeys.PAGINATED_LIST}
              component={PaginatedList}
            />
            <Stack.Screen name={NavigationKeys.TWITTER} component={Twitter} />
            <Stack.Screen
              name={NavigationKeys.TWITTER_FLAT_LIST}
              component={TwitterFlatList}
            />
            <Stack.Screen
              name={NavigationKeys.TWITTER_RESTYLE}
              component={TwitterRestyle}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </ListsProfiler>
  );
};

export default App;
