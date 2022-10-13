const express = require('express');
const controler = require('../controlers/codenames')

const router = express.Router();

router.get('/', controler.home)
router.get('/add',controler.add_room_direct)
router.post('/add',controler.add_room)
router.get('/roomname/:roomname',controler.transName)
router.get('/id/:id',controler.findByID)
router.get('/draw/:id',controler.draw)

module.exports = router;