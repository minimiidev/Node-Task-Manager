// TODO: Had to add this to force a DNS couldn't connect to Mongo Atlas
// import dns from "node:dns/promises";
// dns.setServers(["8.8.8.8"]);

import express from "express"
import { Environment } from "./config/Environment"
import { connectDB } from "./db/connect"

import { TaskRoutes } from "./routes/tasks"

import { notFound } from "./middleware/not-found"
import { errorHandlerMiddleware } from "./middleware/error-handler"

const app = express();

// Middleware
app.use(express.static("./public"));
app.use(express.json());

// Routes
app.use("/api/v1/tasks", TaskRoutes.routes);

// 404
app.use(notFound);

// Error handler (siempre al final)
app.use(errorHandlerMiddleware);

(async () => {
    main();
})();

async function main() {
    try {
        await connectDB(process.env.MONGO_URI ?? "");

        app.listen(Environment.PORT, () => {
            console.log(`Server on port: http://localhost:${Environment.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

export default app;