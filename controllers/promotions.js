const Promotion = require('../models/promotion');


// ?PROMOTIONS CONTROLLER FOR PROMOTIONS

const getPromotions = (req, res, next) => {
    Promotion.find()
    .then(promotions => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotions);
    })
    .catch(err => next(err));
};

const createPromotion = (req, res, next) => {
    Promotion.create(req.body)
    .then(promotion => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
};

const updatePromotions = (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
};

deletePromotions = (req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
};


// ?PROMOTIONS CONTROLLER FOR PROMOTIONS WITH IDS

const getPromotionById = (req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
}


const createPromotionById = (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
};

const updatePromotionById = (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
};
const deletePromotionById = (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
};

module.exports = {
    getPromotions,
    createPromotion,
    updatePromotions,
    deletePromotions,
    getPromotionById,
    createPromotionById,
    updatePromotionById,
    deletePromotionById

};