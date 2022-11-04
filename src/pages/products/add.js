import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/backButton";
import InputDropdown from "../../components/inputFields/inputDropdown";
import InputText from "../../components/inputFields/inputText";
import InputTextArea from "../../components/inputFields/inputTextArea";
import Heading from "../../components/template/Heading";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import productService from "../../services/product.service";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
function ProductsAdd() {

    let navigate = useNavigate();

    const [title, setTitle] = useState([])
    const [isSubmit, setIsSubmit] = useState(false);
    const [employeStatus, setemployeStatus] = useState([])
    const [files, setFiles] = useState([]);
    const [error, setError] = useState({});
    const [productData, setProductData] = useState({})
    const { user: currentUser } = useSelector((state) => state.auth);
    const myArray = [];
    useEffect(() => {
        if (!currentUser) {
            return navigate("/login");
        } else {
            var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
            permission = permission != null ? permission : []

            if (permission.indexOf('Add Customer') === -1) {
                return navigate('/403-error')
            }

            setTitle('Add Products')
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
    const Preview = ({ meta }) => {
        const { name, percent, status, previewUrl } = meta;
        return (
          <div className="preview-box">
            <img src={previewUrl} /> <span className="name">{name}</span> - <span className="status">{status}</span>{status !== "done" && <span className="percent"> ({Math.round(percent)}%)</span>}
          </div>
        )
      }
      const getUploadParams = ({ file }) => {
        // setFiles(file)
        myArray.push(file);
        
      }
      const handleChangeStatus = ({ xhr }) => {
        if (xhr) {
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              const result = JSON.parse(xhr.response);
              console.log(result);
            }
          }
        }
      }
      const onInputChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        var objErrors = validate(productData);
        if (Object.keys(objErrors).length > 0) {
            setError(objErrors);
            return false;
        }
        // const body = new FormData();
        // body.append('dataFiles', myArray);
        // body.append('productDetails', productData);
        productService.addProduct(productData).then((res) => {
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
        if (!value.description) {
            errors.description = "Description is required."
        }
        if (!value.price) {
            errors.price = "Price is required."
        }
        if (!value.stock) {
            errors.stock = "Stock is required."
        }
        return errors;
    }
    return (
        <>
        <div className="content-wrapper">
            <Heading mainTitle={"Products"} url='/manage-products' innerPage={true} pageTitle={title} />
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
                                                        placeholder="Product Name"
                                                        type="text"
                                                    />
                                                    <p className="text-danger pl-2">{error.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <InputTextArea
                                                        label="Description"
                                                        name="description"
                                                        onChange={e => onInputChange(e)}
                                                        placeholder="Description"
                                                    />
                                                    <p className="text-danger pl-2">{error.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <InputText
                                                        label="Price"
                                                        name="price"
                                                        onChange={e => onInputChange(e)}
                                                        placeholder="Price"
                                                        type="number"
                                                        min = "1"
                                                    />
                                                    <p className="text-danger pl-2">{error.price}</p>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <InputText
                                                        label="Stock"
                                                        name="stock"
                                                        onChange={e => onInputChange(e)}
                                                        placeholder="Stock"
                                                        type="number"
                                                        min = "1"
                                                    />
                                                    <p className="text-danger pl-2">{error.stock}</p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                            <Dropzone
                                                getUploadParams={getUploadParams}
                                                onChangeStatus={handleChangeStatus}
                                                styles={{
                                                    dropzone: { overflow: 'auto', border: '1px solid #999', background: '#f5f5f5' },
                                                    inputLabelWithFiles: { margin: '20px 3%' }
                                                }}
                                                canRemove={false}
                                                PreviewComponent={Preview}
                                                accept="image/*"
                                            />
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
export default ProductsAdd;
