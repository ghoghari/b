import React from 'react'

function PreLoader () {
    return (
        <div className="preloader flex-column justify-content-center align-items-center">
            <img className="animation__wobble" src="/assets/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60" />
        </div>
    )
}

export default PreLoader;