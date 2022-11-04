import DataTable from "react-data-table-component"

const Index = ({ loading, columns, rows, totalRows,currentPage, setLimit, setCurrentPage, setSortKey, setSortBy }) => {
    const handleLimit = (newPerPage) => {
        setLimit(newPerPage);
        setCurrentPage(1)
    }

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    //function for handling sort
    const handleSort = (column, sortDirection) => {
        setSortKey(column.sortField)
        setSortBy(sortDirection)
    };

    return(
        <DataTable
        progressPending={loading}
        columns={columns}
        data={rows}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationDefaultPage={currentPage}
        defaultSortFieldId={1}
        sortServer
        onSort={handleSort}
        onChangeRowsPerPage={handleLimit}
        onChangePage={handlePagination}
    />
    )
}

export default Index