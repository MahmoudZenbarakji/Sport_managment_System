const express = require('express');
const router = express.Router();
const stadiumController = require('../controllers/stadium.controller');

router.route('/')
    .post(stadiumController.createStadium)
    .get(stadiumController.getStadiums);

router.route('/:id')
    .get(stadiumController.getStadiumById)
    .patch(stadiumController.updateStadium)
    .delete(stadiumController.deleteStadium);

module.exports = router;
