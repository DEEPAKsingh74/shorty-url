import { envConfig } from "@config/env_config";
import server from ".";

const PORT = envConfig.port;

async function init() {
	// Connect to the database

	return new Promise<void>((resolve) => {
		server.listen(PORT, () => {
			console.log(`✅✅ Server running on port ${PORT}`);
			resolve();
		});

	});
}

async function close() {
	try {
		// Close the database connection

		// Close the HTTP server
		if (server.listening) {
			await new Promise<void>((resolve) => {
				server.close(() => {
					console.log("HTTP server closed.");
					resolve();
				});
			});
		}

		console.log("Server shutting down...");
	} catch (error) {
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
	} catch (error) {
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