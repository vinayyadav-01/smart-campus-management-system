const router = require('express').Router();
const db = require('../db'); const { verifyToken } = require('../middleware/auth'); const wrap = require('../middleware/asyncHandler');
router.get('/', verifyToken, wrap(async (req,res) => {
 const [[students]] = await db.query('SELECT COUNT(*) total FROM students');
 const [[courses]] = await db.query('SELECT COUNT(*) total FROM courses');
 const [[notices]] = await db.query('SELECT COUNT(*) total FROM notices');
 const [[fees]] = await db.query("SELECT COALESCE(SUM(paid_amount),0) total FROM fees");
 const [[attendance]] = await db.query("SELECT COUNT(*) total, COALESCE(SUM(status='Present'),0) present FROM attendance");
 const [recent] = await db.query('SELECT n.id,n.title,n.message,n.created_at,u.name AS author FROM notices n LEFT JOIN users u ON u.id=n.published_by ORDER BY n.created_at DESC LIMIT 4');
 res.json({ students: students.total, courses: courses.total, notices: notices.total, feesPaid: Number(fees.total), attendanceRate: attendance.total ? Math.round(attendance.present / attendance.total * 100) : 0, recent });
}));
module.exports = router;
