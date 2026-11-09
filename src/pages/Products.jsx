import PageHeader from '../components/PageHeader.jsx';
import DataTable from '../components/DataTable.jsx';
import StatusChip from '../components/StatusChip.jsx';
import { products, categories } from '../data/products.js';

const columns = [
  { key: 'id', label: 'SKU', render: (r) => <strong>{r.id}</strong> },
  { key: 'name', label: 'Product' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price', align: 'right', render: (r) => `$${r.price.toFixed(2)}` },
  { key: 'stock', label: 'In stock', align: 'right' },
  { key: 'status', label: 'Availability', render: (r) => <StatusChip status={r.status} /> },
];

export default function Products() {
  return (
    <>
      <PageHeader title="Products" subtitle="Your catalog and current stock levels." />
      <DataTable
        title="All products"
        rows={products}
        columns={columns}
        searchKeys={['id', 'name']}
        searchPlaceholder="Search by name or SKU"
        filter={{ key: 'category', label: 'Category', options: categories }}
      />
    </>
  );
}
