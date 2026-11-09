import { Typography } from '@mui/material';
import StatusChip from '../components/StatusChip.jsx';

export const orderColumns = [
  { key: 'id', label: 'Order', render: (r) => <strong>{r.id}</strong> },
  {
    key: 'customer',
    label: 'Customer',
    render: (r) => (
      <>
        <Typography variant="body2">{r.customer}</Typography>
        <Typography variant="caption" color="text.secondary">
          {r.email}
        </Typography>
      </>
    ),
  },
  { key: 'date', label: 'Date' },
  { key: 'total', label: 'Total', align: 'right', render: (r) => `$${r.total.toFixed(2)}` },
  { key: 'status', label: 'Status', render: (r) => <StatusChip status={r.status} /> },
];

export const orderSearchKeys = ['id', 'customer', 'email'];
