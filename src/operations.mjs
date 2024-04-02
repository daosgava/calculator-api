import { paths } from "./constants.mjs";
import logger from "./logger.mjs";

const { ADD, SUBTRACT, MULTIPLY, DIVIDE } = paths;

// Define math operations
const mathOperations = {
	[ADD]: (a, b) => a + b,
	[SUBTRACT]: (a, b) => a - b,
	[MULTIPLY]: (a, b) => a * b,
	[DIVIDE]: (a, b) => a / b,
};

class OperationHandler {
	validateInputs = (inputA, inputB, operationType = ADD) => {
		// Convert inputs to numbers
		const num1 = parseInt(inputA);
		const num2 = parseInt(inputB);

		// Validate inputA
		if (isNaN(num1)) {
			throw new Error("num1 is not a number");
		}

		// Validate inputB
		if (isNaN(num2)) {
			throw new Error("num2 is not a number");
		}

		// Validate denominator for division
		if (operationType === DIVIDE && num2 === 0) {
			throw new Error("division by zero");
		}

		return [num1, num2];
	};

	addition = (req, res) => {
		try {
			// Validate inputs
			const [num1, num2] = this.validateInputs(
				req.query.num1,
				req.query.num2,
				ADD,
			);
			// Perform operation
			const data = mathOperations[ADD](num1, num2);
			// Log operation
			logger.info({
				text: "valid operation",
				url: req.url,
				method: req.method,
			});
			// Send response
			res.status(200).send({ data });
		} catch (e) {
			logger.error({ text: e.message, url: req.url, method: req.method });
			res.status(500).send(e.message);
		}
	};

	subtraction = (req, res) => {
		try {
			const [num1, num2] = this.validateInputs(
				req.query.num1,
				req.query.num2,
				SUBTRACT,
			);
			const data = mathOperations[SUBTRACT](num1, num2);
			logger.info({
				text: "valid operation",
				url: req.url,
				method: req.method,
			});
			res.status(200).send({ data });
		} catch (e) {
			logger.error({ text: e.message, url: req.url, method: req.method });
			res.status(500).send(e.message);
		}
	};

	multiplication = (req, res) => {
		try {
			const [num1, num2] = this.validateInputs(
				req.query.num1,
				req.query.num2,
				MULTIPLY,
			);
			const data = mathOperations[MULTIPLY](num1, num2);
			logger.info({
				text: "valid operation",
				url: req.url,
				method: req.method,
			});
			res.status(200).send({ data });
		} catch (e) {
			logger.error({ text: e.message, url: req.url, method: req.method });
			res.status(500).send(e.message);
		}
	};

	division = (req, res) => {
		try {
			const [num1, num2] = this.validateInputs(
				req.query.num1,
				req.query.num2,
				DIVIDE,
			);
			const data = mathOperations[DIVIDE](num1, num2);
			logger.info({
				text: "valid operation",
				url: req.url,
				method: req.method,
			});
			res.status(200).send({ data });
		} catch (e) {
			logger.error({ text: e.message, url: req.url, method: req.method });
			res.status(500).send(e.message);
		}
	};
}

export default OperationHandler;
