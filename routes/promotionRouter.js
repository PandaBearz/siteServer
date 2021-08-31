const express = require('express');
const promotionRouter = express.Router();

promotionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the campsites promotions to you');
})
.post((req, res) => {
    res.end(`Will add the campsite's promotions: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res) => {
    res.end('Deleting all promotions');
});


promotionRouter.route('/:promotionsId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send promotional details of the campsite: ${req.params.promotionsId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`Will add the campsite's promotions: ${req.body.name} with description: ${req.body.description}`);
})
.put( (req, res) => {
    res.write(`Updating the promotions: ${req.params.promotionsId}\n`);
    res.end(`Will update the promotions: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting campsite promotions: ${req.params.promotionsId}`);
});


module.exports = promotionRouter;