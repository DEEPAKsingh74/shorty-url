import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// create the log folder if not already exists
export function initLogger(){
	const fs = require('fs');
	const dir = '../../../logs';

	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
}

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" }) // Log all messages to a file
    ]
});

export default logger;