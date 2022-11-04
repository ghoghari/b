import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/backButton";
import InputDropdown from "../../components/inputFields/inputDropdown";
import InputText from "../../components/inputFields/inputText";
import Heading from "../../components/template/Heading";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import roleService from "../../services/role.service";

function RoleAdd() {

    let navigate = useNavigate();


    const [title, setTitle] = useState([])
    const [isSubmit, setIsSubmit] = useState(false);
    const [employeStatus, setemployeStatus] = useState([])
    const [error, setError] = useState({});
    const { user: currentUser } = useSelector((state) => state.auth);
    const [roleData, setRoleData] = useState({
        role_name: "",
        role_status: "",
    })

    useEffect(() => {
        if (!currentUser) {
            return navigate("/login");
        } else {

            var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
            permission = permission != null ? permission : []

            // if (permission.indexOf('Add Role') === -1) {
            //     return navigate('/403-error')
            // }
            setTitle('Add Roles')
            const employeStatus = [
                {
                    value: '1',
                    option: 'Active'
                },
                {
                    value: '0',
                    option: 'Inactive'
                }
            ]
            setemployeStatus(employeStatus)
        }
    }, [currentUser])

    const onInputChange = (e) => {
        setRoleData({ ...roleData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        var role_data = roleData;

        var objErrors = validate(roleData);
        if (Object.keys(objErrors).length > 0) {
            setError(objErrors);
            return false;
        }

        roleService
            .addRole(role_data)
            .then((res) => {
                if (res.response == true) {
                    swal({
                        title: "Success!",
                        text: res.message,
                        icon: "success",
                    }).then((isSuccess) => {
                        if (isSuccess) {
                            navigate("/manage-roles");
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
                console.log(err)
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

        if (!value.role_name) {
            errors.role_name = "Name is required."
        }
        if (!value.role_status) {
            errors.role_status = "Status is required."
        }
        return errors;
    }

    return (
        <>
            <div className="content-wrapper">
                <Heading mainTitle={"Roles"} url='/manage-roles' innerPage={true} pageTitle={title} />
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <form onSubmit={e => onSubmit(e)} >
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <InputText
                                                            label="Role Name"
                                                            name="role_name"
                                                            value={roleData.role_name}
                                                            onChange={e => onInputChange(e)}
                                                            placeholder="Role Name"
                                                            type="text"
                                                        />
                                                        <p className="text-danger pl-2">{error.role_name}</p>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <InputDropdown
                                                            label="Status"
                                                            name="role_status"
                                                            value={roleData.role_status}
                                                            onChange={e => onInputChange(e)}
                                                            options={employeStatus}
                                                        />
                                                        <p className="text-danger pl-2">{error.role_status}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="row">
                                                <div className="d-flex justify-content-start w-100">

                                                    <button className="btn btn-primary" >Save</button>
                                                    <BackButton
                                                        url='/manage-roles'
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

export default RoleAdd;
