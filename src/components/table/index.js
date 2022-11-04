import React, { useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { NavLink } from "react-router-dom";

export default function Table(props) {
  const {
    data,
    columns,
    setShowImportModal,
    className,
    includeHeader,
    exportData,
    exportTableColumns,
    exportTableData
  } = props;

  const url = props?.url ? props.url : null;
  const urls = props?.urls ? props.urls : null;
  const backUrl = props?.backUrl ? props.backUrl : null;
  const target = props?.target ? props.target : null;
  const [datatable, setDatatable] = React.useState({
    columns: [],
    rows: [],
  });

  useEffect(() => {
    setDatatable({
      columns: columns,
      rows: data,
    });
    let names = ["sorting"];

    columns.map((data, id) => {
      if (data.label === "Action") {
        names.push("ml-5");
      }
    });
    return names.join(" ");
  }, [data, columns]);
  const showEditDat = () => {
    setShowImportModal(true);
    document.querySelector(".openImportModal").click();
  };

  const convertArrayOfObjectsToCSV = (array) => {
    let result
    const columnDelimiter = ','
    const lineDelimiter = '\n'
    result = ''
    result += exportTableColumns.join(columnDelimiter)
    result += lineDelimiter
    array.forEach(item => {
      let ctr = 0
      exportTableColumns.forEach(key => {
        if (ctr > 0) result += columnDelimiter
        result += item[key] || ""
        ctr++
      })
      result += lineDelimiter
    })
    return result
  }
  const exportTableToCsv = () => {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(exportTableData)
    if (csv === null) return
    const filename = 'export.csv'
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }
    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  return (
    <>
      <div className={!includeHeader ? "col-12" : ""}>
        <div className={!includeHeader ? "card" : ""}>
          {!includeHeader && (
            <div className="card-header pt-2 pr-1 pb-2">
              <div className="d-flex justify-content-between align-items-center float-right">
                <div>
                  {backUrl != null && (
                    <NavLink
                      to={backUrl}
                      className="btn btn-danger"
                      role="button"
                    >
                      <i className="fa fa-arrow-left"></i> Back
                    </NavLink>
                  )}
                  {url != null && (
                    <NavLink
                      to={url}
                      className="btn btn-primary  ml-2"
                      role="button"
                    >
                      <i className="fas fa-plus"></i> Add
                    </NavLink>
                  )}
                  {urls != null && (
                    <NavLink
                      to={urls}
                      className="btn btn-primary ml-2"
                      role="button"
                    >
                      <i className="fas fa-plus"></i> Import CSV
                    </NavLink>
                  )}
                  {target != null && (
                    <>
                      <button
                        type="button"
                        title=""
                        className="btn btn-primary ml-2"
                        onClick={() => showEditDat()}
                      >
                        <i className="fas fa-file-import m-1"></i> Import CSV
                      </button>
                    </>
                  )}
                  {exportData &&<button className="btn btn-primary ml-2" onClick={exportTableToCsv}><i className="fa fa-download"></i> Export CSV</button>}
                </div>
              </div>
            </div>
          )}
          <div className="card-body">
            <MDBDataTableV5
              hover
              scrollX
              entriesOptions={[10, 20, 25]}
              entries={10}
              data={datatable}
              fullPagination
              searchTop
              searchBottom={false}
              className={className ? className : ""}
            />
          </div>
        </div>
      </div>
    </>
  );
}
