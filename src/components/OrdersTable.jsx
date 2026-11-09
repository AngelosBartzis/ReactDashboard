import { useMemo, useState } from 'react';
import {
  Box,
  Card,
  Chip,
  InputAdornment,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { statuses } from '../data/orders.js';

const statusColor = {
  Paid: 'success',
  Pending: 'warning',
  Shipped: 'info',
  Refunded: 'default',
};

export default function OrdersTable({ rows }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesStatus = status === 'All' || r.status === status;
      const matchesQuery =
        !q || [r.id, r.customer, r.email].some((v) => v.toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });
  }, [rows, query, status]);

  const visible = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const onQuery = (e) => {
    setQuery(e.target.value);
    setPage(0);
  };
  const onStatus = (e) => {
    setStatus(e.target.value);
    setPage(0);
  };

  return (
    <Card>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Recent orders
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            size="small"
            placeholder="Search by name, email or order"
            value={query}
            onChange={onQuery}
            slotProps={{
              htmlInput: { 'aria-label': 'Search orders' },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ minWidth: { sm: 280 } }}
          />
          <TextField
            select
            size="small"
            label="Status"
            value={status}
            onChange={onStatus}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="All">All statuses</MenuItem>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 640 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{r.id}</TableCell>
                <TableCell>
                  <Typography variant="body2">{r.customer}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {r.email}
                  </Typography>
                </TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell align="right">${r.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip size="small" label={r.status} color={statusColor[r.status]} variant="outlined" />
                </TableCell>
              </TableRow>
            ))}
            {visible.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No orders match. Try a different search or status.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10]}
      />
    </Card>
  );
}
