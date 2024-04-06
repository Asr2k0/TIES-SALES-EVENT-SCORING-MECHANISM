// readCsvAndStore.js
const fs = require('fs');
const csvParser = require('csv-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://rithvik:rithvik@event.eovstts.mongodb.net/?retryWrites=true&w=majority/events', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Once connected, start processing the CSV file
  processCsvFile();
})
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define a Mongoose schema
const masterDataSchema = new mongoose.Schema({}, { strict: false });
const MasterData = mongoose.model('MasterData', masterDataSchema);

// Path to your CSV file
const csvFilePath = 'records.csv';

// Function to process the CSV file
function processCsvFile() {
  // Read CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      // Convert name to lowercase
      if (row.name) {
        row.Name = row.Name.toLowerCase();
      }
      console.log(row); // Print the row to the console
      // Save the row to the 'master_data' collection
      const document = new MasterData(row);
      document.save()
        .then(() => console.log('Document saved:', row))
        .catch(err => console.error('Error saving document:', err));
    })
    .on('error', (err) => {
      console.error('Error reading CSV file:', err);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      // Disconnect from MongoDB after processing all rows
      mongoose.disconnect();
    });
}
