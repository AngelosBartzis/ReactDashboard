import { Box, Card, CardContent, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function StatCard({ title, value, change, icon }) {
  const positive = change >= 0;
  const TrendIcon = positive ? TrendingUpIcon : TrendingDownIcon;

  return (
    <Card>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" component="p" sx={{ my: 0.5 }}>
            {value}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: positive ? 'success.main' : 'error.main',
            }}
          >
            <TrendIcon fontSize="small" />
            <Typography variant="body2" fontWeight={600}>
              {Math.abs(change)}% vs last month
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: 44,
            height: 44,
            flexShrink: 0,
            display: 'grid',
            placeItems: 'center',
            borderRadius: 1,
            bgcolor: 'action.hover',
            color: 'primary.main',
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}
