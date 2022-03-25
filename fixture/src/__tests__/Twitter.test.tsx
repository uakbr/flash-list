import React from "react";
import "@quilted/react-testing/matchers";
import { mount } from "@quilted/react-testing";

import TweetCell from "../TweetCell";
import Twitter from "../Twitter";

describe("Twitter", () => {
  it("renders items", () => {
    const twitter = mount(<Twitter />);
    expect(twitter).toContainReactComponent(TweetCell);
  });
});
