const express = require('express');
const router = express.Router();
const ListenersCount = require('../models/ListenersCount'); 

router.get('/api/listenersCount', async (req, res) => {
  try {
      // Fetch the document with the highest count from the database
      const highestEntry = await ListenersCount.findOne().sort({ count: -1 }).limit(1);

      // If there is no live event, set count to zero
      const count = highestEntry && highestEntry.isLive ? highestEntry.count : 0;

      // Respond with the count, event, and live status as JSON
      res.json({
          count: count,
          event: highestEntry ? highestEntry.event : 'No event',
          isLive: highestEntry ? highestEntry.isLive : false,
      });
  } catch (error) {
      console.error('Error fetching listeners count:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
