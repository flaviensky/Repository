const express = require('express')
const router = express.Router()
const RestaurantsModel = require('../Models/restaurants.model')


router.post('/restaurants', (req, res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing.')
    }

    const model = new RestaurantsModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0){
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/restaurants/:_id', (req, res) => {
    if(!req.params._id){
        return res.status(400).send('Missing URL parameter: _id => restaurants/restaurants_id')
    }

    RestaurantsModel.findOne({
        _id: req.params._id
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.put('/restaurants/:_id', (req, res) => {
    if(!req.params._id){
        return res.status(400).send('Missing URL parameter: _id => restaurants/restaurants_id')
    }

    RestaurantsModel.findOneAndUpdate({
        _id: req.params._id
    }, req.body, {
        new: true
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.delete('/restaurants/:_id', (req, res) => {
    if(!req.params._id){
        return res.status(400).send('Missing URL parameter: _id => restaurants/restaurants_id')
    }

    RestaurantsModel.findOneAndRemove({
        _id: req.params._id
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/restaurants', (req, res) => {
    if(!req.query.long_coordinates){
        return res.status(400).send('Missing URL query: long_coordinates')
    }
    if(!req.query.lat_coordinates){
        return res.status(400).send('Missing URL query: lat_coordinates')
    }

    RestaurantsModel.aggregate().near({

            near: {
                type: "Point",
                coordinates: [Number(req.query.long_coordinates),Number(req.query.lat_coordinates)]
                },
            maxDistance: Number(req.query.max_distance) || 5000,
            spherical: true,
            distanceField: "distance"
        })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router