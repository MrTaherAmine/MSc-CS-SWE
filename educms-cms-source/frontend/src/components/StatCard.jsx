import { Card, CardContent, Typography } from '@mui/material';

export default function StatCard({ label, value, hint }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="text.secondary" variant="body2">{label}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, my: 0.5 }}>{value}</Typography>
        <Typography color="text.secondary" variant="caption">{hint}</Typography>
      </CardContent>
    </Card>
  );
}
