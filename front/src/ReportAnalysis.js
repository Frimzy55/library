import React from 'react';
import { Card, CardContent, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { Timeline, BarChart, People, LibraryBooks, TrendingUp } from '@mui/icons-material';

function ReportAnalysis() {
  const reportSections = [
    {
      title: "Borrowing & Return Reports",
      icon: <BarChart fontSize="large" color="primary" />,
      items: [
        "Number of books borrowed per day/week/month",
        "Overdue books and fines collected",
        "Most borrowed books",
        "Books returned on time vs. late returns"
      ]
    },
    {
      title: "Membership Reports",
      icon: <People fontSize="large" color="primary" />,
      items: [
        "Total active members",
        "New members registered per month",
        "Most active members (frequent borrowers)",
        "Inactive members (no recent borrows)"
      ]
    },
    {
      title: "Book Inventory Reports",
      icon: <LibraryBooks fontSize="large" color="primary" />,
      items: [
        "Total books available",
        "New books added per month",
        "Most popular genres/categories",
        "Books needing replacement"
      ]
    },
    {
      title: "Member Visit Tracking & Attendance",
      icon: <Timeline fontSize="large" color="primary" />,
      items: [
        "Daily visitor count",
        "Peak usage hours",
        "Visit trends over time",
        "Most used resources"
      ]
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '30px', color: '#2c3e50' }}>
        <TrendingUp style={{ marginRight: '10px', verticalAlign: 'bottom' }} />
        Library Analytics & Reports
      </Typography>

      <Grid container spacing={3}>
        {reportSections.map((section, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card elevation={3} style={{ height: '100%', borderRadius: '15px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
                  {section.icon}
                  <span style={{ marginLeft: '10px' }}>{section.title}</span>
                </Typography>
                
                <List dense>
                  {section.items.map((item, itemIndex) => (
                    <ListItem key={itemIndex} style={{ padding: '8px 0' }}>
                      <ListItemText 
                        primary={item} 
                        primaryTypographyProps={{ 
                          variant: 'body2',
                          style: { 
                            fontSize: '0.95rem',
                            color: '#34495e'
                          }
                        }} 
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ReportAnalysis;