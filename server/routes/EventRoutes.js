const express = require('express');
const router = express.Router();
const axios = require('axios');
const Event = require('../models/Event');

// Endpoint to add a new event
router.post('/addEvent', async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;
    const newEvent = await Event.create({ title, startTime, endTime });
    res.json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all events
router.get('/getAllEvents', async (req, res) => {
  try {
    const allEvents = await Event.find();
    res.json(allEvents);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch the current live event
router.get('/currentEvent', async (req, res) => {
    try {
        // Fetch the live event
        const currentDate = new Date();
        const liveEvent = await Event.findOne({
            startTime: { $lte: currentDate },
            endTime: { $gte: currentDate },
        }).sort({ startTime: -1 });

        if (liveEvent) {
            // Fetch the listener counts
            const response = await axios.get('http://localhost:5000/api/listenersCount');
            const listenersCount = response.data.count;

            res.json({
                title: liveEvent.title,
                isLive: true,
                listenersCount,
            });
        } else {
            res.json({ title: 'No live event', isLive: false, listenersCount: 0 });
        }
    } catch (error) {
        console.error('Error fetching live event with counts:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
