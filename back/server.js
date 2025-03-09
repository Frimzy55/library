
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL username
  password: 'CSS2244', // Replace with your MySQL password
  database: 'library_db', // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API Endpoint to Add a New Book
app.post("/api/books", (req, res) => {
  const {
    bookTitleStatement,
    author,
    isbn,
    category,
    deweyDecimal,
    publicationDistribution,
    sourceOfAcquisition,
    physicalDescription,
    tradePrice,
  } = req.body;

  const sql = `
    INSERT INTO book_details (
      book_title_statement,
      author,
      isbn,
      category,
      dewey_decimal,
      publication_distribution,
      source_of_acquisition,
      physical_description,
      trade_price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      bookTitleStatement,
      author,
      isbn,
      category,
      deweyDecimal,
      publicationDistribution,
      sourceOfAcquisition,
      physicalDescription,
      tradePrice,
    ],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({ message: "Book added successfully", id: result.insertId });
    }
  );
});

 /*app.get('/api/books', (req, res) => {
    const query = 'SELECT * FROM book_details WHERE book_title_statement LIKE ?';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Failed to fetch books' });
      } else {
        res.status(200).json(results);
      }
    });
  });*/


  app.get('/api/books', (req, res) => {
    const searchTerm = req.query.search || '';
    const query = `
        SELECT * 
        FROM book_details 
        WHERE book_title_statement LIKE ?
    `;
    
    db.query(query, [`%${searchTerm}%`], (err, results) => {
        if (err) {
            console.error('Error fetching books:', err);
            res.status(500).json({ message: 'Failed to fetch books' });
        } else {
            res.status(200).json(results);
        }
    });
});

  // Backend API route for searching books by title
// Using MySQL with the 'mysql2' library
app.get('/api/books/search', (req, res) => {
  const { title } = req.query;
  const query = `SELECT * FROM book_details WHERE book_title_statement LIKE ? OR category LIKE ?`;

  const searchTerm = `%${title}%`;

  db.query(query, [searchTerm, searchTerm], (err, books) => {
    if (err) {
      console.error('Error searching books:', err);
      res.status(500).json({ error: 'An error occurred while searching books' });
    } else {
      res.json(books);
    }
  });
});



app.get('/api/books1', (req, res) => {
  const { title } = req.query;
  const query = 'SELECT * FROM book_details WHERE book_title_statement LIKE ?';

  db.query(query, [`%${title}%`], (err, books) => {
    if (err) {
      console.error('Error searching books:', err);
      res.status(500).json({ error: 'An error occurred while searching books' });
    } else {
      res.json(books);
    }
  });
});


app.post("/register", (req, res) => {
  const { first_name, last_name, email, phone, address, membership_type, max_books, date_joined, status } = req.body;
  
  const sql = `INSERT INTO members (first_name, last_name, email, phone, address, membership_type, max_books, date_joined, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [first_name, last_name, email, phone, address, membership_type, max_books, date_joined, status], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database Insert Failed" });
    }
    res.status(200).json({ message: "Member Registered Successfully" });
  });
});


// Search members API
app.get("/api/members", (req, res) => {
  const search = req.query.search;
  const query = `SELECT * FROM members 
                 WHERE last_name LIKE ? OR first_name LIKE ? OR email LIKE ? OR member_id LIKE ?`;

  db.query(query, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database query failed", details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No members found" });
    }
    res.json(results);
  });
});



app.post("/api/borrow", (req, res) => {
  const { memberId, fullName, phoneNumber, email, bookId, bookArthur,bookTitle, borrowDate, returnDate } = req.body;

  const sql = `
    INSERT INTO borrowed_books (member_id, full_name, phone_number, email, book_id, book_arthur,book_title, borrow_date, due_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  db.query(sql, [memberId, fullName, phoneNumber, email, bookId, bookArthur,bookTitle, borrowDate, returnDate], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Failed to borrow book." });
    }
    res.status(201).json({ message: "Book borrowed successfully!" });
  });
});



// API to check for overdue books
app.get("/api/due-books", (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const sql = "SELECT * FROM borrowed_books WHERE due_date < ?";

  db.query(sql, [today], (err, results) => {
    if (err) {
      console.error("Error fetching overdue books:", err);
      return res.status(500).json({ error: "Failed to fetch overdue books." });
    }
    res.json(results);
  });
});


/*app.get("/api/due-books-count", (req, res) => {
  const sql = "SELECT COUNT(*) AS dueCount FROM borrowed_books WHERE return_date = CURDATE()";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching due books:", err);
      return res.status(500).json({ error: "Failed to fetch due books count." });
    }
    res.json({ dueCount: result[0].dueCount });
  });
});*/



app.get("/api/due-books-count", (req, res) => {
  const sql = "SELECT COUNT(*) AS dueCount FROM borrowed_books WHERE due_date< CURDATE()";
  //const sql='SELECT COUNT(*) FROM borrowed_books WHERE OR return_date=CURDATE()) AS dueCount';

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching due books:", err);
      return res.status(500).json({ error: "Failed to fetch due books count." });
    }
    
    const dueCount = result[0]?.dueCount || 0; // Ensure a valid number
    res.json({ dueCount });
  });
});



app.get("/api/due-books", (req, res) => {
  const sql = `
    SELECT book_title, borrower_name, due_date
    FROM borrowed_books 
    WHERE return_date = CURDATE()
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching due books:", err);
      return res.status(500).json({ error: "Failed to fetch due books." });
    }
    
    res.json({ dueBooks: result });
  });
});


