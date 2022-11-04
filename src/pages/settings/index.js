import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import BackButton from "../../components/buttons/backButton";
import InputText from "../../components/inputFields/inputText";
import Heading from "../../components/template/Heading";
import settingService from "../../services/setting.service";
import { useForm } from "react-hook-form";

const Setting = () => {
    let navigate = useNavigate();
    const [title, setTitle] = useState([])
    const [tabsData, setTabsData] = useState([])
    const [settingId, setSettingId] = useState()
    const { user: currentUser } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!currentUser || currentUser.role !== "Admin") {
            return navigate("/login");
        } else {
            var permission = currentUser?.data ? currentUser?.data.permission : currentUser?.permission
            permission = permission != null ? permission : []
        }
        getData();
        setTitle("Settings");
    }, [currentUser])

    const getData = () => {
		settingService.getSetting().then((res) => {
            setSettingId(res.data[0]._id)
            setTabsData(res.data[0].tab)
		}).catch(err => {
			console.log(err)
		})
	};
    const onInputChange = (e) => {
        console.log("Event Values :",e.target.value)
        // const newItems = tabsData.map(item => {
        //     item.sections.map(sectionssitem => {
        //         sectionssitem.settings.map(settingsitem => {

        //             return settingsitem;
        //         });
        //     });
        //     setTabsData(newItems)
        //   });
        // setTabsData(prevState => ({
        //     tabsData : {                   // object that we want to update
        //         ...prevState.tabsData,    // keep all other key-value pairs
        //         sections: {
        //           ...prevState.sections,
        //           settings: {
        //             ...prevState.settings
        //           }
        //         }
              
        //     }
        // }))
      };
    const onSubmit = (event) => {
        event.preventDefault()
        settingService.updateSetting(settingId,tabsData).then((res) => {
            if (res.response == true) {
                swal({
                    title: "Success!",
                    text: res.message,
                    icon: "success",
                }).then((isSuccess) => {
                    if (isSuccess) {
                        navigate("/settings");
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
    }
  
    return (
        <div className="content-wrapper">
            <Heading innerPage={false} pageTitle={title} />
            <section className="content">
                <div className="container-fluid">
                    <div className="col-12 col-sm-12">
                        <div className="card card-primary card-outline card-outline-tabs">
                            <div className="card-header p-0 border-bottom-0">
                                <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                    {tabsData.map((tabsDetails) => (
                                        <li className="nav-item">
                                            <a className="nav-link active" id={`custom-tabs-four-${tabsDetails.key}-tab`}  data-toggle="pill" href={`#custom-tabs-four-${tabsDetails.key}`} role="tab" aria-controls={`custom-tabs-four-${tabsDetails.key}`} aria-selected="true">{tabsDetails.value}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content" id="custom-tabs-four-tabContent">
                                    {tabsData.map((tabsDetailss,tabindex) => (
                                        <div key={tabindex} className="tab-pane fade active show" id={`#custom-tabs-four-${tabsDetailss.key}`} role="tabpanel" aria-labelledby={`custom-tabs-four-${tabsDetailss.key}-tab`}>
                                            <form onSubmit={e => onSubmit(e)}>
                                                <div className="row pl-4 pr-4">
                                                    <div className="col-sm-12 mt-4">
                                                        {tabsDetailss.sections.map((tabsSections) => (
                                                            <div className="card">
                                                                <div className="card-body p-3">
                                                                    <div className="row">
                                                                        <div className="col-3">
                                                                            <div className="form-group">
                                                                                <label>{tabsSections.value}</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row"> 
                                                                        {tabsSections.settings.map((tabsSettings,index) => (
                                                                        <div className="col-6">
                                                                                <div className="form-group">
                                                                                <label>{tabsSettings.label}</label>
                                                                                {tabsSettings.type == 'textbox' ? (
                                                                                    <input className="form-control" type="text"  
                                                                                    name={tabsSettings.label}
                                                                                    value={tabsSettings.value}
                                                                                    onChange={e => onInputChange(e)} />
                                                                                ) : (
                                                                                    <textarea className="form-control" type="text"  name={tabsSettings.label} 
                                                                                    value={tabsSettings.value} 
                                                                                    onChange={e => onInputChange(e)}></textarea>
                                                                                )}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
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
                                     ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Content */}
                </div>
            </section>
        </div>
    )
}

export default Setting;