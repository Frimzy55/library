import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Button,
  IconButton,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function BooksTable({ books, onClose }) {
  return (
    <Box sx={{ p: 1, maxWidth: '100vw', overflowX: 'auto' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 1 
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary' }}>
          📚 Books Inventory
        </Typography>
        <IconButton 
          onClick={onClose}
          size="small"
          color="error"
          sx={{ border: '1px solid', borderColor: 'error.main' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 1, 
          borderRadius: '4px',
          '& .MuiTableCell-root': {
            py: 0.5,
            px: 1.2,
            fontSize: '0.75rem'
          }
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {[
                { label: 'ID', width: 60 },
                { label: 'Title', field: 'book_title_statement' },
                { label: 'Author', width: 120 },
                { label: 'ISBN', width: 130 },
                { label: 'Category', width: 100 },
                { label: 'Dewey', field: 'Dewey_decimal', width: 90 },
                { label: 'Publication', field: 'Publication_distribution', width: 140 },
                { label: 'Source', field: 'Source_of_acquisition', width: 120 },
                { label: 'Description', field: 'Physical_description', width: 150 },
                { label: 'Price', field: 'Trade_price', width: 80 }
              ].map((header) => (
                <TableCell
                  key={header.label}
                  sx={{ 
                    fontWeight: 600, 
                    backgroundColor: '#f5f5f5',
                    width: header.width,
                    color: 'text.secondary'
                  }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.length > 0 ? (
              books.map((book) => (
                <TableRow 
                  key={book.id}
                  hover
                  sx={{ '&:last-child td': { borderBottom: 0 } }}
                >
                  <TableCell>{book.id}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>{book.book_title_statement}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.dewey_decimal}</TableCell>
                  <TableCell>{book.publication_distribution}</TableCell>
                  <TableCell>{book.source_of_acquisition}</TableCell>
                  <TableCell sx={{ maxWidth: 150 }}>{book.physical_description}</TableCell>
                  <TableCell>{book.trade_price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    No books found in inventory
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default BooksTable;