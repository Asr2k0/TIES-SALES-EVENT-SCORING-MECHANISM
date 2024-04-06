// Import required modules
const mongodb = require('mongodb');

// Function to shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function shuffleStudentsAndStore() {
  try {
    // Establish connection to MongoDB
    const url = "mongodb+srv://rithvik:rithvik@event.eovstts.mongodb.net/?retryWrites=true&w=majority";
    const dbName = "test"; // Replace with your database name
    const client = await mongodb.MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);

    // Step 1: Query all students from the "participants" collection
    const students = await db.collection("participants").find({}).toArray();

    // Step 2: Shuffle the students randomly
    const shuffledStudents = shuffleArray(students);

    // Step 3: Divide the shuffled students into 6 groups, representing each room
    const numberOfRooms = 6;
    const studentsPerRoom = Math.ceil(students.length / numberOfRooms);
    const rooms = [];
    for (let i = 0; i < numberOfRooms; i++) {
      const roomStudents = shuffledStudents.slice(i * studentsPerRoom, (i + 1) * studentsPerRoom);
      rooms.push({ roomNumber: i + 1, students: roomStudents });
    }

    // Step 4: Store the room details in the "allocations" collection
    const allocationsCollection = db.collection("allocations");
    await allocationsCollection.insertMany(rooms);

    console.log("Room details shuffled and stored successfully.");

    // Close MongoDB connection
    client.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the function to shuffle students and store room details
shuffleStudentsAndStore();
