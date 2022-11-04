import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {

    const getCurrentYear = () => {
        return new Date().getFullYear();
      };

    return (
        <>
      <aside className="control-sidebar control-sidebar-dark"></aside>
        
        <footer className="main-footer">
            <strong>Copyright &copy; {getCurrentYear()} <Link to="/">MERN V2</Link>.</strong>
            All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
            </div>
        </footer>
        </>
    )
}

export default Footer;