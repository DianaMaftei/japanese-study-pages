import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../style/theme';

function HomePage() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const loadPages = async () => {
      const context = require.context('../../public/data', false, /\.json$/);
      const pages = context.keys().map((key) => {
        const fileName = key.slice(2, -5);
        return { id: fileName, title: `Lesson for ${fileName}` };
      }).reverse(); // Reverse the order of the pages
      setPages(pages);
    };

    loadPages();
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom textAlign="center">
            Japanese Daily Lessons
          </Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            <List>
              {pages.map(page => (
                  <ListItem key={page.id} button component={Link} to={`/page/${page.id}`}>
                    <ListItemText primary={page.title} />
                  </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </ThemeProvider>
  );
}

export default HomePage;