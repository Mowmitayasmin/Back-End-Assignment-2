import morgan, { StreamOptions } from "morgan";
import fs from "fs";
import path from "path";

// logs are src/logs
const logsDir = path.join(__dirname, "../../../logs");

// Working everywhere even if src/logs doesn't exist YET
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// WriteStream
const accessLogStream = fs.createWriteStream(path.join(logsDir, "access.log"), { flags: "a" });

// Custom stream options for error logging
const errorLogStream: StreamOptions = {
    write: (message) => fs.appendFileSync(path.join(logsDir, "error.log"), message),
};

// Access logs
const accessLogger = morgan("combined", { stream: accessLogStream });

// Error Logs (improved for better formatting)
const errorLogger = {
    error: (message: string, details?: object) => {
        const logMessage = `${new Date().toISOString()} - ERROR: ${message} ${
            details ? JSON.stringify(details) : ""
        }\n`;
        fs.appendFileSync(path.join(logsDir, "error.log"), logMessage);
    },
};

export { accessLogger, errorLogger };
