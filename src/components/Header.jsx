import { useState } from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ButtonBase,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/NotificationsNone';

export default function Header({ onMenuClick }) {
  const [anchor, setAnchor] = useState(null);
  const closeMenu = () => setAnchor(null);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <IconButton
          edge="start"
          aria-label="Open navigation"
          onClick={onMenuClick}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton aria-label="Notifications">
          <Badge color="primary" variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <ButtonBase
          onClick={(e) => setAnchor(e.currentTarget)}
          aria-label="Open profile menu"
          sx={{ gap: 1.5, px: 1, py: 0.5, borderRadius: 1 }}
        >
          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>AK</Avatar>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left' }}>
            <Typography variant="body2" fontWeight={600}>
              Alex Kapas
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Store owner
            </Typography>
          </Box>
        </ButtonBase>

        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={closeMenu}>
          <MenuItem onClick={closeMenu}>Profile</MenuItem>
          <MenuItem onClick={closeMenu}>Account settings</MenuItem>
          <MenuItem onClick={closeMenu}>Sign out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
