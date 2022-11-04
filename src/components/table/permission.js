import React from 'react'

function Permission(props) {

	const { index, permission } = props;

	return (
		<div className="d-flex action-icon" >
			<span role="button" className="icon-view btn btn-outline-primary mr-2" onClick={() => permission(index)}>
				<i className="fas fa-lock"></i>
			</span>
		</div>
	)
}
export default Permission;