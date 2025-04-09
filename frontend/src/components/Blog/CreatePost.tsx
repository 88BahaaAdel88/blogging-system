import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Box, 
  TextField, 
  Button, 
  Paper,
  Typography 
} from '@mui/material';
import { blogService } from '../../services/api';

export function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      blogService.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setTitle('');
      setContent('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate({ title, content });
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Create New Post
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          required
          multiline
          rows={4}
        />
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ mt: 2 }}
          disabled={createPostMutation.isPending}
        >
          {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
        </Button>
      </Box>
    </Paper>
  );
}
