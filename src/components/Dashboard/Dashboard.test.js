import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAtrr } from "../../utils/testingUtils";
import Dashboard from "./index";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
	const component = shallow(<Dashboard {...props} />);
	return component;
};

describe("Dashboard Component Load", () => {
	let component;
	beforeEach(() => {
		let props = { count: 20, offSet: 10 };
		component = setUp(props);
	});

	it("Should render without errors", () => {
		const wrapper = findByTestAtrr(component, "dashboard");
		expect(wrapper.length).toBe(1);
	});
});
