import express from "express";
import { router } from "./router.js";
const app = express();
const PORT = 3000;

// see cors error in error.txt
import cors from "cors";
// Allow only a specific origin
app.use(cors({ origin: "http://localhost:5000" }));

app.use(express.json()); // This middleware is used to parse JSON bodies.

app.use("/petite-url", router);

app.get("/", (req, res) => {
  res.send(`Welcome to Edmund's localhost`);
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
