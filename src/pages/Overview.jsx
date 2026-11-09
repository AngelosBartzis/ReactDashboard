import { Box } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import DataTable from '../components/DataTable.jsx';
import { orders, statuses } from '../data/orders.js';
import { orderColumns, orderSearchKeys } from '../components/orderColumns.jsx';

const stats = [
  { title: 'Revenue this month', value: '$48,290', change: 12.4, icon: <PaidIcon /> },
  { title: 'Orders', value: '1,284', change: 8.1, icon: <ShoppingBagIcon /> },
  { title: 'New customers', value: '312', change: -3.2, icon: <PeopleIcon /> },
  { title: 'Shipped on time', value: '96%', change: 1.5, icon: <LocalShippingIcon /> },
];

export default function Overview() {
  return (
    <>
      <PageHeader title="Overview" subtitle="How your shop is doing this month." />
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          mb: 3,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        }}
      >
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </Box>
      <DataTable
        title="Recent orders"
        rows={orders}
        columns={orderColumns}
        searchKeys={orderSearchKeys}
        searchPlaceholder="Search by name, email or order"
        filter={{ key: 'status', label: 'Status', options: statuses }}
      />
    </>
  );
}
