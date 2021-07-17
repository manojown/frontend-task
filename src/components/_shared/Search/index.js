import React from "react";

function Search({ className, placeholder, style, setSearch }) {
	function debounce(fn, delay) {
		let timeoutID;
		return function (...args) {
			const context = this;
			if (timeoutID) {
				clearTimeout(timeoutID);
			}
			timeoutID = setTimeout(() => {
				timeoutID = null;

				fn.apply(context, args);
			}, delay);
		};
	}
	const handleSearch = (event) => {
		let { value } = event.target;
		value = value ? value.toLowerCase() : value;
		setSearch(value);
	};

	const debouncedSave = debounce(handleSearch, 100);

	return (
		<div>
			<input
				name='search'
				style={style}
				onChange={debouncedSave}
				type='text'
				className={className}
				aria-describedby='name-desc'
				autoComplete='off'
				placeholder={placeholder}
			/>
		</div>
	);
}

export default Search;
