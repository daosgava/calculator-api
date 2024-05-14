import express from "express";
import Operations from "./operations.mjs";
import { port, operationPaths } from "./constants.mjs";
import MongoDBManager from "./MongoDBManager.mjs";
import bodyParser from "body-parser";

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Instantiate OperationHandler
const operations = new Operations();

// Register routes
for (const path of Object.values(operationPaths)) {
	app.get(path, operations.requestHandler);
}

const dbUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const dbPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

const url = `mongodb://${dbUser}:${dbPassword}@mongo-service:32000`;
const dbName = "testDatabase";
const collectionName = "testCollection";
const mongoDBManager = new MongoDBManager(url, dbName, collectionName);

app.get("/documents", mongoDBManager.getDocuments);
app.post("/document", mongoDBManager.insertDocument);
app.delete("/document/:name", mongoDBManager.deleteDocument);

app.listen(port, () => {
	console.log(`🐲: This server runs at http://localhost:${port}`);
});
