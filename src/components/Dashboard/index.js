import React, { useEffect, useState } from "react";
import Search from "../_shared/Search";
import Table from "../_shared/Table";
import { search_inlineCss } from "../../styles/inline";
import { getJobs } from "../../services/apiCall";
import Pagination from "../_shared/Pagination";
import { OffSet, TableHeading } from "../../constants";

/**
 * @description Dashboard component
 */
function Dashboard() {
	let [globalSelect, setGlobalSelect] = useState(false);
	let [users, setUsers] = useState([]);
	let [paginateUser, setPaginateUser] = useState([]);
	let [searchSlice, setSearchSlice] = useState([]);
	let [page, setpage] = useState(0);
	let [search, setSearch] = useState(0);

	// To set page for pagination
	const setPagination = (updatedPage) => {
		setpage(updatedPage);
	};

	// Delete selected Users
	const deleteSelectedusers = () => {
		let immutableUsers = [...users];
		let data = immutableUsers.filter((user) => {
			if (user.checked) return false;
			else return true;
		});
		setUsers(data);
		if(globalSelect) setGlobalSelect(false)

	};

	// Delete single user for delete button
	const deleteUser = (usersToDelete) => {
		let fromMaindUserObject = users.filter((user) => {
			return !usersToDelete.includes(user.id);
		});
		setUsers(fromMaindUserObject);
	};

	// on checkBox select multiple users
	const selectUsers = (selectedUser) => {
		let immutableUsers = [...users];
		let userToSave = immutableUsers.map((user) => {
			if (selectedUser.includes(user.id)) {
				if (user.checked) user.checked = false;
				else user.checked = true;
			}
			return user;
		});
		setUsers(userToSave);
	};

	// Inline Editing handler
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

	// to fetch user from api
	const fetchUser = async () => {
		let lastIndex = page * OffSet + OffSet;
		let data = await getJobs();
		setUsers(data);
		setPaginateUser(data.slice(0, lastIndex));
	};

	// handle pagination based on search or total users
	const onPageChange = (page) => {
		let lastIndex = page * OffSet + OffSet;
		if (search) {
			setPaginateUser(searchSlice.slice(lastIndex - OffSet, lastIndex));
		} else {
			setPaginateUser(users.slice(lastIndex - OffSet, lastIndex));
		}
	};


	useEffect(() => {
		if(globalSelect){
		let userToDelete = paginateUser.map((user) => user.id);
		selectUsers(userToDelete);
		} else {
		  let userToDelete = users.map((user) => {
			  if(user.checked) user.checked = false
			  return user
		  });
		  setUsers(userToDelete)
		}
	},[globalSelect])
	// search by name, role and email
	useEffect(() => {
		let data = users.filter((user) => {
			return user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search) || user.role.toLowerCase().includes(search);
		});
		setSearchSlice(data);
	}, [search, users]);

	// user update while any user deleted or page change or search changes
	useEffect(() => {
		onPageChange(page);
	}, [page, users, searchSlice]);

	// initial api call on page loading
	useEffect(() => {
		fetchUser();
	}, []);

	return ( 
		<div className='pl3 pr3 pb2 center tc' data-test='dashboard'>
			<Search
				setSearch={setSearch}
				placeholder='search by name, email, role'
				className='w-100 w-100-l w-100-m fw4 f7 f6-l f6-m pa2 ba br2 o-80 b--silver outline-0 '
				style={search_inlineCss}
			/>
			{users.length ? (
				<Table
					users={paginateUser}
					headers={TableHeading}
					inlineEdit={inlineEdit}
					deleteUser={deleteUser}
					selectUsers={selectUsers}
					setGlobalSelect={setGlobalSelect}
					globalSelect={globalSelect}>
					<div className='flex flex-row flex-between items-center'>
						<button className='bg-dark-red white br4 h2' onClick={deleteSelectedusers}>
							delete All selected users
						</button>
						<Pagination offSet={OffSet} count={searchSlice.length ? searchSlice.length : users.length} page={page} setPagination={setPagination} />
					</div>
				</Table>
			) : (
				<div className='flex justify-center'>
					<h1 className='f5 f4-ns fw6 mid-gray'> Loading... </h1>{" "}
				</div>
			)}
		</div>
	);
}

export default Dashboard;
