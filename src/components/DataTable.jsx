import { useMemo, useState } from 'react';
import {
  Box,
  Card,
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

/**
 * columns: [{ key, label, align?, render?(row) }]
 * searchKeys: row keys included in the text search
 * filter: { key, label, options: string[] } (optional dropdown)
 */
export default function DataTable({
  title,
  rows,
  columns,
  searchKeys,
  searchPlaceholder = 'Search',
  filter,
  rowKey = 'id',
  initialPageSize = 5,
  emptyMessage = 'Nothing matches. Try a different search or filter.',
}) {
  const [query, setQuery] = useState('');
  const [filterValue, setFilterValue] = useState('All');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const okFilter = !filter || filterValue === 'All' || r[filter.key] === filterValue;
      const okQuery = !q || searchKeys.some((k) => String(r[k]).toLowerCase().includes(q));
      return okFilter && okQuery;
    });
  }, [rows, query, filterValue, filter, searchKeys]);

  const visible = filtered.slice(page * pageSize, page * pageSize + pageSize);

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
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            slotProps={{
              htmlInput: { 'aria-label': searchPlaceholder },
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
          {filter && (
            <TextField
              select
              size="small"
              label={filter.label}
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                setPage(0);
              }}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="All">All</MenuItem>
              {filter.options.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Box>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 640 }}>
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell key={c.key} align={c.align}>
                  {c.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((r) => (
              <TableRow key={r[rowKey]} hover>
                {columns.map((c) => (
                  <TableCell key={c.key} align={c.align}>
                    {c.render ? c.render(r) : r[c.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {visible.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">{emptyMessage}</Typography>
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
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => {
          setPageSize(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
