import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useState } from 'react';
import { blogService } from '../../services/api';
import { Post } from '../../types/post';
import { EditPostDialog } from './EditPostDialog';
import '../../styles/blog.css';

export function PostsList() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await blogService.getPosts();
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => blogService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: number; title: string; content: string }) =>
      blogService.updatePost(data.id, { title: data.title, content: data.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setEditDialogOpen(false);
    },
  });

  const handleEditClick = (post: Post) => {
    setSelectedPost(post);
    setEditDialogOpen(true);
  };

  const handleUpdate = (data: { id: number; title: string; content: string }) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">Error loading posts</p>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-posts">
        {posts?.map((post) => (
          <div key={post.id} className="blog-post-card">
            <div className="blog-post-content">
              <div className="blog-post-header">
                <h2 className="blog-post-title">{post.title}</h2>
                <div className="blog-post-actions">
                  <button 
                    className="blog-post-button edit"
                    onClick={() => handleEditClick(post)}
                  >
                    <EditIcon />
                  </button>
                  <button 
                    className="blog-post-button delete"
                    onClick={() => deleteMutation.mutate(post.id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              <p className="blog-post-text">{post.content}</p>
            </div>
          </div>
        ))}
      </div>

      <EditPostDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        post={selectedPost}
        onSave={handleUpdate}
        isSaving={updateMutation.isPending}
      />
    </div>
  );
}
