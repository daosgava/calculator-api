import { createLogger, transports, format } from "winston";

const logger = createLogger({
	level: "info",
	format: format.json(),
	defaultMeta: { service: "calculator-service" },
	transports: [
		new transports.File({ filename: "./logs/error.log", level: "error" }),
		new transports.File({ filename: "./logs/combined.log" }),
	],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(
		new transports.Console({
			format: format.json(),
		}),
	);
}

export default logger;
