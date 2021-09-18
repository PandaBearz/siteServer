const express = require('express');
const Promotion = require('../models/promotion');

const promotionRouter = express.Router();
const PromotionsController = require("../controllers/promotions.js");
const authenticate = require('../authenticate');
const cors = require('./cors');



// ?PROMOTIONS ROUTES FOR PROMOTIONS

promotionRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, PromotionsController.getPromotions)
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, PromotionsController.createPromotion)
.put(cors.corsWithOptions, authenticate.verifyUser, PromotionsController.updatePromotions)
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, PromotionsController.deletePromotions);

// ?PROMOTIONS ROUTES FOR PROMOTIONS

promotionRouter.route('/:promotionId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, PromotionsController.getPromotionById)
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, PromotionsController.createPromotionById)
.put(cors.corsWithOptions, authenticate.verifyUser, PromotionsController.updatePromotionById)
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, PromotionsController.deletePromotionById);


module.exports = promotionRouter;