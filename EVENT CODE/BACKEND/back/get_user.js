const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

const url = "mongodb+srv://rithvik:rithvik@event.eovstts.mongodb.net/?retryWrites=true&w=majority";
let dbConn;

mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
    const fileName = "./records.csv";
    const arrayToInsert = [];

    csvtojson()
        .fromFile(fileName)
        .then((source) => {
            // Fetching the all data from each row
            for (let i = 0; i < source.length; i++) {
                const oneRow = {
                    id: source[i]["id"],
                    Name: source[i]["Name"],
                    role: source[i]["Roll Number"]
                };
                arrayToInsert.push(oneRow);
            }

            // Inserting into the collection “participants”
            const collectionName = "participants"; // Pass collection name as string
            const collection = dbConn.collection(collectionName);
            collection.insertMany(arrayToInsert, (err, result) => {
                if (err) console.log(err);
                if (result) {
                    console.log("Import CSV into database successfully.");
                }
            });
        })
        .catch((err) => {
            console.log("Error converting CSV to JSON:", err);
        });
})
.catch((err) => {
    console.log("DB Connection Error:", err.message);
});





