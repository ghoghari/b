import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { useNavigate } from "react-router-dom";
import ActionIcon from "../../components/table/actionIcon";
import Heading from "../../components/template/Heading";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";
import userService from "../../services/user.service";
import swal from "sweetalert";

function AdminList() {
  let navigate = useNavigate();
  const [title, setTitle] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [userPermission, setUserPermission] = useState([]);
  const [viewPermission, setViewPermission] = useState(true);
  const [editPermission, setEditPermission] = useState(true);
  const [deletePermission, setDeletePermission] = useState(true);
  const [staffView, setStaffView] = useState({});
  const [viewId, setViewId] = useState();
  const [viewModal, setViewModal] = useState(false);
  useEffect(() => {
    if (!currentUser) {
      return navigate("/login");
    }
    else {
      var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
      permission = permission != null ? permission : []

      if (permission.indexOf('View Staff') === -1) {
        setViewPermission(false)
        return navigate('/403-error')
      }
      if (permission.indexOf('Edit Staff') === -1) {
        setEditPermission(false)
      }
      if (permission.indexOf('Delete Staff') === -1) {
        setDeletePermission(false)
      }

      setUserPermission(permission);
      setTitle("Staff");
      getData();
      const column = [
        {
          label: "#",
          field: "id",
          width: 50
        },
        {
          label: "Title",
          field: "name",
          width: 260
        },
        {
          label: "Email",
          field: "email",
          width: 260
        },
        {
          label: "Role",
          field: "role",
          width: 150
        },
        {
          label: "Status",
          field: "UStatus",
          width: 150
        },
        {
          label: "Action",
          field: "action",
        },
      ];
      setColumns(column);
    }
  }, [currentUser, editPermission, viewPermission, deletePermission]);

  const getData = () => {
    userService.getAllStaff().then((res) => {
      var staff = res.data.map((data, id) => {
        data.action = renderAction(data._id,data);
        data.UStatus = data.user_status ? "Active" : "Inactive";
        data.id = id + 1;
        return data;
      });
      setRows(staff);
    })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderAction = (index,data) => {
    return (
      <ActionIcon
        index={index}
        editURL={editStaff}
        deleteURL={deleteStaff}
        editPermission={editPermission}
        deletePermission={deletePermission}
        viewPermission={viewPermission}
        setViewId = {setViewId}
        viewData = {data}
        setViewModal = {setViewModal}
        Viewtarget = {"#viewModal"+index}
        detailsView = {getCustomerDetails}
      />
    );
  };

  const editStaff = (index) => {
    navigate(`/manage-admin-edit/${index}`);
  };

  const deleteStaff = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((isConfirmed) => {
        if (isConfirmed) {
          userService.deleteCustomer(id).then((res) => {
              if (res.response == true) {
                swal({
                  title: "Success !",
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
            })
            .catch((err) => {
              swal({
                title: "Error!",
                text: err,
                icon: "error",
              });
            });
        }
      })
  };
  const getCustomerDetails = (Staffdata) => {
    setStaffView(Staffdata)
  }
  return (
    <div className="content-wrapper">
      <Heading pageTitle={title} />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <Table
              data={rows}
              columns={columns}
              addPermission={"Add Staff"}
              url="/manage-admin-add"
            />
<button type="button" className="btn openModal" data-toggle="modal" data-target="#viewModal">
            </button>
            <div className="modal fade" id="viewModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Customer Profile</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">                              
                    <div id="dynamic-content">
                      <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                          <tr>
                            <th> Name</th>
                            <td>{staffView.name}</td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>{staffView.email}</td>
                          </tr>
                          <tr>
                            <th>Status</th>
                            <td>{staffView.UStatus}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div> 
                  <div className="modal-footer"> 
                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>  
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AdminList;
