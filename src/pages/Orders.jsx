import PageHeader from '../components/PageHeader.jsx';
import DataTable from '../components/DataTable.jsx';
import { orders, statuses } from '../data/orders.js';
import { orderColumns, orderSearchKeys } from '../components/orderColumns.jsx';

export default function Orders() {
  return (
    <>
      <PageHeader title="Orders" subtitle="Every order placed in your shop." />
      <DataTable
        title="All orders"
        rows={orders}
        columns={orderColumns}
        searchKeys={orderSearchKeys}
        searchPlaceholder="Search by name, email or order"
        filter={{ key: 'status', label: 'Status', options: statuses }}
        initialPageSize={10}
      />
    </>
  );
}
