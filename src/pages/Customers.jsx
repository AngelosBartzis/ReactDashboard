import { Avatar, Box, Typography } from '@mui/material';
import PageHeader from '../components/PageHeader.jsx';
import DataTable from '../components/DataTable.jsx';
import StatusChip from '../components/StatusChip.jsx';
import { customers, customerStatuses } from '../data/customers.js';

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('');

const columns = [
  {
    key: 'name',
    label: 'Customer',
    render: (r) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ width: 32, height: 32, fontSize: 14, bgcolor: 'primary.main' }}>{initials(r.name)}</Avatar>
        <Box>
          <Typography variant="body2">{r.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {r.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  { key: 'orders', label: 'Orders', align: 'right' },
  { key: 'spent', label: 'Total spent', align: 'right', render: (r) => `$${r.spent.toFixed(2)}` },
  { key: 'joined', label: 'Joined' },
  { key: 'status', label: 'Status', render: (r) => <StatusChip status={r.status} /> },
];

export default function Customers() {
  return (
    <>
      <PageHeader title="Customers" subtitle="People who have bought from your shop." />
      <DataTable
        title="All customers"
        rows={customers}
        columns={columns}
        searchKeys={['name', 'email', 'id']}
        searchPlaceholder="Search by name or email"
        filter={{ key: 'status', label: 'Status', options: customerStatuses }}
      />
    </>
  );
}
