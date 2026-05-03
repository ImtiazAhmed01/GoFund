const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db');

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, photoURL } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "First name, last name, email, and password are required" });
        }
        const db = getDb();
        const userCollection = db.collection('users');

        const alreadyUser = await userCollection.findOne({ email });
        if (alreadyUser) {
            return res.status(400).json({ message: "This user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            fullName: `${firstName} ${lastName}`,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            photoURL: photoURL || "default-url",
            userRole: "User",
            registrationDate: new Date(),
        };

        const result = await userCollection.insertOne(newUser);

        // Exclude password from the returned object if returning user details
        const token = jwt.sign(
            { id: result.insertedId, email: newUser.email, userRole: newUser.userRole },
            process.env.JWT_SECRET || 'secretKey',
            { expiresIn: '24h' }
        );

        res.status(201).json({ message: "User successfully registered", token, user: { email: newUser.email, fullName: newUser.fullName, photoURL: newUser.photoURL, userRole: newUser.userRole } });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

        const db = getDb();
        const userCollection = db.collection('users');

        const user = await userCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.password) return res.status(401).json({ message: "Invalid credentials (no password set, possible Google login)" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email, userRole: user.userRole },
            process.env.JWT_SECRET || 'secretKey',
            { expiresIn: '24h' }
        );

        res.status(200).json({ message: "Login successful", token, user: { email: user.email, fullName: user.fullName, photoURL: user.photoURL, userRole: user.userRole } });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

module.exports = { register, login };
