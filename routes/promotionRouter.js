const express = require('express');
const Promotion = require('../models/promotion');

const promotionRouter = express.Router();
const PromotionsController = require("../controllers/promotions.js");

// ?PROMOTIONS ROUTES FOR PROMOTIONS

promotionRouter.route('/')
.get(PromotionsController.getPromotions)
.post(PromotionsController.createPromotion)
.put(PromotionsController.updatePromotions)
.delete(PromotionsController.deletePromotions);

// ?PROMOTIONS ROUTES FOR PROMOTIONS

promotionRouter.route('/:promotionId')
.get(PromotionsController.getPromotionById)
.post(PromotionsController.createPromotionById)
.put(PromotionsController.updatePromotionById)
.delete(PromotionsController.deletePromotionById);


module.exports = promotionRouter;