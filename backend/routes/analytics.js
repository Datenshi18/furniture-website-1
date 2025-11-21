const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const { getStats, getRecentActivity } = require('../controllers/analyticsController');

router.get('/stats', auth, admin, getStats);
router.get('/recent-activity', auth, admin, getRecentActivity);

module.exports = router; 