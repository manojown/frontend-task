/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Pagination({ count, page, offSet, setPagination }) {
	const changePage = (page) => {
		if (page < 0) return;
		else if (page * offSet > count) return;
		console.log(page * offSet, count);
		setPagination(page);
	};
	const pageComp = () => {
		return Array(Math.ceil(count / offSet))
			.fill(0)
			.map((_, index) => {
				return (
					<a
						className={`dtc link dim  ${page == index ? "bg-blue white" : "black"} f6 f5-ns b pa3 br b--light-silver`}
						title='1'
						onClick={() => changePage(index)}>
						{index + 1}
					</a>
				);
			});
	};
	return (
		<div className='tc mw8 center'>
			<div className='dib overflow-hidden ba br2 b--light-silver'>
				<nav className='cf' data-name='pagination-numbers-bordered'>
					<a
						className='fl dib link dim black f6 f5-ns b pa3 br b--light-silver'
						disabled={true}
						title='Previous'
						onClick={() => changePage(page - 1)}>
						&larr; Previous
					</a>
					<a className='fr dib link dim black f6 f5-ns b pa3' title='Next' onClick={() => changePage(page + 1)}>
						Next &rarr;
					</a>
					<div className='overflow-hidden center dt tc'>{pageComp()}</div>
				</nav>
			</div>
		</div>
	);
}

export default Pagination;
