import React, { useEffect, useState } from 'react';
import Heading from '../../components/template/Heading';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import roleService from '../../services/role.service';
import swal from "sweetalert";

export default function Permission() {
    let { id } = useParams()
    let navigate = useNavigate();
    const [title, setTitle] = useState([])
    const [TypeData, setTypeData] = useState([])
    const { user: currentUser } = useSelector((state) => state.auth);
    const [modules, setModules] = useState([])
    const [subModuleSelected, setSubModuleSelected] = useState([])
    const [finalSubModuleArray, setFinalSubModuleArray] = useState([])
    const [timer, setTimer] = useState(false)
    const [userPermission, setUserPermission] = useState([]);

    useEffect(() => {
        setTitle("Permissions");
        getData();
        // if (currentUser) {

        //     var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
        //     permission = permission != null ? permission : []

        //     if (permission.indexOf('Role Permission') === -1) {
        //         return navigate('/403-error')
        //     }

        //     setUserPermission(permission);

        //     setTitle("Role Permission");
        //     getData()
        // }
        // else {
        //     return navigate("/login")
        // }

    }, [currentUser])

    const getData = async () => {
        roleService.getAllModules().then((res) => {
            var modules = []
            res.data.map(module => {
                module.sub_module.map(sub_module => {
                    sub_module.check = false
                })
                module.check = false
                modules.push(module)
            })

            setModules(modules)
            setTimer(true)
            setTimeout(() => {
                setTimer(false)
            }, 200);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (timer) {
            roleService.getRolePermission(id).then((res) => {
                if(res.data.role_slug == 'user') {
                    setTypeData(' : Staff')
                } else {
                    setTypeData(' : ' +res.data.role_slug);
                }
                var operation = res.data.sub_module;
                var finalArr = []
                var subSelectArr = []
                operation.forEach((module, index) => {
                    index++;
                    selectSubModule(true, module.module_id, module.id)
                    finalArr.push({
                        id: module.id,
                        module_id: module.module_id
                    })
                    subSelectArr.push(index)
                })
                setSubModuleSelected(subSelectArr)
                setFinalSubModuleArray(finalArr)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [timer, subModuleSelected, finalSubModuleArray]);
    const selectMainModule = (e) => {
        if (e.target.checked) {
            checkMainModule(parseInt(e.target.value), true)
        } else {
            checkMainModule(parseInt(e.target.value), false)
        }
    }
    const selectSubModule = (checked, module_id, sub_module_id) => {
        const subModuleArray = subModuleSelected.length > 0 ? subModuleSelected : []
        const finalSub = finalSubModuleArray.length > 0 ? finalSubModuleArray : []

        if (checked) {
            if (subModuleSelected.indexOf(parseInt(sub_module_id)) === -1) {
                subModuleArray.push(parseInt(sub_module_id))
                finalSub.push({
                    id: sub_module_id,
                    module_id: module_id,
                })
                checkUncheck(parseInt(sub_module_id), true)
            }
        } else {
            const index = subModuleArray.indexOf(parseInt(sub_module_id));
            if (index > -1) {
                subModuleArray.splice(index, 1); // 2nd parameter means remove one item only
            }
            var finalSubIndex;
            finalSub.forEach((module, i) => {
                if (module.module_id == module_id && module.id == sub_module_id) {
                    finalSubIndex = i
                }
            })
            finalSub.splice(finalSubIndex, 1)
            checkUncheck(parseInt(sub_module_id), false)
        }

        setSubModuleSelected(subModuleArray)
        setFinalSubModuleArray(finalSub)
        checkUncheckMainModule(module_id)
    }
    const checkMainModule = (module_id, val) => {
        var main_module_sub_arr = []
        modules.forEach(module => {
            if (module_id == module.module_id) {
                module.sub_module.forEach(sub_module => {
                    main_module_sub_arr.push(sub_module.sub_module_id)
                })
            }
        })
        const subModuleArray = subModuleSelected.length > 0 ? subModuleSelected : []
        const finalSub = finalSubModuleArray.length > 0 ? finalSubModuleArray : []
        main_module_sub_arr.forEach(sub_id => {
            if (val) {
                if (subModuleSelected.indexOf(sub_id) === -1) {
                    subModuleArray.push(sub_id)
                    finalSub.push({
                        id: sub_id,
                        module_id: module_id
                    })
                    checkUncheck(sub_id, true)
                }
            } else {
                subModuleArray.splice(sub_id, 1)
                const index = subModuleArray.indexOf(sub_id);
                if (index > -1) {
                    subModuleArray.splice(index, 1); // 2nd parameter means remove one item only
                }
                var finalSubIndex;
                finalSub.forEach((module, i) => {
                    if (module.module_id == module_id && module.id == sub_id) {
                        finalSubIndex = i
                    }
                })
                finalSub.splice(finalSubIndex, 1)
                checkUncheck(sub_id, false)
            }
        })
        setSubModuleSelected(subModuleArray)
        setFinalSubModuleArray(finalSub)

    }
    const checkUncheck = (sub_id, val) => {
        var moduleArray = modules
        moduleArray.forEach(module => {
            module.sub_module.forEach(sub_module => {
                if (sub_module.sub_module_id == sub_id) {
                    sub_module.check = val
                }
            })
        });
        document.getElementById('sub_module' + sub_id).checked = val
        setModules(moduleArray);
    }
    const checkUncheckMainModule = (module_id) => {
        var sub_module_id_arr = []
        var select_sub_module_id = []
        var moduleArray = modules
        moduleArray.forEach(module => {
            if (module.module_id == module_id) {
                module.sub_module.forEach(sub_module => {
                    sub_module_id_arr.push(sub_module.sub_module_id)
                })
            }
        })
        sub_module_id_arr.forEach(sub_id => {
            if (subModuleSelected.indexOf(sub_id) !== -1) {
                select_sub_module_id.push(sub_id)
            }
        })
        var main_module = false;
        if (sub_module_id_arr.length == select_sub_module_id.length) {
            main_module = true
        } else {
            main_module = false
        }
        moduleArray.forEach(module => {
            if (module.module_id == module_id) {
                module.check = main_module
            }
        })
        document.getElementById("module" + module_id).checked = main_module
        setModules(moduleArray);
    }
    const onSubmit = (e) => {
        e.preventDefault()
        var data = {
            role_id: id,
            operation_id: finalSubModuleArray,
        }
        roleService.setRolePermission(data).then((res) => {
            if (res.response == true) {
                swal({
                    title: "Success!",
                    text: res.message,
                    icon: "success",
                }).then((isSuccess) => {
                    if (isSuccess) {
                        navigate("/manage-roles")
                    }
                })
            } else {
                swal({
                    title: "Error!",
                    text: 'Some thing went to wrong.',
                    icon: "error",
                });
            }
        }).catch((error) => {
            console.log(error)
        })
        setTimeout(() => {
            getData()
        }, 1000);
    }
    const renderModule = (module, index) => {
        return (
            <div className="card" key={index}>
                <div className="card-header">
                    <div className="card-title d-flex align-items-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value={module.module_id} id={"module" + module.module_id} onChange={selectMainModule} />
                            <label className="form-check-label" htmlFor={"module" + module.module_id}>
                                {module.module_name}
                            </label>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        {
                            module.sub_module.map((sub_module, index) => {
                                return (
                                    <div className="col-md-3" key={index}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value={sub_module.sub_module_id} id={"sub_module" + sub_module.sub_module_id} onChange={e => { selectSubModule(e.target.checked, module.module_id, sub_module.sub_module_id) }} />
                                            <label className="form-check-label" htmlFor={"sub_module" + sub_module.sub_module_id}>
                                                {sub_module.sub_module_name}
                                            </label>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="content-wrapper">
            <Heading mainTitle={"Roles"} url='/manage-roles' innerPage={true} pageTitle={'Permissions'} titleType={TypeData} />
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {modules.map((module, index) => {
                                return renderModule(module, index)
                            })}
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-start w-100">
                                    {TypeData != 'admin'
                                        ? <button className="btn btn-primary" onClick={onSubmit}>Save</button>
                                        : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
