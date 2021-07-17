import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAtrr } from "../../../utils/testingUtils";
import Search from "./index";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
	const component = shallow(<Search {...props} />);
	return component;
};

describe("Search Component Load", () => {
	let component;
	beforeEach(() => {
		let props = { count: 20, offSet: 10 };
		component = setUp(props);
	});

	it("Should render without errors", () => {
		const wrapper = findByTestAtrr(component, "search");
		expect(wrapper.length).toBe(1);
	});
});
