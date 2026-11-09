import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  MenuItem,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import PageHeader from '../components/PageHeader.jsx';

const initial = {
  name: 'Alex Kapas',
  email: 'alex@harborshop.example',
  storeName: 'Harbor Shop',
  currency: 'USD',
  newOrders: true,
  lowStock: true,
  weeklySummary: false,
};

function Section({ title, description, children }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Stack spacing={2}>{children}</Stack>
      </CardContent>
    </Card>
  );
}

export default function Settings() {
  const [values, setValues] = useState(initial);
  const [saved, setSaved] = useState(false);

  const setField = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const setToggle = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.checked }));

  const toggle = (key, label) => (
    <FormControlLabel
      key={key}
      label={label}
      control={<Switch checked={values[key]} onChange={setToggle(key)} />}
    />
  );

  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your account and store." />
      <Stack spacing={3} sx={{ maxWidth: 720 }}>
        <Section title="Profile" description="Your name and the email we send updates to.">
          <TextField label="Full name" value={values.name} onChange={setField('name')} />
          <TextField label="Email" type="email" value={values.email} onChange={setField('email')} />
        </Section>

        <Section title="Store" description="How your shop appears to customers.">
          <TextField label="Store name" value={values.storeName} onChange={setField('storeName')} />
          <TextField select label="Currency" value={values.currency} onChange={setField('currency')}>
            {['USD', 'EUR', 'GBP'].map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
        </Section>

        <Section title="Notifications" description="Choose which emails you get.">
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {toggle('newOrders', 'New orders')}
            {toggle('lowStock', 'Low stock alerts')}
            {toggle('weeklySummary', 'Weekly summary')}
          </Box>
        </Section>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => setSaved(true)}>
            Save changes
          </Button>
          <Button onClick={() => setValues(initial)}>Reset</Button>
        </Box>
      </Stack>

      <Snackbar open={saved} autoHideDuration={3000} onClose={() => setSaved(false)}>
        <Alert severity="success" variant="filled" onClose={() => setSaved(false)}>
          Changes saved
        </Alert>
      </Snackbar>
    </>
  );
}
