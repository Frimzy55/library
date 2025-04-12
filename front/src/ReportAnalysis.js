import React from 'react';
import { Card, CardContent, Typography, Grid, List, ListItem, Button } from '@mui/material';
import { Timeline, BarChart, People, LibraryBooks, TrendingUp } from '@mui/icons-material';

function ReportAnalysis() {
  const reportSections = [
    {
      title: "Borrowing & Return Reports",
      icon: <BarChart fontSize="large" color="primary" />,
      items: [
        { label: "Number of books borrowed per day/week/month", action: () => console.log("Borrowing frequency report") },
        { label: "Overdue books and fines collected", action: () => console.log("Overdue report") },
        { label: "Most borrowed books", action: () => console.log("Popular books report") },
        { label: "Books returned on time vs. late returns", action: () => console.log("Return timeliness report") }
      ]
    },
    {
      title: "Membership Reports",
      icon: <People fontSize="large" color="primary" />,
      items: [
        { label: "Total active members", action: () => console.log("Active members report") },
        { label: "New members registered per month", action: () => console.log("New members report") },
        { label: "Most active members (frequent borrowers)", action: () => console.log("Top members report") },
        { label: "Inactive members (no recent borrows)", action: () => console.log("Inactive members report") }
      ]
    },
    {
      title: "Book Inventory Reports",
      icon: <LibraryBooks fontSize="large" color="primary" />,
      items: [
        { label: "Total books available", action: () => console.log("Inventory count report") },
        { label: "New books added per month", action: () => console.log("New acquisitions report") },
        { label: "Most popular genres/categories", action: () => console.log("Genre popularity report") },
        { label: "Books needing replacement", action: () => console.log("Replacement needed report") }
      ]
    },
    {
      title: "Member Visit Tracking & Attendance",
      icon: <Timeline fontSize="large" color="primary" />,
      items: [
        { label: "Daily visitor count", action: () => console.log("Daily visitors report") },
        { label: "Peak usage hours", action: () => console.log("Peak hours report") },
        { label: "Visit trends over time", action: () => console.log("Visit trends report") },
        { label: "Most used resources", action: () => console.log("Resource usage report") }
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
                    <ListItem key={itemIndex} style={{ padding: '4px 0' }}>
                      <Button 
                        variant="outlined" 
                        fullWidth 
                        onClick={item.action}
                        style={{
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                          padding: '8px 16px',
                          textAlign: 'left'
                        }}
                      >
                        {item.label}
                      </Button>
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