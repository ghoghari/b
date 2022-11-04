import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { useNavigate } from "react-router-dom";
import ActionIcon from "../../components/table/actionIcon";
import Heading from "../../components/template/Heading";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";
import productService from "../../services/product.service";
import swal from "sweetalert";
import Modal from 'react-modal';
import * as XLSX from "xlsx";
import BackButton from "../../components/buttons/backButton";
function ProductsList() {
  let navigate = useNavigate();
  const [title, setTitle] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [userPermission, setUserPermission] = useState([]);
  const [editPermission, setEditPermission] = useState(true);
  const [viewPermission, setViewPermission] = useState(true);
  const [deletePermission, setDeletePermission] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [showimportModal, setShowImportModal] = useState(false);
  const [viewId, setViewId] = useState();
  const [customerView, setCustomerView] = useState({});
  const [customerAddress, setCustomerAddress] = useState({});
  const [userData, setUsersData] = useState();
  const [error, setError] = useState({});
  useEffect(() => {
    if (currentUser) {
      var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
      permission = permission != null ? permission : []
      setUserPermission(permission)
      if (permission.indexOf('View Customer') === -1) {
        return navigate('/403-error')
      }
      if (permission.indexOf('Edit Customer') === -1) {
        setEditPermission(false)
      }

      if (permission.indexOf('View Customer') === -1) {
        setViewPermission(false)
      }
      if (permission.indexOf('Delete Customer') === -1) {
        setDeletePermission(false)
      }
      setTitle("Products");
      getData();
      const column = [
        {
          label: "#",
          field: "id",
          sort: 'enabled',
          width: 50
        },
        {
          label: "Title",
          field: "name",
          width: 270
        },
        {
          label: "Price",
          field: "price",
          width: 270
        },
        {
          label: "Stock",
          field: "stock",
          width: 260
        },
        {
          label: "Action",
          field: "action",
        },
      ];
      setColumns(column);
    } else {
      return navigate("/login");
    }
  }, [currentUser, editPermission, viewPermission, deletePermission]);

  const getData = () => {
    productService.getAllProducts().then((res) => {
        var Customers = res.data.map((data, id) => {
          data.action = renderAction(data._id,data);
          data.id = id + 1;
          return data;
        });
        setRows(Customers);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderAction = (index,data) => {
    return (
      <ActionIcon
        index={index}
        editURL={editCustomer}
        // deleteURL={deleteCustomer}
        viewPermission={viewPermission}
        deletePermission={deletePermission}
        editPermission={editPermission}
        setViewId = {setViewId}
        viewData = {data}
        setViewModal = {setViewModal}
        Viewtarget = {"#viewModal"+index}
        detailsView = {getCustomerDetails}
      />
    );
  };
  const editCustomer = (index) => {
    navigate(`/manage-customers-edit/${index}`);
  };
  // const deleteCustomer = (id) => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this details!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //     .then((isConfirmed) => {
  //       if (isConfirmed) {
  //         userService.deleteCustomer(id).then((res) => {
  //             if (res.response === true) {
  //               swal({
  //                 title: "Success!",
  //                 text: res.message,
  //                 icon: "success",
  //               });
  //               setTimeout(() => {
  //                 getData();
  //               }, 1000);
  //             } else {
  //               swal({
  //                 title: "Error!",
  //                 text: res.message,
  //                 icon: "error",
  //               });
  //             }
  //           })
  //           .catch((err) => {
  //             swal({
  //               title: "Error!",
  //               text: err,
  //               icon: "error",
  //             });
  //           });
  //       }
  //     });
  // };
  const getCustomerDetails = (Customerdata) => {
    setCustomerView(Customerdata)
    setCustomerAddress(Customerdata.address[0])
  }

  const onChange = (e) => {
    const [file] = e.target.files;
    const errors = {};
    var fileType =  e.target.files[0].type;
    if(fileType != "application/vnd.ms-excel"){
      errors.file = "Invalid file uploaded. Please upload valid CSV file. You can download sample CSV file from here and update customer details according to specified format and the try again."
      setError(errors);
      return errors
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const json = XLSX.utils.sheet_to_json(ws);
      setUsersData({users: json})
    };
    reader.readAsBinaryString(file);
  };
 
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const errors = {};
  //   if(!userData){
  //     errors.file = "Please select file."
  //     setError(errors);
  //     return errors
  //   }
  //   userService.importCustomers(userData).then((res) => {
  //     if (res.response == true) {
  //       document.querySelector(".openImportModal").click();
  //       swal({
  //         title: "Success!",
  //         text: res.message,
  //         icon: "success",
  //       }).then((isSuccess) => {
  //         if (isSuccess) {
  //           setTimeout(() => {
  //             getData();
  //           }, 1000);
  //         }
  //       })
  //     } else {
  //       swal({
  //         title: "Error!",
  //         text: res.message,
  //         icon: "error",
  //       });
  //     }
  //   });
  // };

  const downloadFile = () => {
    document.getElementById("error").style.visibility = "hidden";
    let link = document.createElement("a");
    link.setAttribute("href", "http://68.183.86.2:4073/user-export-live.csv");
    link.setAttribute("download", "user-export-live.csv");
    document.body.appendChild(link);
    link.download = "";
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="content-wrapper">
      <Heading pageTitle={title} />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <Table
              data={rows}
              columns={columns}
              addPermission={"Add Products"}
              url="/manage-products-add"
              target = "#exampleModal"
              setShowImportModal = {setShowImportModal}
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
                            <td>{customerView.name}</td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>{customerView.email}</td>
                          </tr>
                          <tr>
                            <th>Status</th>
                            <td>{customerView.UStatus}</td>
                          </tr>
                          <tr>
                            <th>Address</th>
                            <td>{customerAddress.address1} {customerAddress?.address2} <br></br>{customerAddress?.city}, {customerAddress?.state},<br></br> {customerAddress?.country}, {customerAddress?.zipcode}</td>
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
            <button type="button" className="btn openImportModal" data-toggle="modal" data-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-2" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Import Customers</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                  <h5>Note :</h5>
                  <p>Only .csv files are allowed.</p>
                  <hr/>
                  {/* <form onSubmit={(e) => onSubmit(e)}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <input
                              type="file"
                              name="file"
                              onChange={onChange}
                              rows="1"
                              accept=".csv"
                            />
                          </div>
                          <p className="text-danger pl-2" id="error">{error.file}</p>
                        </div>                        
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="row">
                        <div className="d-flex justify-content-start w-100">
                          <button className="btn btn-primary" >Import</button>
                          <button onClick={downloadFile} className="btn  btn-success mx-1">
                            Download Sample file
                          </button>
                          <BackButton url="/manage-customers" />
                        </div>
                      </div>
                    </div>
                  </form> */}
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
export default ProductsList;
