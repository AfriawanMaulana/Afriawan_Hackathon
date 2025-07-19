require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const checkUser = async (req, res, next) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
        const result = await db.query(
            'SELECT * FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($2) AND id != $3',
            [username, email, id]
        )
        if (result.rows.length > 0) return res.status(401).json({ error: 'User already exist' });
        next();
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            console.error('Unexpected error:', err);
        }
    };
};

const verifyUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token no provided'});

    const token = authHeader.split(' ')[1];
    try {
        const userValidation = jwt.verify(token, process.env.JWT_KEY);
        if (!userValidation) return res.status(401).json({ error: 'failed to verify'});
        req.user = userValidation;
        next();
    } catch (err) {
        if (err instanceof Error) {
            req.status(500).json({ error: err.message })
        } else {
            console.error('Unexpected error:', err);
        }
    };
};


module.exports = { checkUser, verifyUser }