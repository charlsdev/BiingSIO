const { Router } = require('express');

const router = Router();

const {
   verifyPass
} = require('../middleware/funtionsMID');

const {
   renderIndex ,
   searchBoleto
} = require('../controllers/index.controllers');

router.get('/', renderIndex);
router.get('/searchBol', verifyPass, searchBoleto);

module.exports = router;