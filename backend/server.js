const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Your React app URL
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const allowedOrigins = ['http://localhost:5173'];

// Image Upload Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure the 'uploads' folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only image files are allowed'));
        }
        cb(null, true);
    },
    limits: { fileSize: 1024 * 1024 } // Limit file size to 1MB
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// User model
const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// Employee Model
const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    image: { type: String }
});
const Employee = mongoose.model('Employee', EmployeeSchema);


// Registration route
app.post('/api/auth/register', async (req, res) => {
    const { userId, password } = req.body;

    if (!userId || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userId, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
    const { userId, password } = req.body;

    if (!userId || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}


// Create Employee
app.post('/api/employees', upload.single('image'), async (req, res) => {
    const { id, name, designation, email, mobile, gender, course } = req.body;

    if (!name || !designation || !email || !mobile || !gender || !course) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    // Create a new employee
    const newEmployee = new Employee({
        _id: id, // Use the unique ID generated on the front end
        name,
        designation,
        email,
        mobile,
        gender,
        course,
        createdDate: Date.now(),
        image: req.file ? req.file.filename : null // Save the file name if uploaded
    });

    try {
        await newEmployee.save();
        res.status(201).json(newEmployee); // Respond with the newly created employee
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Failed to create employee' });
    }
});

// Read Employees
app.get('/api/employees', authenticateToken, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
});

// Update Employee
app.put('/api/employees/:id', authenticateToken, async (req, res) => {
    try {
        const { name, designation, email, mobile, gender, course } = req.body;

        // Validate fields before updating
        if (!name || !designation || !email || !mobile || !gender || !course) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: 'Error updating employee', error });
    }
});

// Delete Employee
app.delete('/api/employees/:id', authenticateToken, async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
