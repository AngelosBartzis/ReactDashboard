import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const DRAWER_WIDTH = 240;

const navItems = [
  { label: 'Overview', icon: <DashboardIcon /> },
  { label: 'Orders', icon: <ShoppingBagIcon /> },
  { label: 'Products', icon: <InventoryIcon /> },
  { label: 'Customers', icon: <PeopleIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
];

const paperSx = {
  width: DRAWER_WIDTH,
  boxSizing: 'border-box',
  bgcolor: '#14232B',
  color: '#E6EEF0',
  border: 0,
};

function NavContent({ active, onSelect }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ px: 3, py: 2.5 }}>
        Harbor Shop
      </Typography>
      <List sx={{ px: 1.5 }}>
        {navItems.map(({ label, icon }) => (
          <ListItemButton
            key={label}
            selected={active === label}
            onClick={() => onSelect(label)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&.Mui-selected, &.Mui-selected:hover': { bgcolor: 'primary.main' },
              '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default function Sidebar({ mobileOpen, onClose }) {
  const [active, setActive] = useState('Overview');

  const handleSelect = (label) => {
    setActive(label);
    onClose();
  };

  const content = <NavContent active={active} onSelect={handleSelect} />;

  return (
    <Box component="nav" aria-label="Main navigation" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': paperSx }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': paperSx }}
      >
        {content}
      </Drawer>
    </Box>
  );
}
