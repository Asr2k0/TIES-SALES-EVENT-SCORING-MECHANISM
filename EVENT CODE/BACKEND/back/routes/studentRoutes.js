const express = require('express');
const router = express.Router();

module.exports = function(db) {
  // Route for submitting all scores
  router.post('/submitAllScores', async (req, res) => {
    try {
      const { roomNumber, judgeName, bestCandidate, scores } = req.body;

      // Validate request data
      if (!roomNumber || !judgeName || !bestCandidate || !scores || !Array.isArray(scores)) {
        return res.status(400).json({ message: 'Invalid request data' });
      }

      // Print received data
      console.log('Received scores data:');
      console.log('Room Number:', roomNumber);
      console.log('Judge Name:', judgeName);
      console.log('Best Candidate:', bestCandidate);
      console.log('Scores:', scores);

      // Store the data in MongoDB
      await db.collection('scores').insertOne({
        roomNumber,
        judgeName,
        bestCandidate,
        scores
      });

      // Respond with success message
      res.status(201).json({ message: 'Scores received and stored successfully' });
    } catch (error) {
      console.error('Error receiving scores:', error);
      res.status(500).json({ message: 'An error occurred while receiving and storing scores' });
    }
  });

  return router;
};
