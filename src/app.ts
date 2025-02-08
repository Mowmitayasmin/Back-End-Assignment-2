// import the express application and type definition
import express, { Express } from "express";
import morgan from "morgan";

// import setupSwagger endpoint
import setupSwagger from "../config/swagger";
import userRoutes from "./api/v1/routes/userRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

// initialize the express application
const app: Express = express();

// setup swagger for api documentation
setupSwagger(app);

app.use(morgan("combined"));
app.use(express.json());

// define your routes
app.use("/api/v1/employees", userRoutes);  
app.use("/api/v1/branches", branchRoutes);

// respond to GET request at endpoint "/" with message
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/health", (req, res) => {
    res.send("Server is healthy");
});

// export app and server for testing
export default app;

