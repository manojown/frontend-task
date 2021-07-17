import React, { useState } from "react";

function Table({ users, inlineEdit, headers, children, deleteUser, selectUsers, setGlobalSelect, globalSelect }) {
	let [curretRow, setCurrentRow] = useState({});

	const editRow = (user, isEditable) => {
		if (curretRow.id) {
			alert("please save your current changes to proceed.");
			return;
		}
		setCurrentRow(user);
		inlineEdit(user, isEditable);
	};

	const selectToDelete = (users) => {
		let userToDelete = users.map((user) => user.id);
		selectUsers(userToDelete);
	};
	const onInputChange = (event) => {
		let { value, name } = event.target;
		let row = { ...curretRow };
		row[name] = value;
		setCurrentRow(row);
	};

	const saveRow = (user) => {
		inlineEdit(user);
		setCurrentRow({});
	};

	const geTrs = (user) => {
		let actionButton = user.edit ? (
			<button onClick={() => saveRow(curretRow)}>save</button>
		) : (
			<button onClick={() => editRow(user, true)}>edit</button>
		);

		let onEditData = headers.map((key) => {
			return (
				<td key={key} className='pv3 pr3 bb b--black-20 tc'>
					{user.edit ? <input className='w-1' name={key} onChange={onInputChange} value={curretRow[key]} /> : user[key]}
				</td>
			);
		});
		return (
			<tr key={user.id}>
				<td className='pv3 pr3 bb b--black-20 tc'>
					<input type='checkbox' checked={user.checked ? true : false} onChange={() => selectToDelete([user])} />
				</td>
				{onEditData}
				<td className='pv3 pr3 bb b--black-20 tc'>
					{actionButton}
					<button onClick={() => deleteUser([user.id])}>Delete</button>
				</td>
			</tr>
		);
	};
	if (!users.length)
		return (
			<div className='flex justify-center' data-test='table-no-data'>
				<h1 className='f5 f4-ns fw6 mid-gray'>No data Available</h1>
			</div>
		);
	else
		return (
			<div className='pa4' data-test='table'>
				<table className='center w-100'>
					<thead>
						<tr>
							<th className='bb b--black-20 tl pr3 bg-white tc'>
								<input type='checkbox' checked={globalSelect} onChange={() => setGlobalSelect(!globalSelect)} />
							</th>
							{headers.map((key) => {
								return (
									<th key={key} className='bb b--black-20 tl pr3 bg-white tc'>
										{key}
									</th>
								);
							})}
							<th className='bb b--black-20 tl pr3 bg-white tc'>Actions</th>
						</tr>
					</thead>
					<tbody className='lh-copy'>{users.map((user) => geTrs(user))}</tbody>
				</table>
				{children}
			</div>
		);
}

export default Table;
