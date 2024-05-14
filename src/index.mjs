import express from "express";
import Operations from "./operations.mjs";
import { port, paths } from "./constants.mjs";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";

const url = "mongodb://admin:password@mongo-service:32000";
const dbName = "testDatabase";
const collectionName = "testCollection";

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Instantiate OperationHandler
const operations = new Operations();

// Register routes
for (const path of Object.values(paths)) {
	app.get(path, operations.requestHandler);
}

app.get("/break-app", (_, res) => {
	res.send("🔥: This is a broken route");
	process.exit(1);
});

app.get("/get-entries", async (req, res) => {
	try {
        const client = await MongoClient.connect(url);

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
		const documents = await collection.find({}).toArray();

        res.send(documents);
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal server error");
	}
});

app.post("/add-entry", async (req, res) => {
	const data = req.body;
	if (!data) {
		res.status(400).send("No data provided");
	}

	try {
		const client = await MongoClient.connect(url);

		const db = client.db(dbName);
		const collection = db.collection(collectionName);
		const result = await collection.insertOne(data);

		res.send(result);
	} catch (e) {
		console.error(e);
		res.status(500).send("Internal server error");
	}
});

app.listen(port, () => {
	console.log(`🐲: This server runs at http://localhost:${port}`);
});
