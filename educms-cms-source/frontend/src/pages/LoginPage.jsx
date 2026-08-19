import { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Alert } from '@mui/material';
import api from '../api';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@educms.local');
  const [password, setPassword] = useState('Admin123!');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('educms_token', data.token);
      onLogin(data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 440 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="overline" color="primary">Educational CMS</Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Welcome to EduCMS</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Sign in to manage educational content.
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2 }}>
            <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" size="large">Sign in</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
