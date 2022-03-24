import React from "react";
import "@quilted/react-testing/matchers";
import { mount } from "@quilted/react-testing";
import { ScrollView } from "react-native";

import TweetCell from "../TweetCell";
import Twitter from "../Twitter";

// jest.mock("@shopify/flash-list", () => {
//   console.log("ran setup");
//   const mockFlashList = jest.requireActual("@shopify/flash-list");
//   return mockFlashList;
// });

describe("Twitter", () => {
  it("renders items", () => {
    const twitter = mount(<Twitter />);
    // twitter.findAll(ScrollView)[0].trigger("onLayout", {
    //   nativeEvent: { layout: { height: 900, width: 400 } },
    // });
    expect(twitter).toContainReactComponent(TweetCell);
  });
});

// const ActualFlashList = ;

// jest.mock("@shopify/flash-list", () => {
//   const ActualFlashList = jest.requireActual("@shopify/flash-list").FlashList;
//   class MockFlashList<T> extends ActualFlashList<T> {
//     private flashListRef: any;

//     render() {
//       // const FlashListRealModule = jest.requireActual("../FlashList");
//       return <ActualFlashList ref={this.flashListRef} {...this.props} />;
//     }

//     // componentDidMount() {
//     //   // flashList.findAll(ScrollView)[0].trigger("onLayout", {
//     //   //   nativeEvent: { layout: { height: 900, width: 400 } },
//     //   // });
//     //   console.log("ola");
//     //   this.flashListRef.rlvRef._scrollComponent.trigger("onLayout", {
//     //     nativeEvent: { layout: { height: 900, width: 400 } },
//     //   });
//     // }
//   }
//   return {
//     ...jest.requireActual("@shopify/flash-list"),
//     FlashList: MockFlashList,
//   };
// });
