import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../components/template/Heading";
import 'react-confirm-alert/src/react-confirm-alert.css';
import Permission from "../../components/table/permission";
import roleService from "../../services/role.service";
import { useSelector } from "react-redux";
import ActionIcon from "../../components/table/actionIcon";
import swal from "sweetalert";
import { confirmAlert } from "react-confirm-alert";

function Role() {

	let navigate = useNavigate();
	let { id } = useParams()
	const [title, setTitle] = useState([])
	const [rows, setRows] = useState([])
	const [columns, setColumns] = useState([])
	const { user: currentUser } = useSelector((state) => state.auth);
	const [userPermission, setUserPermission] = useState([]);

	useEffect(() => {
		if (currentUser) {
			var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
			permission = permission != null ? permission : []

			if (permission.indexOf('View Role') === -1) {
				return navigate('/login')
			}

			setUserPermission(permission);

			setTitle("Roles");
			getData();
			const column = [
				{
					label: "#",
					field: "id",
					width: 300
				},
				{
					label: "Role Name",
					field: "role_name",
					width: 550
				},
				{
					label: "Action",
					field: 'action'
				}
			]
			setColumns(column);
		} else {
			return navigate("/login")
		}
	}, [currentUser])

	const getData = () => {
		roleService.getAllRoles().then((res) => {
			var roleData = res.data.map((data, id) => {
				if (data.role_name != 'Admin') {
					data.action = renderAction(data._id);
				}
				else {
					data.action = renderActions(data._id);
				}
				data.id = id + 1;
				return data;
			});
			setRows(roleData);
		}).catch(err => {
			console.log(err)
		})
	};
	const renderAction = (index) => {
		return (
			<ActionIcon
				index={index}
				editURL={editRole}
				deleteURL={deleterole}
				editPermission={"Edit Role"}
				deletePermission={"Delete Role"}
				permission={gotoPermission}
				PermissionStatus={true}
			/>
		);
	};
	const renderActions = (index) => {
		return (
			<ActionIcon
				index={index}
				permission={gotoPermission}
				PermissionStatus={true}
			/>
		);
	};

	const gotoPermission = (index) => {
		navigate(`/permission/${index}`);
	};
	const editRole = (index) => {
		navigate(`/manage-roles-edit/${index}`);
	};

	const deleterole = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((isConfirmed) => {
			if (isConfirmed) {
				roleService.deleteRole(id).then((res) => {
					if (res.response == true) {
						swal({
							title: "Success!",
							text: res.message,
							icon: "success",
						});
						setTimeout(() => {
							getData();
						}, 1000);
					} else {
						swal({
							title: "Error!",
							text: res.message,
							icon: "error",
						});
					}
				}).catch(err => {
					swal({
						title: "Error!",
						text: err,
						icon: "error",
					});
				})
			}
		})
	};

	// const confirmDelete = (index) => {
	// 	confirmAlert({
	// 		title: "Confirm to Delete",
	// 		message: "Are you sure you want to delete this?",
	// 		buttons: [
	// 			{
	// 				label: "Yes",
	// 				onClick: () => deleterole(index),
	// 			},
	// 			{
	// 				label: "No",
	// 			},
	// 		],
	// 	});
	// };

	return (
		<div className="content-wrapper">
			<Heading pageTitle={title} />
			<section className="content">
				<div className="container-fluid">
					<div className="row">
						<Table
							data={rows}
							columns={columns}
							url="/manage-roles-add"
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
export default Role;
