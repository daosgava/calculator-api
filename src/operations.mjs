import { paths } from "./constants.mjs";
import logger from "./logger.mjs";

const { ADD, SUBTRACT, MULTIPLY, DIVIDE, EXPONENTIATION, SQUARE_ROOT, MODULE } = paths;

// Define math operations
const mathOperations = {
	[ADD]: (a, b) => a + b,
	[SUBTRACT]: (a, b) => a - b,
	[MULTIPLY]: (a, b) => a * b,
	[DIVIDE]: (a, b) => a / b,
	[EXPONENTIATION]: (a, b) => a ** b,
	[SQUARE_ROOT]: (a) => Math.sqrt(a),
	[MODULE]: (a, b) => a % b,
};

class Operations {
	validateInputs = (inputA, inputB, operationType = ADD) => {
		// Convert inputs to numbers
		const num1 = parseInt(inputA);
		const num2 = parseInt(inputB);

		switch (operationType) {
			case ADD:
			case SUBTRACT:
			case MULTIPLY:
			case EXPONENTIATION:
			case MODULE:
				// Validate inputA
				if (isNaN(num1)) {
					throw new Error("num1 is not a number");
				}

				// Validate inputB
				if (isNaN(num2)) {
					throw new Error("num2 is not a number");
				}

				break;
			case DIVIDE:
				if (isNaN(num1)) {
					throw new Error("num1 is not a number");
				}

				// Validate inputB
				if (isNaN(num2)) {
					throw new Error("num2 is not a number");
				}

				// Validate denominator for division
				if (num2 === 0) {
					throw new Error("division by zero");
				}
				break;
			case SQUARE_ROOT:
				// throw error if num1 is not a number
				if (isNaN(num1)) {
					throw new Error("num1 is not a number");
				}

				// throw error if num2 is provided
				if (num2) {
					throw new Error("num2 is not required for square root operation");
				}
				break;
		}

		return [num1, num2];
	};

	requestHandler = (req, res) => {
		try {
			const operationType = req.route.path;
			// Validate inputs
			const [num1, num2] = this.validateInputs(
				req.query.num1,
				req.query.num2,
				operationType,
			);
			// Perform operation
			const data = mathOperations[operationType](num1, num2);
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
}

export default Operations;
