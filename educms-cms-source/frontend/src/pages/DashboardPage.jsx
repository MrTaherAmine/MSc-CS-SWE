import { useEffect, useState } from 'react';
import {
  Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, MenuItem, Paper, Stack, TextField, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import api from '../api';
import StatCard from '../components/StatCard';

export default function DashboardPage({ user, onLogout }) {
  const [summary, setSummary] = useState(null);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', status: 'draft', category_id: '' });
  const [search, setSearch] = useState('');

  async function load() {
    const [analytics, postsRes, catsRes] = await Promise.all([
      api.get('/analytics/summary'),
      api.get('/posts', { params: { search, limit: 50 } }),
      api.get('/categories')
    ]);
    setSummary(analytics.data);
    setPosts(postsRes.data.items);
    setCategories(catsRes.data);
  }

  useEffect(() => { load(); }, []);

  async function createPost() {
    await api.post('/posts', {
      ...form,
      category_id: form.category_id || null,
      excerpt: form.content.replace(/<[^>]*>/g, '').slice(0, 180)
    });
    setOpen(false);
    setForm({ title: '', content: '', status: 'draft', category_id: '' });
    await load();
  }

  async function deletePost(id) {
    if (!confirm('Delete this post?')) return;
    await api.delete(`/posts/${id}`);
    await load();
  }

  async function runSearch(e) {
    e.preventDefault();
    const result = await api.get('/posts', { params: { search, limit: 50 } });
    setPosts(result.data.items);
  }

  return (
    <Box>
      <Box sx={{ bgcolor: '#0f172a', color: '#fff', px: { xs: 2, md: 4 }, py: 2.2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>EduCMS</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Educational Content Management System
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2">{user?.first_name || user?.username} · {user?.role}</Typography>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} mb={3}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>Content Dashboard</Typography>
            <Typography color="text.secondary">Manage posts, publishing and performance.</Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
            New post
          </Button>
        </Stack>

        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} sm={6} md={3}><StatCard label="Posts" value={summary?.posts?.total ?? '—'} hint={`${summary?.posts?.published ?? 0} published`} /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard label="Drafts" value={summary?.posts?.drafts ?? '—'} hint="Awaiting publication" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard label="Users" value={summary?.users ?? '—'} hint="Active accounts" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard label="Views" value={summary?.views ?? '—'} hint={`${summary?.comments?.pending ?? 0} pending comments`} /></Grid>
        </Grid>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Posts</Typography>
            <Box component="form" onSubmit={runSearch}>
              <TextField
                size="small"
                placeholder="Search content..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </Box>
          </Stack>

          <Stack spacing={1}>
            {posts.map(post => (
              <Paper key={post.post_id} variant="outlined" sx={{ p: 2 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2}>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                      <Typography sx={{ fontWeight: 800 }}>{post.title}</Typography>
                      <Chip size="small" label={post.status} color={post.status === 'published' ? 'success' : 'default'} />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {post.category_name || 'Uncategorized'} · {post.author_name || 'Unknown author'} · {new Date(post.created_at).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {post.excerpt || 'No excerpt'}
                    </Typography>
                  </Box>
                  {(user?.role === 'admin' || user?.role === 'editor') && (
                    <Button color="error" startIcon={<DeleteOutlineIcon />} onClick={() => deletePost(post.post_id)}>
                      Delete
                    </Button>
                  )}
                </Stack>
              </Paper>
            ))}
            {!posts.length && <Typography color="text.secondary">No posts found.</Typography>}
          </Stack>
        </Paper>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Create post</DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2, pt: '12px !important' }}>
          <TextField label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <TextField label="Content" multiline minRows={8} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
          <TextField select label="Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </TextField>
          <TextField select label="Category" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
            <MenuItem value="">Uncategorized</MenuItem>
            {categories.map(c => <MenuItem key={c.category_id} value={c.category_id}>{c.name}</MenuItem>)}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={createPost} disabled={!form.title || !form.content}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
