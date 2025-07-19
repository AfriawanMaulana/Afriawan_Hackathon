const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const { checkUser, verifyUser } = require('../middlewares/authMiddleware');

router.post('/register', checkUser, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [username, email, hash]
        );
        if (!result.rows) return res.status(401).json({ error: 'Failed to register' });
        res.status(201).json(result.rows);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            console.error('Unexpected error:', err)
        }
    }
});;


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query(
            'SELECT * FROM users WHERE LOWER(email) = LOWER($1)',
            [email]
        );
        const user = result.rows[0];
        if (!user) return res.status(404).json({ error: 'User not-found' });

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) return res.status(401).json({ error: 'Invalid credential' });

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_KEY,
            { expiresIn: '7d' }
        );
        res.json({ token });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            console.error('Login failed:', err);
        }
    };
});

router.get('/users', verifyUser, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, username, email FROM users'
        )
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/profile', verifyUser, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, username, email FROM users WHERE id = $1',
            [req.user.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            console.error('Unexpected error:', err)
        }
    } 
})

module.exports = router