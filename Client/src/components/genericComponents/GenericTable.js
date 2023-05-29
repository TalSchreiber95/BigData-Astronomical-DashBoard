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
  TableSortLabel,
} from '@mui/material/';
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';
import './GenericTable.css';

function GenericTable({ tableObject, isImportent = () => false, title }) {
  const { header, body } = tableObject;
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [stopFlashing, setStopFlashing] = useState(false);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState('asc');

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

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, body.length - page * rowsPerPage);

  const sortedBody = stableSort(body, getComparator(order, orderBy));

  const handleStopFlashing = () => {
    setStopFlashing(!stopFlashing);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

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
                    <TableSortLabel
                      active={orderBy === colName}
                      direction={orderBy === colName ? order : 'asc'}
                      onClick={() => handleSort(colName)}
                    >
                      {colName}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? sortedBody.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : sortedBody
              ).map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  style={
                    isImportent(row) && !stopFlashing
                      ? { animation: 'flash 1s infinite' }
                      : {}
                  }
                >
                  {header.map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      {row[header[colIndex]]}
                    </TableCell>
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
      <Button onClick={handleStopFlashing}>
        {stopFlashing ? 'Show' : 'Hide'} Flashing
      </Button>
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
