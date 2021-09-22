const express = require('express');
const Favorite = require('../models/favorite');
const favoriteRouter = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find( { user: req.user._id })
    .populate('user')
    .populate('campsites')
    .then(favorite => {
        console.log(favorite)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if (favorite) {
            req.body.forEach((campsiteId) => {
                if (!favorite.campsites.includes(campsiteId._id)) {
                    favorite.campsites.push(campsiteId);
                }
            });
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            Favorite.create({
                user: req.user._id,
                campsites: req.body
            })
            .then(favorite => {
                console.log('Favorite made', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if(favorite) {
            Favorite.findOneAndDelete(req.body._id)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        } else {
            res.send("No favorite to be deleted");
        }
    })
    .catch(err => next(err));
});


// ?Favorite Routes With Ids

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
    .then(favorite => {
       if (favorite) {
            if (!favorite.campsites.includes(req.body._id)) {
                favorite.campsites.push(req.body._id);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.send("That favorite is already in there");
            }

            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            Favorite.create({
                user: req.user._id,
                campsites: req.body
            })
            .then(favorite => {
                console.log('Favorite made', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if (favorite) {
            console.log(favorite.campsites)
            console.log(req.params.campsiteId)
            const index = favorite.campsites.indexOf(req.params.campsiteId);
            if (index > -1) {
                favorite.campsites.splice(index, 1);
            }
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            res.send('no favorite to delete');
        }

    })
    .catch(err => next(err));
});


module.exports = favoriteRouter;