import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/buttons/backButton";
import InputDropdown from "../../components/inputFields/inputDropdown";
import InputText from "../../components/inputFields/inputText";
import Heading from "../../components/template/Heading";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import userService from "../../services/user.service";
import roleService from "../../services/role.service";

function AdminEdit() {

    let navigate = useNavigate();
    let { id } = useParams()
    const [title, setTitle] = useState([])
    const [isSubmit, setIsSubmit] = useState(false);
    const [roleData, setRoleData] = useState([]);
    const [employeestatus, setemployeestatus] = useState([])
    const [error, setError] = useState({});
    const { user: currentUser } = useSelector((state) => state.auth);
    const [adminData, setAdminData] = React.useState({
        name: "",
        email: "",
        user_status: "",
        role: "",
        mobile_no: "",
    })

    useEffect(() => {
        if (!currentUser) {
            return navigate("/login");
        } else {

            var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
            permission = permission != null ? permission : []

            if (permission.indexOf('Edit Staff') == -1) {
                return navigate('/403-error')
            }

            loadUser()
            setTitle('Update Staff')
            const employeestatus = [
                {
                    value: 'true',
                    option: 'Active'
                },
                {
                    value: 'false',
                    option: 'Inactive'
                }
            ]
            
            setemployeestatus(employeestatus);
            roleService.getAllRoles().then((res) => {
                var roleData = res.data.map((data) => {
                    var roles = {};
                    if(data.role_name != "Customer"){
                        roles= {
                            value: data.role_name,
                            option: data.role_name
                        }
                    }
                    return roles
                });
                var data = roleData.filter(function (element) {
                    if (Object.keys(element).length !== 0) {
                        return true;
                    }
                });
                setRoleData(data);
            });
        }
    }, [currentUser])

    const onInputChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value })
    }

    const onInputPasswordChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        var objErrors = validate(adminData);
        if (Object.keys(objErrors).length > 0) {
            setError(objErrors);
            return false;
        }
        userService.updateCustomer(adminData,id).then((res) => {
                if (res.response == true) {
                    swal({
                        title: "Success!",
                        text: res.message,
                        icon: "success",
                    }).then((isSuccess) => {
                        if (isSuccess) {
                            navigate("/manage-admin");
                        }
                    })
                } else {
                    swal({
                        title: "Error!",
                        text: res.message,
                        icon: "error",
                    });
                }
            })
            .catch(err => {
                swal({
                    title: "Error!",
                    text: err,
                    icon: "error",
                });
            })
        setIsSubmit(true);
    }

    const validate = (value) => {
        const errors = {}
        if (!value.name) {
            errors.name = "Name is required."
        }
        if (!value.email) {
            errors.email = "Email is required."
        }
        else if (!value.email.match('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')) {
            errors.email = "Please enter valid email address."
        }
        if (value.user_status == "Select") {
            errors.user_status = "Status is required."
        }
        if (value.role == "Select") {
            errors.role = "Role is required."
        }
        if (!value.mobile_no) {
            errors.mobile_no = "Mobile number is required."
        }
        if (value.password && value.password.length < 5) {
            errors.password = "Password Must be at least 5 chars long."
        }
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(value.mobile_no)) {
            errors.mobile_no = "Mobile number must be valid number only."
        }
        if(value.mobile_no.trim().length == 0) {
            errors.mobile_no = "Mobile number is required."
        }
        else if (value.mobile_no.length !== 8) {
            errors.mobile_no = "Mobile number must be 8 digits number."
        }
        return errors;
    }

    const loadUser = async () => {
        userService.getCustomers(id).then((res) => {
            setAdminData(res.data[0]);
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <div className="content-wrapper">
                <Heading mainTitle={"Staff"} url='/manage-admin' innerPage={true} pageTitle={title} />

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <form onSubmit={e => onSubmit(e)}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <InputText
                                                            label="Name"
                                                            name="name"
                                                            value={adminData.name}
                                                            onChange={e => onInputChange(e)}
                                                            placeholder="Customer Name"
                                                            type="text"
                                                        />
                                                        <p className="text-danger pl-2">{error.name}</p>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <InputText
                                                            label="Email"
                                                            name="email"
                                                            value={adminData.email}
                                                            onChange={e => onInputChange(e)}
                                                            placeholder="Customer Email"
                                                            type="text"
                                                        />
                                                        <p className="text-danger pl-2">{error.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <InputText
                                                            label="Mobile"
                                                            name="mobile_no"
                                                            value={adminData.mobile_no}
                                                            maxLength="15"
                                                            onChange={e => onInputChange(e)}
                                                            placeholder="Customer Mobile No."
                                                            type="text"
                                                        />
                                                        <p className="text-danger pl-2">{error.mobile_no}</p>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <InputText
                                                            label="Password"
                                                            name="password"
                                                            onChange={e => onInputPasswordChange(e)}
                                                            placeholder="Password"
                                                            type="password"
                                                        />
                                                        <p className="text-danger pl-2">{error.password}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <InputDropdown
                                                            label="Role"
                                                            name="role"
                                                            value={adminData.role}
                                                            onChange={e => onInputChange(e)}
                                                            options={roleData}
                                                        />
                                                        <p className="text-danger pl-2">{error.role}</p>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <InputDropdown
                                                            label="Status"
                                                            name="user_status"
                                                            value={adminData.user_status}
                                                            onChange={e => onInputChange(e)}
                                                            options={employeestatus}
                                                        />
                                                        <p className="text-danger pl-2">{error.user_status}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="row">
                                                <div className="d-flex justify-content-start w-100">
                                                    <button className="btn btn-primary" >Save</button>
                                                    <BackButton
                                                        url='/manage-admin'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
export default AdminEdit;
