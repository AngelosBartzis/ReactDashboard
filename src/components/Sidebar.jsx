import { NavLink, useLocation } from 'react-router-dom';
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
  { label: 'Overview', to: '/', icon: <DashboardIcon /> },
  { label: 'Orders', to: '/orders', icon: <ShoppingBagIcon /> },
  { label: 'Products', to: '/products', icon: <InventoryIcon /> },
  { label: 'Customers', to: '/customers', icon: <PeopleIcon /> },
  { label: 'Settings', to: '/settings', icon: <SettingsIcon /> },
];

const paperSx = {
  width: DRAWER_WIDTH,
  boxSizing: 'border-box',
  bgcolor: '#14232B',
  color: '#E6EEF0',
  border: 0,
};

function NavContent({ onNavigate }) {
  const { pathname } = useLocation();

  return (
    <Box>
      <Typography variant="h6" sx={{ px: 3, py: 2.5 }}>
        Harbor Shop
      </Typography>
      <List sx={{ px: 1.5 }}>
        {navItems.map(({ label, to, icon }) => (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            selected={pathname === to}
            onClick={onNavigate}
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
  const content = <NavContent onNavigate={onClose} />;

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
