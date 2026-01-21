import express from "express";
import { getShortURL, redirectURL } from "./controller.js";

export const router = express.Router();

router.post("/", getShortURL);
router.get("/:code", redirectURL);

// https://expressjs.com/en/guide/routing.html -> Route Parameters
