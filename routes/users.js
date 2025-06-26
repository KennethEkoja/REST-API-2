// routes/users.js
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router  = express.Router();
const db      = require('../db');

/* ---------- helpers ---------- */
const checkErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

/* ---------- GET /users ---------- */
router.get('/', async (_req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users ORDER BY id');
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* ---------- GET /users/:id ---------- */
router.get(
  '/:id',
  param('id').isInt().withMessage('id must be an integer'),
  async (req, res) => {
    if (checkErrors(req, res)) return;
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
      if (!rows.length) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(rows[0]);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

/* ---------- POST /users ---------- */
router.post(
  '/',
  body('name').notEmpty(),
  body('email').isEmail(),
  body('age').isInt({ min: 0 }),
  async (req, res) => {
    if (checkErrors(req, res)) return;
    const { name, email, age } = req.body;
    try {
      const { rows } = await db.query(
        'INSERT INTO users(name,email,age) VALUES ($1,$2,$3) RETURNING *',
        [name, email, age]
      );
      res.status(201).json(rows[0]);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

/* ---------- PUT /users/:id ---------- */
router.put(
  '/:id',
  param('id').isInt(),
  body('name').notEmpty(),
  body('email').isEmail(),
  body('age').isInt({ min: 0 }),
  async (req, res) => {
    if (checkErrors(req, res)) return;
    const { name, email, age } = req.body;
    try {
      const { rows } = await db.query(
        'UPDATE users SET name=$1,email=$2,age=$3 WHERE id=$4 RETURNING *',
        [name, email, age, req.params.id]
      );
      if (!rows.length) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(rows[0]);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

/* ---------- DELETE /users/:id ---------- */
router.delete(
  '/:id',
  param('id').isInt(),
  async (req, res) => {
    if (checkErrors(req, res)) return;
    try {
      const { rows } = await db.query('DELETE FROM users WHERE id=$1 RETURNING *', [req.params.id]);
      if (!rows.length) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;
