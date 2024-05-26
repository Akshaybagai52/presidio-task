const express = require('express');
const router = express.Router();
const { auth, role } = require('../middleware/auth');
const Property = require('../models/Property');

// Add a new property (sellers only)
router.post('/', auth, role(['seller']), async (req, res) => {
    const property = new Property({
        ...req.body,
        seller: req.user._id,
        likes: 0,
        isLiked: false,
    });
    try {
        await property.save();
        res.status(201).send(property);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all properties (accessible by everyone)
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find({}).populate('seller', 'name email phone');
        res.send(properties);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get properties added by the logged-in seller
router.get('/my-properties', auth, role(['seller']), async (req, res) => {
    try {
        const properties = await Property.find({ seller: req.user._id });
        res.send(properties);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
