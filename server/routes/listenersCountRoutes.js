const express = require('express');
const router = express.Router();
const ListenersCount = require('../models/ListenersCount'); 

router.get('/listenersCount', async (req, res) => {
  try {
    // Fetch the document with the highest count from the database
    const highestEntry = await ListenersCount.findOne().sort({ count: -1 }).limit(1);

    // Respond with the highest count, event, and live status as JSON
    res.json({
      count: highestEntry ? highestEntry.count : 0,
      event: highestEntry ? highestEntry.event : 'No event',
      isLive: highestEntry ? true : false,
    });
  } catch (error) {
    console.error('Error fetching listeners count:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
