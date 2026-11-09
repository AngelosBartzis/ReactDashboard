import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: { main: '#0F6B6B' },
    background: { default: '#F2F5F6', paper: '#FFFFFF' },
    text: { primary: '#14232B', secondary: '#5A6B75' },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Figtree Variable", system-ui, sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCard: { defaultProps: { variant: 'outlined' } },
    MuiPaper: { defaultProps: { elevation: 0 } },
  },
});