app.get('/api/borrowed-books', (req, res) => {
  const query = 'SELECT * FROM borrowed_books';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ message: 'Failed to fetch books' });
    } else {
      res.status(200).json(results);
    }
  });
});



app.get('/api/returnform-books', (req, res) => {
  const query = 'SELECT * FROM borrowed_books';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ message: 'Failed to fetch books' });
    } else {
      res.status(200).json(results);
    }
  });
});


app.get("/api/library-stats", (req, res) => {
  const statsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM book_details) AS totalBooks,
      (SELECT COUNT(*) FROM borrowed_books) AS borrowedBooks,
      (SELECT COUNT(*) FROM borrowed_books WHERE due_date < CURDATE()) AS overdueBooks,
      (SELECT COUNT(*) FROM members) AS totalClients,
      (SELECT COUNT(*) FROM borrowed_books WHERE due_date = CURDATE()) AS dueBooks,
      (SELECT COUNT(DISTINCT member_id) FROM borrowed_books WHERE due_date = 0) AS activeBorrowers
  `;

  db.query(statsQuery, (err, results) => {
    if (err) {
      console.error("Error fetching stats:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("Stats fetched:", results[0]);
    res.json(results[0] || {});  // ✅ Ensure response is never empty
  });
});


/*app.post('/api/return-books', (req, res) => {
  const { member_id, full_name, phone_number, email, book_id, book_author, book_title, borrow_date, return_date } = req.body;

  const sql = `INSERT INTO return_books (member_id, full_name, phone_number, email, book_id, book_author, book_title, borrow_date, due_date) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [member_id, full_name, phone_number, email, book_id, book_author, book_title, borrow_date, return_date], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error adding overdue book' });
      res.json({ success: true, message: ' book successfully returned' });
  });
});*/



/*app.get('/api/borrowers', async (req, res) => {
  const searchQuery = req.query.query;
  
  try {
    const borrowers = await db.query(
      "SELECT * FROM borrowed_books WHERE full_name LIKE ? OR  LIKE ?",
      [`%${searchQuery}%`, `%${searchQuery}%`]
    );phone_number
    
    res.json(borrowers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrowers" });
  }
});*/



// API to return a book and remove it from borrowed_books using member_id
app.post("/api/returns", (req, res) => {
  const { full_name, member_id, book_title, borrow_date, due_date, return_date, late_fee } = req.body;

  console.log("Received Return Request:", req.body);  // Debug log

  if (!full_name || !member_id || !book_title || !borrow_date || !due_date || !return_date) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const insertQuery = `INSERT INTO return_books (full_name, member_id, book_title, borrow_date, due_date, return_date, late_fee) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(insertQuery, [full_name, member_id, book_title, borrow_date, due_date, return_date, late_fee], (err, result) => {
    if (err) {
      console.error("DB Insert Error:", err);
      return res.status(500).json({ success: false, message: "Database error: " + err });
    }

    console.log("Inserted into return_books:", result);

    // Delete borrowed books after returning
    const deleteQuery = `DELETE FROM borrowed_books WHERE member_id = ?`;

    db.query(deleteQuery, [member_id], (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error("DB Delete Error:", deleteErr);
        return res.status(500).json({ success: false, message: "Error deleting borrowed books: " + deleteErr });
      }

      console.log("Deleted borrowed books:", deleteResult);
      res.json({ success: true, message: "Book returned successfully" });
    });
  });
});



app.get('/api/borrowers', async (req, res) => {
  const search = req.query.search;
  const query = `SELECT * FROM borrowed_books 
                 WHERE  full_name LIKE ? OR book_title LIKE ? OR email LIKE ? OR member_id LIKE ?`;
                 
  db.query(query, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database query failed", details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No members found" });
    }
    res.json(results);
  });
});

app.post('/api/visits', (req, res) => {
  console.log('Received visit data:', req.body);

  const { member_id, full_name, check_in_date, purpose, comments } = req.body;

  if (!member_id || !full_name || !check_in_date || !purpose) {
      return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `INSERT INTO visits (member_id, full_name, check_in_date, purpose, comments) 
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [member_id, full_name, check_in_date, purpose, comments], (err, result) => {
      if (err) {
          console.error('Error inserting visit:', err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Visit recorded successfully' });
  });
});




app.get('/api/view', (req, res) => {
  db.query(
    `SELECT 
      member_id,
      first_name,
      last_name,
      email,
      phone,
      membership_type,
      max_books,
      date_joined,
      status
    FROM members
    ORDER BY date_joined DESC`,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch members' });
      }
      res.json(results);
    }
  );
});







/*app.get("/api/borrowing-history", (req, res) => {
  const sql = "SELECT * FROM return_books ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching borrowing history:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});*/


// In your backend route
app.get("/api/borrowing-history", (req, res) => {
  const query = `
    SELECT 
      id,
      full_name,
      book_title,
      borrow_date,
      due_date,
      return_date,
      CAST(late_fee AS DECIMAL(10,2)) AS late_fee
    FROM return_books ORDER BY created_at DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});



app.get('/api/attendance', (req, res) => {
  const query = `
    SELECT 
      
      member_id,
      full_name,
      check_in_date,
      purpose,
      comments
    FROM visits
    ORDER BY check_in_date DESC
    LIMIT 100
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching attendance:', err);
      return res.status(500).json({ error: 'Failed to fetch attendance records' });
    }

    res.json(results);
  });
});

// Start the server


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
