const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');

// Public
router.get('/', sessionController.getSessions);
router.get('/:id', sessionController.getSessionById);

// Coach creates session
router.post('/', verifyToken, requireRole('coach'), sessionController.createSession);

// User applies
router.post('/:id/apply', verifyToken, sessionController.applyToSession);

// Coach endpoints
router.get('/coach/me', verifyToken, requireRole('coach'), sessionController.getSessionsByCoach);
router.get('/:id/applicants', verifyToken, requireRole('coach'), sessionController.getApplicants);
router.put('/:id', verifyToken, requireRole('coach'), sessionController.updateSession);
router.delete('/:id', verifyToken, requireRole('coach'), sessionController.deleteSession);

module.exports = router;
