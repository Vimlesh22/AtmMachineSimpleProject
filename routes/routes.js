const express = require('express');
const cardsFieldsController = require('../controller/cardsFieldsController');
const atmFieldsController = require('../controller/atmFieldsController');
const app = express();
const router = express.Router();


router.post('/createNewCard',cardsFieldsController.createNewCard);
router.post('/getCardData',cardsFieldsController.getCardDataController);
router.post('/enterDenomination',atmFieldsController.enterMoneyInAtmController);


module.exports = router;