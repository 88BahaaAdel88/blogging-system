import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { Post } from '../../types/post';
import '../../styles/blog.css';

interface EditPostDialogProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
  onSave: (data: { id: number; title: string; content: string }) => void;
  isSaving: boolean;
}

export function EditPostDialog({ 
  open, 
  onClose, 
  post, 
  onSave, 
  isSaving 
}: EditPostDialogProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSave = () => {
    if (post) {
      onSave({
        id: post.id,
        title,
        content
      });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        className: 'edit-dialog'
      }}
    >
      <DialogTitle className="edit-dialog-header">
        Edit Post
      </DialogTitle>
      <DialogContent className="edit-dialog-content">
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions className="edit-dialog-actions">
        <Button 
          onClick={onClose}
          className="edit-dialog-button cancel"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          className="edit-dialog-button save"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 