import React, { useEffect, useState } from "react";
import BackButton from "../../components/buttons/backButton";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/template/Heading";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import userService from "../../services/user.service";

function ViewProfile() {
    let navigate = useNavigate();
    const [title, setTitle] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [_id, setId] = useState([]);
    const [error, setError] = useState({});
    const [localData, setLocalData] = useState({});
    const { user: currentUser } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        mobile_no: ""
    })

    useEffect(() => {
        if (currentUser) {
            setTitle('Profile')
            var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
            permission = permission != null ? permission : []
            let uData = currentUser?.data ? currentUser?.data : currentUser
            setLocalData(uData)
            setId(uData._id)
            setUserData({
                name: uData.name,
                email: uData.email,
                mobile_no: uData.mobile_no
            });
        } else {
            return navigate("/login");
        }
    }, [currentUser]);

    const onInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        userData._id = _id;
        var objErrors = validate(userData);
        if (Object.keys(objErrors).length > 0) {
            setError(objErrors);
            return false;
        }
        delete userData.confirm_password
        userService.updateProfile(userData).then((res) => {
            if (res.response === true) {
                localData.name = userData.name
                localData.email = userData.email
                localData.mobile_no = userData.mobile_no
                localStorage.setItem("user", JSON.stringify(localData));
                swal({
                    title: "Success!",
                    text: res.message,
                    icon: "success",
                }).then((isSuccess) => {
                    if (isSuccess) {
                        navigate("/dashboard");
                    }
                })
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
        if(value.password != value.confirm_password){
            errors.confirm_password = "Password and confrim password do not match."
        }
        // if (!value.password) {
        //     errors.password = "Password is required."
        // }
        // if (!value.confirm_password) {
        //     errors.confirm_password = "Confirm password is required."
        // }
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(value.mobile_no)) {
            errors.mobile_no = "Mobile number must be valid number only."
        }
        if (!value.mobile_no) {
            errors.mobile_no = "Mobile number is required."
        }
        else if (value.mobile_no.length < 10) {
            errors.mobile_no = "Minimum 10 digits are required for mobile number."
        }
        else if (value.mobile_no.length > 15) {
            errors.mobile_no = "Maximum 15 digits are required allowed for mobile number."
        }
        return errors;
    }

    return (
        <div className="content-wrapper">
            <Heading mainTitle={"Profile"} url='/' innerPage={false} pageTitle={title} />
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                            <form onSubmit={e => onSubmit(e)} >
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="settings">
                                            <input type="hidden" value={_id} />
                                            <div className="form-group row">
                                                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                                <div className="col-sm-10">
                                                    <input 
                                                        type="text" 
                                                        name="name" 
                                                        className="form-control" 
                                                        placeholder="Name" 
                                                        value={userData.name}
                                                        onChange={e => onInputChange(e)}
                                                     />
                                                     <p className="text-danger pl-2">{error.name}</p>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                                <div className="col-sm-10">
                                                    <input 
                                                        type="email" 
                                                        name="email" 
                                                        className="form-control" 
                                                        placeholder="Email" 
                                                        value={userData.email} 
                                                        onChange={e => onInputChange(e)}
                                                    />
                                                    <p className="text-danger pl-2">{error.email}</p>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="inputName2" className="col-sm-2 col-form-label">Mobile No.</label>
                                                <div className="col-sm-10">
                                                    <input 
                                                        type="text" 
                                                        name="mobile_no" 
                                                        maxLength="15" 
                                                        className="form-control" 
                                                        placeholder="mobile_no" 
                                                        value={userData.mobile_no} 
                                                        onChange={e => onInputChange(e)}    
                                                    />
                                                    <p className="text-danger pl-2">{error.mobile_no}</p>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="inputExperience" className="col-sm-2 col-form-label">Password</label>
                                                <div className="col-sm-10">
                                                    <input 
                                                        type="password" 
                                                        name="password" 
                                                        className="form-control" 
                                                        placeholder="password" 
                                                        value={userData.password} 
                                                        onChange={e => onInputChange(e)}
                                                    />
                                                    <p className="text-danger pl-2">{error.password}</p>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="inputExperience" className="col-sm-2 col-form-label">Confirm Password</label>
                                                <div className="col-sm-10">
                                                    <input 
                                                        type="password" 
                                                        name="confirm_password" 
                                                        className="form-control" 
                                                        placeholder="confirm password" 
                                                        onChange={e => onInputChange(e)}
                                                    />
                                                    <p className="text-danger pl-2">{error.confirm_password}</p>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row">
                                                    <div className="d-flex justify-content-start w-100">
                                                        <button className="btn btn-primary" >Save</button>
                                                        <BackButton url='/dashboard' />
                                                    </div>
                                                </div>
                                            </div>
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
    );
}
export default ViewProfile;
