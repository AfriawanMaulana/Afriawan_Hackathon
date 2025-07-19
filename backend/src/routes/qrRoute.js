
const router = require('express').Router();
const db = require('../config/db');
const { verifyUser } = require('../middlewares/authMiddleware');

router.get('/qrcode', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM qrcode'
        )
        const expQR = await db.query(
            'DELETE FROM qrcode WHERE expired_at <= NOW() RETURNING *'
        )

        if (expQR.rows[0]) return res.status(204).end();
        res.json(result.rows);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message })
        } else {
            console.error('Unexpected error:', err)
        }
    }
})

router.post('/qrcode', async (req, res) => {
    const { name, value, expired_at } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO qrcode (name, value, expired_at) VALUES($1, $2, $3)',
            [name, value, expired_at]
        );
        res.status(201).json(result.rows)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            console.error('Unexpected error:', err)
        }
    };
});


router.get('/scan', verifyUser, async (req, res) => {
    const { token } = req.query;
    const qr = await db('qrcode').where({ token }).first();

    if (!qr) return res.status(404).json({ message: 'Token no provided'});
    if (new Date(qr.expired_at) < new Date()) return res.json({ message: 'Expired QR' });

    await db('data_absensi').insert({
        user_id: req.user.id,
        absen_at: new Date()
    });

    res.json({ message: 'Berhasil absen'})
});



module.exports = router;