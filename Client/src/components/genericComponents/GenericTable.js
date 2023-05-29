import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Switch,
  Button,
  CardHeader,
} from '@mui/material/';
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';
import './GenericTable.css'; // Assuming you have a separate CSS file for styles

function GenericTable({ tableObject, isImportent = () => false, title }) {
  const { header, body } = tableObject;
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [stopFlashing, setStopFlashing] = useState(false); // State to control animation
  console.log("tableObject: ", tableObject);
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, body.length - page * rowsPerPage);

  const handleStopFlashing = () => {
    setStopFlashing(!stopFlashing); // Set the stopFlashing state to true
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CardHeader title={title} />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                {header.map((colName, index) => (
                  <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                    {colName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? body.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : body
              ).map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  style={
                    isImportent(row) && !stopFlashing
                      ? { animation: 'flash 1s infinite' }
                      : {}
                  }
                >
                  {Object.values(row).map((value, colIndex) => (
                    <TableCell key={colIndex}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={header.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={body.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={
          <Switch
            color="success"
            checked={dense}
            onChange={handleChangeDense}
          />
        }
        label="Dense padding"
      />
      <Button onClick={handleStopFlashing}>{stopFlashing ? "Show" : "Hide"} Flashing</Button> {/* Add the button */}
    </Box>
  );
}

GenericTable.propTypes = {
  tableObject: PropTypes.shape({
    header: PropTypes.arrayOf(PropTypes.string).isRequired,
    body: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  isImportent: PropTypes.func,
};

export default GenericTable;
