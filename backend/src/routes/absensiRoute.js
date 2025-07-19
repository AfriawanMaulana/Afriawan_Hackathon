const router = require('express').Router();
const db = require('../config/db');
const { verifyUser } = require('../middlewares/authMiddleware');
const PDFDocument = require('pdfkit');

router.get('/absensi', verifyUser, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM data_absensi WHERE user_id = $1',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message })
        } else {
            console.error('Unexpected error:', err);
        }
    };
});

module.exports = router;