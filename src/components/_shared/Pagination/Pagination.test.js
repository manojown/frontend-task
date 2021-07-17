import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAtrr } from "../../../utils/testingUtils";
import Pagination from "./index";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
	const component = shallow(<Pagination {...props} />);
	return component;
};

describe("Pagination Component Load", () => {
	let component;
	beforeEach(() => {
		let props = { count: 20, offSet: 10 };
		component = setUp(props);
	});

	it("Should render without errors", () => {
		const wrapper = findByTestAtrr(component, "pagination");
		expect(wrapper.length).toBe(1);
	});
});
