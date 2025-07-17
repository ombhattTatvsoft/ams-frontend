import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

const DataTable = ({ rows, columns, rowId }) => {
  const paginationModel = { page: 0, pageSize: 10 };
  const sizeOptions = [5, 10, 25, { value: -1, label: "All" }];
  return (
    <Paper
      className="shadow-lg rounded-3"
      sx={{ maxHeight: "calc(100vh - 180px)", overflow: "auto",display: "flex" ,flexDirection: "column"}}
    >
      <DataGrid
        className="rounded-3 px-3 py-1"
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={sizeOptions}
        disableRowSelectionOnClick
        showToolbar
        getRowId={rowId}
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",
            fontSize: "1rem",
          },
          "& .MuiTablePagination-selectLabel,.MuiTablePagination-displayedRows":
            {
              marginBottom: 0,
            },
        }}
      />
    </Paper>
  );
};

export default DataTable;
