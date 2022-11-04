import React from 'react'

function ActionIcon(props) {

  const { index, editURL, permission, deleteURL,  viewPermission, deletePermission, editPermission,viewData,setViewModal,setViewId ,detailsView} = props;
  const PermissionStatus = props?.PermissionStatus ? props.PermissionStatus : false
  const Viewtarget = props?.Viewtarget ? props.Viewtarget : null;

  const showViewModal = () => {
    setViewModal(true)
    detailsView(viewData)
    setViewId(viewData._id)
    document.querySelector('.openModal').click();
  }
  return (
    <div className="d-flex action-icon" key={index}>
      {PermissionStatus && (
        <span role="button" title="Manage Permission" className="icon-view btn btn-outline-primary mr-2 tooltiptext" onClick={() => permission(index)}>
          <i className="fas fa-lock"></i>
        </span>
      )}
     
      {editPermission && (
        <span role="button" title="Edit" className="icon-edit btn btn-outline-primary mr-2" onClick={() => editURL(index)}>
          <i className="fas fa-pen" ></i>
        </span>
      )}
      {viewPermission && (
        Viewtarget != null && (
          <>
            <button type="button" title="View" className="icon-view btn btn-outline-warning mr-2 " onClick={() => showViewModal()}>
              <i className="fas fa-eye"></i>
            </button>
          </>
        )
      )}
      {deletePermission && (
        <span role="button" title="Delete" className="icon-delete btn btn-outline-danger mr-2" onClick={() => deleteURL(index)}>
          <i className="fas fa-trash" ></i>
        </span>
      )}
    </div>
  )
}
export default ActionIcon;