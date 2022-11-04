import React from 'react'
import { NavLink } from 'react-router-dom';

function BackButton(props) {
    const { url } = props;
    return (
        <>
            <NavLink to={url} className="btn  btn-danger mx-1" role="button">
                Back
            </NavLink>
        </>
    )
}
export default BackButton;