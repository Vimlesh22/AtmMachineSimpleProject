const express = require('express');
const cardsFieldsController = require('../controller/cardsFieldsController');
const atmFieldsController = require('../controller/atmFieldsController');
// const app = express();
const router = express.Router();


// router.post('/createNewCard',cardsFieldsController.createNewCard);
// router.post('/getCardData',cardsFieldsController.getCardDataController);
// router.post('/enterDenomination',atmFieldsController.enterMoneyInAtmController);

router.post('/add/atm-data', atmFieldsController.addAtmData);
router.post('/add/card-details', cardsFieldsController.addUsersCardDetails);
router.post('/check/valid-card', cardsFieldsController.checkCardCredentials);


module.exports = router;