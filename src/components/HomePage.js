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
      // Get all file names and convert them to date objects for sorting
      const allPages = context.keys().map((key) => {
        const fileName = key.slice(2, -5); // Remove './' and '.json'
        return {
          id: fileName,
          date: new Date(fileName),
          title: `Lesson for ${fileName}`
        };
      });

      // Sort pages by date in descending order
      const sortedPages = allPages.sort((a, b) => b.date - a.date);

      // Process pages and add recap links
      const processedPages = [];

      sortedPages.forEach((page, index) => {
        const pageDate = page.date;

        // If it's a Saturday, add a recap link for the previous week
        if (pageDate.getDay() === 6) { // Saturday
          // Calculate the date range for the previous week
          const weekEnd = new Date(pageDate);
          weekEnd.setDate(weekEnd.getDate() + 1); // Sunday
          const weekStart = new Date(weekEnd);
          weekStart.setDate(weekStart.getDate() - 6); // Previous Monday

          processedPages.push({
            id: `${weekStart.toISOString().split('T')[0]}_${pageDate.toISOString().split('T')[0]}`,
            title: `Recap Lesson for week: ${weekStart.toISOString().split('T')[0]} to ${weekEnd.toISOString().split('T')[0]}`,
            isRecap: true,
            date: pageDate
          });
        }

        processedPages.push(page);
      });

      setPages(processedPages);
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
                  <ListItem
                      key={page.id}
                      component={Link}
                      to={page.isRecap ? `/recap/${page.id}` : `/page/${page.id}`}
                      sx={{
                        textDecoration: 'none',
                        ...(page.isRecap ? {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.12)',
                          }
                        } : {
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          }
                        })
                      }}
                  >
                    <ListItemText
                        primary={page.title}
                        primaryTypographyProps={page.isRecap ? {
                          fontWeight: 'bold',
                          color: 'primary'
                        } : {}}
                    />
                  </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </ThemeProvider>
  );
}

export default HomePage;