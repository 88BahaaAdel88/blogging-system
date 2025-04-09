import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Layout from './components/Layout';
import { CreatePost } from './components/Blog/CreatePost';
import { PostsList } from './components/Blog/PostsList';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Container maxWidth="lg">
            <CreatePost />
            <PostsList />
          </Container>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;