import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAtrr } from "../../../utils/testingUtils";
import Table from "./index";
const headers = ["name", "email", "role"];


configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
	const component = shallow(<Table {...props} />);
	return component;
};

describe("Table Component Load when no data available.", () => {
	let component;
	beforeEach(() => {
		let props = { users: [] };
		component = setUp(props);
	});

	it("Should render without errors when no data available", () => {
		const wrapper = findByTestAtrr(component, "table-no-data");
		expect(wrapper.length).toBe(1);
	});
});

describe("Table Component Load", () => {
	let component;
	beforeEach(() => {
		let props = { users: [{ id: 1, name: "manoj", role: "admin" }], headers };
		component = setUp(props);
	});

	it("Should render without errors", () => {
		const wrapper = findByTestAtrr(component, "table");
		expect(wrapper.length).toBe(1);
	});
});
