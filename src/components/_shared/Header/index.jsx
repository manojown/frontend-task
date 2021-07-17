import React from "react";
import PropTypes from "prop-types";
// or less ideally
// import { Button, Navbar, Container } from "react-bootstrap";

function Header({ text }) {
	return (
		<header className='tc  pv1-ns' data-test='headerComponent'>
			<h1 className='f5 f4-ns fw6 mid-gray'>Search</h1>
		</header>
	);
}
Header.defaultProps = {
	text: "Search",
};
Header.propTypes = {
	text: PropTypes.string,
};
export default Header;
