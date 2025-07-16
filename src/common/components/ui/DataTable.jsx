import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from "@mui/material";

const DataTable = ({ rows, columns }) => {
  const paginationModel = { page: 0, pageSize: 5 };
  const sizeOptions = [2,5,10,25,{ value: -1, label: 'All' }];
  return (
    <Paper sx={{overflow: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={sizeOptions}
        disableRowSelectionOnClick
        showToolbar
        sx={{
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
