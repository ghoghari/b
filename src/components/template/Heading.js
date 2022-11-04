import React from 'react'
import { Link } from 'react-router-dom';

function Heading(props) {

  const { pageTitle, mainTitle, innerPage, url, titleType ,subpagetitle} = props

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-capitalize">{subpagetitle}{pageTitle} {titleType}</h1>
          </div>

          {innerPage ?
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={url}>{mainTitle}</Link>
                </li>
                <li className="breadcrumb-item active">{pageTitle}</li>
              </ol>
            </div>
            :
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">{pageTitle}</li>

              </ol>
            </div>
          }

        </div>
      </div>
    </div>
  )
}
export default Heading;