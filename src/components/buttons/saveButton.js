import React from 'react'
import { NavLink } from 'react-router-dom';

function SaveButton(props) {
    const { url } = props;

    return (
        <NavLink to={url} className="btn btn-primary" role="button">
            Save
        </NavLink>
    )
}

export default SaveButton;