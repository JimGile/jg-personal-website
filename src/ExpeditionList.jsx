import React, { useState, useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import SectionTitle from './SectionTitle';
import MountainCard from './MountainCard'; 
import mountainData from './mountainData.json';

// Helper functions for sorting
function descendingComparator(a, b, orderBy) {
  let valA = a[orderBy];
  let valB = b[orderBy];

  // Attempt to parse elevation for numeric comparison if possible
  if (orderBy === 'Elevation (Feet)') {
    valA = parseFloat(String(valA).replace(/[^0-9.-]+/g, ""));
    valB = parseFloat(String(valB).replace(/[^0-9.-]+/g, ""));
  }

  if (typeof valA === 'string' && typeof valB === 'string') {
    valA = valA.toLowerCase();
    valB = valB.toLowerCase();
  }

  if (valB < valA) {
    return -1;
  }
  if (valB > valA) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'Image URL', numeric: false, disablePadding: true, label: 'Image', sortable: false, mobileHidden: false },
  { id: 'Mountain Name', numeric: false, disablePadding: false, label: 'Mountain', sortable: true, mobileHidden: false },
  { id: 'Country', numeric: false, disablePadding: false, label: 'Country', sortable: true, mobileHidden: true },
  { id: 'Elevation (Feet)', numeric: false, disablePadding: false, label: 'Elevation', sortable: true, mobileHidden: false },
];


function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, isMobile } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.filter(h => !(isMobile && h.mobileHidden)).map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={headCell.id === 'Image URL' ? { width: '80px', pl: 1 } : {}}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

function ExpeditionList() {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('Elevation (Feet)'); // Default sort by Country
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10); // Fixed as per requirement
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMountain, setSelectedMountain] = useState(null);

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page on new search
  };

  const handleMountainClick = (mountain) => {
    setSelectedMountain(mountain);
  };

  const handleCloseModal = () => {
    setSelectedMountain(null);
  };

  const filteredMountains = useMemo(() => {
    if (!mountainData) return [];
    return mountainData.filter((mountain) =>
      mountain['Mountain Name'].toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const sortedAndPaginatedMountains = useMemo(() => {
    return stableSort(filteredMountains, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredMountains, order, orderBy, page, rowsPerPage]);

  if (!mountainData) {
    return <Typography>Loading mountain data...</Typography>; // Or some other loading state
  }

  return (
    <section id="climbing">
      <SectionTitle>Ski Mountaineering Expeditions</SectionTitle>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by Mountain Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
        <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
          <Table
            aria-labelledby="tableTitle"
            size="medium"
            sx={{ width: '100%', tableLayout: 'auto' }}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              isMobile={isMobile}
            />
            <TableBody>
              {sortedAndPaginatedMountains.map((mountain, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                // Only show columns where mobileHidden is false (on mobile)
                const visibleCells = headCells.filter(h => !(isMobile && h.mobileHidden));
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={mountain['Mountain Name'] + index}
                    onClick={() => handleMountainClick(mountain)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {visibleCells.map((headCell) => {
                      if (headCell.id === 'Image URL') {
                        return (
                          <TableCell key={headCell.id} padding="none" sx={{ pl: 1 }}>
                            <Avatar
                              src={mountain['Image URL']}
                              alt={mountain['Mountain Name']}
                              variant="rounded"
                              sx={{ width: 60, height: 40, mr: 1 }}
                            />
                          </TableCell>
                        );
                      }
                      if (headCell.id === 'Mountain Name') {
                        return (
                          <TableCell key={headCell.id} component="th" id={labelId} scope="row">
                            <Link
                              component="button"
                              variant="body2"
                              sx={{ textAlign: 'left' }}
                              tabIndex={-1}
                            >
                              {mountain['Mountain Name']}
                            </Link>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={headCell.id}>
                          {mountain[headCell.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {sortedAndPaginatedMountains.length === 0 && (
                <TableRow>
                  <TableCell colSpan={headCells.filter(h => !(isMobile && h.mobileHidden)).length} align="center">
                    No mountains found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={filteredMountains.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
      <Dialog
        open={Boolean(selectedMountain)}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {selectedMountain ? selectedMountain['Mountain Name'] : ''}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedMountain && <MountainCard mountain={selectedMountain} />}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ExpeditionList;