import express from "express";
import OperationHandler from "./operations.mjs";
import { port, paths } from "./constants.mjs";

const app = express();
// Instantiate OperationHandler
const operationHandler = new OperationHandler();

// Get paths from constants
const { ADD, SUBTRACT, MULTIPLY, DIVIDE } = paths;

// Define routes
const routes = {
	[ADD]: operationHandler.addition,
	[SUBTRACT]: operationHandler.subtraction,
	[MULTIPLY]: operationHandler.multiplication,
	[DIVIDE]: operationHandler.division,
};

// Register routes
for (const [route, handler] of Object.entries(routes)) {
	app.get(route, handler);
}

app.listen(port, () => {
	console.log(`🐲: This server runs at http://localhost:${port}`);
});
