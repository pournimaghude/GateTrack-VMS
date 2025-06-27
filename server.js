const express = require('express');
const mysql = require('mysql2/promise'); // mysql2 supports promises
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

// MySQL configuration
const config = {
  host: 'localhost',
  user: 'root', //enter username
  password: 'root', //enter password
  database: 'temp', //db name
  port: 3306,
};

let pool;

// Create MySQL connection pool
async function initialize() {
  pool = await mysql.createPool(config);
  console.log('Connected to MySQL database');
}

initialize().catch(err => {
  console.error('MySQL connection error:', err);
});

//! Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password, location } = req.body;

  if (!username || !email || !password || !location) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  try {
    // Check if email already exists
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Insert new user
    await pool.execute(
      'INSERT INTO users (username, email, password, location) VALUES (?, ?, ?, ?)',
      [username, email, password, location]
    );

    res.status(200).json({ message: 'Signup successful' });

  } catch (err) {
    console.error('MySQL error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

//! 2) login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query to check if user with given email and password exists
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      return res.status(200).json({
        message: 'Login successful',
        location: user.location  // Return user's gate location
      });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

  } catch (err) {
    console.error('MySQL error:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

//! 3) search vehicles by last 4 digits
app.post('/searchVehicle', async (req, res) => {
  const { last4Digits } = req.body;

  if (!last4Digits || last4Digits.length !== 4) {
    return res.status(400).json({ message: 'Please enter last 4 digits of vehicle number' });
  }

  try {
    const query = `
      SELECT * FROM master_data 
      WHERE RIGHT(vehicle_no, 4) = ?
    `;

    const [rows] = await pool.execute(query, [last4Digits]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    return res.status(200).json(rows); // Return all matched vehicles

  } catch (err) {
    console.error('MySQL error:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

//! 4) submit vehicle details into daily-entries
app.post('/submitEntry', async (req, res) => {
  const { vehicle_no, owner_name, username, in_time, in_date, in_by } = req.body;

  const safeInTime = in_time || null;
  const safeInDate = in_date || null;

  try {
    // 1. Get user location
    const [locationResult] = await pool.execute(
      'SELECT location FROM users WHERE email = ?',
      [username]
    );

    if (locationResult.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const location = locationResult[0].location;

    // 2. Check for duplicate entry
    const [duplicateCheck] = await pool.execute(
      'SELECT * FROM daily_entries WHERE vehicle_no = ? AND in_date = ?',
      [vehicle_no, safeInDate]
    );

    if (duplicateCheck.length > 0) {
      return res.status(400).json({ error: 'This vehicle is already added today.' });
    }

    // 3. Insert the new entry
    await pool.execute(
      `INSERT INTO daily_entries 
      (vehicle_no, owner_name, location, in_time, in_date, in_by)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [vehicle_no, owner_name, location, safeInTime, safeInDate, in_by]
    );

    return res.status(200).json({ message: 'Entry successfully stored' });

  } catch (err) {
    console.error('MySQL error:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

//! 5) to get the latest vehicle entries
app.get('/getEntries', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM daily_entries ORDER BY id DESC'
    );

    res.status(200).json(rows); // Return the results as JSON
  } catch (err) {
    console.error('MySQL error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

//! 6)Dashboard
//? New Registration
app.post('/api/master_data/register', async (req, res) => {
  const { owner_name, designation, department, empid, vehicle_no } = req.body;

  console.log('Received data:', req.body);

  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('owner_name', sql.VarChar, owner_name)
      .input('designation', sql.VarChar, designation)
      .input('department', sql.VarChar, department)
      .input('empid', sql.Int, parseInt(empid))  // Ensure INT
      .input('vehicle_no', sql.VarChar, vehicle_no)
      .query(`
        INSERT INTO master_data (owner_name, designation, department, empid, vehicle_no)
        OUTPUT INSERTED.id
        VALUES (@owner_name, @designation, @department, @empid, @vehicle_no)
      `);

    res.status(201).json({ 
      message: 'Vehicle added successfully', 
      vehicleId: result.recordset[0].id 
    });

  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ message: 'Error adding vehicle', error: err.message });
  }
});

//! 7) Display all vehicles details from master_data table 
app.get('/api/master_data', async (req, res) => {
  try {
    // Query to fetch all vehicles from the master_data table
    const [rows] = await pool.execute('SELECT * FROM master_data');

    // Send back the results
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching data:', err.message);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

//! 8) API to move vehicle to vehicle_entries
app.post('/markAsOut/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Step 1: Get entry from daily_entries
    const [rows] = await pool.execute('SELECT * FROM daily_entries WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Entry not found' });
    }

   const entry = rows[0];

    // Step 2: Prepare out date and time
    const outDateTimeObj = new Date();
    const outDate = outDateTimeObj.toISOString().split('T')[0];         // "YYYY-MM-DD"
    const outTime = outDateTimeObj.toTimeString().split(' ')[0];        // "HH:MM:SS"

    // Step 3: Extract and format in_date and in_time correctly
    const inDateOnly = new Date(entry.in_date).toISOString().split('T')[0]; // "YYYY-MM-DD"
    const inTimeOnly = entry.in_time; // assuming it's already a valid "HH:MM:SS" string

    // Step 4: Construct DateTime objects for duration calculation
    const inDateTime = new Date(`${inDateOnly}T${inTimeOnly}`);
    const outDateTime = outDateTimeObj;

    // Step 5: Validate parsed date
    if (isNaN(inDateTime.getTime())) {
      return res.status(400).json({
        message: 'Invalid inDateTime format',
        in_date: entry.in_date,
        in_time: entry.in_time,
        combined: `${inDateOnly}T${inTimeOnly}`
      });
    }

    // Step 6: Calculate duration
    const diffMs = outDateTime - inDateTime;
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    const durationInside = `${hours}h ${minutes}m`;

    // Step 2: Decide which table to insert into
    const tableName = entry.owner_name.trim().toUpperCase() === "COMPANY VEHICLE"
      ? "company_vehicle_entries"
      : "vehicle_entries";

    await pool.execute(
      `INSERT INTO ${tableName} 
      (vehicle_no, owner_name, location, in_time, in_date, in_by, out_time, out_date, out_by, duration_inside)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.vehicle_no,
        entry.owner_name,
        entry.location,
        entry.in_time,
        entry.in_date,
        entry.in_by,
        outTime,
        outDate,
        req.body.out_by,
        durationInside
      ]
    );

    // Step 3: Remove from daily_entries
    await pool.execute('DELETE FROM daily_entries WHERE id = ?', [id]);

    res.json({ message: 'Vehicle marked as out successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

//! 9) Display all vehicles details from master_data table 
app.get('/api/vehicle_entries', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vehicle_entries ORDER BY id DESC LIMIT 20');
    res.json(rows); // Send latest 100 records for UI
  } catch (error) {
    console.error('Error fetching vehicle entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//! 10) Get entries by date range from vehicle_entries table
// backend
app.get('/exportEntries', async (req, res) => {
  const { from, to, search = '' } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Date range required' });
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('fromDate', sql.Date, from)
      .input('toDate', sql.Date, to)
      .input('searchTerm', sql.VarChar, `%${search}%`)
      .query(`
        SELECT vehicle_no, owner_name, in_date, in_time, in_by,
               out_date, out_time, out_by, duration_inside, location
        FROM vehicle_entries
        WHERE out_date BETWEEN @fromDate AND @toDate
          AND (
            vehicle_no LIKE @searchTerm OR
            owner_name LIKE @searchTerm
          )
        ORDER BY out_date DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ error: err.message });
  }
});

//! 11) Get entries by date range from company-vehicle_entries table 
app.get('/api/company_vehicle_entries', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM company_vehicle_entries ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching company vehicles:', err);
    res.status(500).json({ message: 'Failed to load company vehicle entries' });
  }
});

app.post('/api/company_vehicle_entries/:id/remark', async (req, res) => {
  const { id } = req.params;
  const { remark } = req.body;

  try {
    await pool.query(
      'UPDATE company_vehicle_entries SET remark = ? WHERE id = ?',
      [remark, id]
    );
    res.json({ message: 'Remark updated successfully' });
  } catch (error) {
    console.error('Error updating remark:', error);
    res.status(500).json({ message: 'Database error' });
  }
});

//? Start the server on a specific port
const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>
   {
  console.log(`Server running on port ${PORT}`);
});
