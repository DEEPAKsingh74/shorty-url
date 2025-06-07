"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = require("./config/env_config");
const _1 = __importDefault(require("."));
const PORT = env_config_1.envConfig.port;
async function init() {
    // Connect to the database
    return new Promise((resolve) => {
        _1.default.listen(PORT, () => {
            console.log(`✅✅ Server running on port ${PORT}`);
            resolve();
        });
    });
}
async function close() {
    try {
        // Close the database connection
        // Close the HTTP server
        if (_1.default.listening) {
            await new Promise((resolve) => {
                _1.default.close(() => {
                    console.log("HTTP server closed.");
                    resolve();
                });
            });
        }
        console.log("Server shutting down...");
    }
    catch (error) {
        console.error("Error during cleanup:", error);
        throw error;
    }
}
// Start the server
init().catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
// Handle process exits gracefully
const shutdown = async () => {
    try {
        await close();
        process.exit(0);
    }
    catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
    }
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    shutdown().finally(() => process.exit(1));
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    shutdown().finally(() => process.exit(1));
});
