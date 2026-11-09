import { Chip } from '@mui/material';

const colors = {
  Paid: 'success',
  Pending: 'warning',
  Shipped: 'info',
  Refunded: 'default',
  'In stock': 'success',
  'Low stock': 'warning',
  'Out of stock': 'error',
  Active: 'success',
  Inactive: 'default',
};

export default function StatusChip({ status }) {
  return <Chip size="small" label={status} color={colors[status] ?? 'default'} variant="outlined" />;
}
