import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAtrr } from "../../../utils/testingUtils";
import ErrorBoundary from "./index";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<ErrorBoundary />);
  component.setState({ hasError: true });
  return component;
};

describe("ErrorBoundries Component Load", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAtrr(component, "ErrorBoundries");
    expect(wrapper.length).toBe(1);
  });
});
