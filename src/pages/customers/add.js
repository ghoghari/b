import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/backButton";
import InputDropdown from "../../components/inputFields/inputDropdown";
import InputText from "../../components/inputFields/inputText";
import InputTextArea from "../../components/inputFields/inputTextArea";
import Heading from "../../components/template/Heading";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import userService from "../../services/user.service";

function CustomersAdd() {

    let navigate = useNavigate();

    const [title, setTitle] = useState([])
    const [isSubmit, setIsSubmit] = useState(false);
    const [employeStatus, setemployeStatus] = useState([])
    const [Country, setCountry] = useState([])
    const [error, setError] = useState({});
    const { user: currentUser } = useSelector((state) => state.auth);
    const [customersData, setCustomersData] = useState({})

    useEffect(() => {
        if (!currentUser) {
            return navigate("/login");
        } else {
            var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
            permission = permission != null ? permission : []

            if (permission.indexOf('Add Customer') === -1) {
                return navigate('/403-error')
            }

            setTitle('Add Customer')
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
            userService.getAllCountry().then((res) => {
                const countryData = res.data.map((data) => {
                    return {
                        value: data.iso2,
                        option: data.name,
                    };
                });
                setCountry(countryData);
            });
        }
    }, [currentUser])

    const onInputChange = (e) => {
        setCustomersData({ ...customersData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        var customer_data = customersData;
        customer_data.roleType = "Customer";
        var objErrors = validate(customersData);
        if (Object.keys(objErrors).length > 0) {
            setError(objErrors);
            return false;
        }
        userService.addCustomer(customer_data).then((res) => {
                if (res.response === true) {
                    swal({
                        title: "Success!",
                        text: res.message,
                        icon: "success",
                    }).then((isSuccess) => {
                        if (isSuccess) {
                            navigate("/manage-customers");
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
        if (!value.name) {
            errors.name = "Name is required."
        }
        if (!value.email) {
            errors.email = "Email is required."
        }
        else if (!value.email.match('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')) {
            errors.email = "Please enter valid email address."
        }
        if (!value.status) {
            errors.status = "Status is required."
        }
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(value.mobile_no)) {
            errors.mobile_no = "Mobile number must be valid number only."
        }
        if (!value.mobile_no) {
            errors.mobile_no = "Mobile number is required."
        }
        else if (value.mobile_no.length !== 8) {
            errors.mobile_no = "Mobile number must be 8 digits number."
        }
        if (!value.address1) {
            errors.address1 = "Address1 is required."
        }
        if (!value.state) {
            errors.state = "Region is required."
        }
        if (!value.city) {
            errors.city = "City is required."
        }
        if (!pattern.test(value.zipcode)) {
            errors.zipcode = "Zip/Postal code must be valid number only."
        } 
        if (!value.zipcode) {
            errors.zipcode = "Zip/Postal Code is required."
        }
        // if (!value.country) {
        //     errors.country = "Country is required."
        // }
        if (value.country == "Select") {
            errors.country = "Country is required."
        }
        return errors;
    }
    return (
        <>
            <div className="content-wrapper">
                <Heading mainTitle={"Customers"} url='/manage-customers' innerPage={true} pageTitle={title} />
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
                                                            label="Name"
                                                            name="name"
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
                                                            onChange={e => onInputChange(e)}
                                                            placeholder="Customer Email"
                                                            type="email"
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
                                                        <InputDropdown
                                                            label="Status"
                                                            name="status"
                                                            onChange={e => onInputChange(e)}
                                                            options={employeStatus}
                                                        />
                                                        <p className="text-danger pl-2">{error.status}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card card-default">
                                                <div className="card-header">
                                                    <h3 className="mb-0">Address</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <InputTextArea
                                                                    label="Address1"
                                                                    name="address1"
                                                                    onChange={e => onInputChange(e)}
                                                                    placeholder="Address1"
                                                                    type="text"
                                                                />
                                                                <p className="text-danger pl-2">{error.address1}</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <InputTextArea
                                                                    label="Address2"
                                                                    name="address2"
                                                                    onChange={e => onInputChange(e)}
                                                                    placeholder="Address2 Optional"
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <InputDropdown
                                                                    label="Country"
                                                                    name="country"
                                                                    onChange={e => onInputChange(e)}
                                                                    options={Country}
                                                                />
                                                                <p className="text-danger pl-2">{error.country}</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                            <InputText
                                                                    label="State"
                                                                    name="state"
                                                                    onChange={e => onInputChange(e)}
                                                                    placeholder="State"
                                                                    type="text"
                                                                />
                                                                <p className="text-danger pl-2">{error.state}</p>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <InputText
                                                                    label="City"
                                                                    name="city"
                                                                    onChange={e => onInputChange(e)}
                                                                    placeholder="City"
                                                                    type="text"
                                                                />
                                                                <p className="text-danger pl-2">{error.city}</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <InputText
                                                                    label="Zip/Postal Code"
                                                                    name="zipcode"
                                                                    maxLength="8"
                                                                    onChange={e => onInputChange(e)}
                                                                    placeholder="Zip/Postal Code"
                                                                    type="text"
                                                                />
                                                                <p className="text-danger pl-2">{error.zipcode}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="row">
                                                <div className="d-flex justify-content-start w-100">
                                                    <button className="btn btn-primary" >Save</button>
                                                    <BackButton
                                                        url='/manage-customers'
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
export default CustomersAdd;
