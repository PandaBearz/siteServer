const express = require('express');
const Promotion = require('../models/promotion');

const promotionRouter = express.Router();
const PromotionsController = require("../controllers/promotions.js");
const authenticate = require('../authenticate');


// ?PROMOTIONS ROUTES FOR PROMOTIONS

promotionRouter.route('/')
.get(PromotionsController.getPromotions)
.post(authenticate.verifyUser, authenticate.verifyAdmin, PromotionsController.createPromotion)
.put(authenticate.verifyUser, PromotionsController.updatePromotions)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, PromotionsController.deletePromotions);

// ?PROMOTIONS ROUTES FOR PROMOTIONS

promotionRouter.route('/:promotionId')
.get(PromotionsController.getPromotionById)
.post(authenticate.verifyUser, authenticate.verifyAdmin, PromotionsController.createPromotionById)
.put(authenticate.verifyUser, PromotionsController.updatePromotionById)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, PromotionsController.deletePromotionById);


module.exports = promotionRouter;