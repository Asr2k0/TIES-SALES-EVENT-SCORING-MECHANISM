// routes/roomRoutes.js

const express = require('express');
const router = express.Router();

module.exports = function(db) {
  // Define room routes using db connection

  // GET route to fetch details of a specific room by roomNumber
  router.get('/rooms/:roomId', async (req, res) => {
    const roomId = parseInt(req.params.roomId); // Convert roomId to integer
    try {
      const room = await db.collection('allocations').findOne({ roomNumber: roomId });
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      // Extract students with their unique identifiers
      const students = room.students.map(student => ({ id: student.role, name: student.Name }));
      res.json(students);
    } catch (error) {
      console.error("Error fetching room details:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // GET route to fetch details of all rooms
  router.get('/rooms', async (req, res) => {
    try {
      const rooms = await db.collection('allocations').find().toArray();
      res.json(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Add more routes as needed...

  return router;
};
