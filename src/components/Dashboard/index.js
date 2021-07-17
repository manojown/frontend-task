import React, { useEffect, useState } from "react";
import Search from "../_shared/Search";
import Table from "../_shared/Table";
import { search_inlineCss } from "../../styles/inline";
import { getJobs } from "../../services/apiCall";
import Pagination from "../_shared/Pagination";

const offSet = 10;
const headers = ["name", "email", "role"];

function Dashboard() {
	let [users, setUsers] = useState([]);
	let [paginateUser, setPaginateUser] = useState([]);
	let [searchSlice, setSearchSlice] = useState([]);
	let [page, setpage] = useState(0);
	let [search, setSearch] = useState(0);

	const setPagination = (updatedPage) => {
		setpage(updatedPage);
	};

	const deleteSelectedusers = () => {
		let immutableUsers = [...users]
		let data = immutableUsers.filter(user => {
			if(user.checked) return false
			else return true
		})
		setUsers(data)
	}
	const deleteUser = (usersToDelete) => {
		let fromMaindUserObject = users.filter((user) => {
			return !usersToDelete.includes(user.id)
		});
		setUsers(fromMaindUserObject);
	};

	useEffect(() => {
		let data = users.filter((user) => {
			return user.name.toLowerCase().includes(search);
		});
		setSearchSlice(data);
	}, [search, users]);

	const selectUsers = (selectedUser) => {
		let immutableUsers = [...users];
		let userToSave = immutableUsers.map((user) => {
			if(selectedUser.includes(user.id)){
				if(user.checked) user.checked = false
				else user.checked = true
			} 
			return user
		})	
		setUsers(userToSave)	
	};

	const inlineEdit = (editableUser, isEdit) => {
		let newusers = [...users];
		let userIndex = newusers.findIndex((user) => editableUser.id === user.id);
		if (isEdit) {
			newusers[userIndex].edit = true;
		} else {
			editableUser.edit = false;
			newusers[userIndex] = editableUser;
		}
		setUsers(newusers);
	};

	const onPageChange = (page) => {
		let lastIndex = page * offSet + offSet;
		if (searchSlice.length) {
			setPaginateUser(searchSlice.slice(lastIndex - offSet, lastIndex));
		} else {
			setPaginateUser(users.slice(lastIndex - offSet, lastIndex));
		}
	};

	useEffect(() => {
		onPageChange(page);
	}, [page, users, searchSlice]);

	useEffect(() => {
		const apiCall = async () => {
			let lastIndex = page * offSet + offSet;
			let data = await getJobs();
			setUsers(data);
			setPaginateUser(data.slice(0, lastIndex));
		};
		apiCall();
	}, []);
	
	return (
		<div className='pl3 pr3 pb2 center tc'>
			<Search
				setSearch={setSearch}
				placeholder='search by name, email, role'
				className='w-100 w-100-l w-100-m fw4 f7 f6-l f6-m pa2 ba br2 o-80 b--silver outline-0 '
				style={search_inlineCss}
			/>
			{users.length && (
				<Table users={paginateUser} headers={headers} inlineEdit={inlineEdit} deleteUser={deleteUser} selectUsers={selectUsers}>
					<div className='flex flex-row flex-between items-center'>
					<button className='bg-dark-red white br4 h2' onClick={deleteSelectedusers}>delete All selected users</button>
					<Pagination offSet={offSet} count={searchSlice.length ? searchSlice.length : users.length} page={page} setPagination={setPagination} />
					</div>
				</Table>
			)}
		</div>
	);
}

export default Dashboard;
