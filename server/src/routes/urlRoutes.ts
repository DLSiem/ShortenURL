import express from "express";
import { createShortUrl, getOriginalUrl } from "../controllers/urlController";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortUrl", getOriginalUrl);

export default router;
