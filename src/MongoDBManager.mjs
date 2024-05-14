import { MongoClient } from "mongodb";

class MongoDBManager {
	constructor(url, dbName, collectionName) {
		this.url = url;
		this.dbName = dbName;
		this.collectionName = collectionName;
		this.client = new MongoClient(this.url);
	}

	connect = async () => {
		if (!this.db) {
			this.client = await this.client.connect();
			this.db = this.client.db(this.dbName);
			this.collection = this.db.collection(this.collectionName);
		}
	};

	insertDocument = async (req, res) => {
		const data = req.body;
		if (!data) {
			res.status(400).send("No data provided");
		}

		try {
			await this.connect();
			const result = await this.collection.insertOne(data);

			res.send(result);
		} catch (e) {
			console.error(e);
			res.status(500).send("Internal server error");
		}
	};

	deleteDocument = async (req, res) => {
		try{
			await this.connect();
			const result = await this.collection.deleteOne({ name: req.params.name });

			res.send(result);
		} catch (e) {
			console.error(e);
			res.status(500).send("Internal server error");
		}
	};

	getDocuments = async (_, res) => {
		try {
			await this.connect();
			const documents = await this.collection.find({}).toArray();

			res.send(documents);
		} catch (e) {
			console.error(e);
			res.status(500).send("Internal server error");
		}
	};

	close = async () => {
		if (this.client) {
			await this.client.close();
		}
	};
}

export default MongoDBManager;
