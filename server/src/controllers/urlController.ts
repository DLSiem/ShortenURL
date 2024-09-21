import { nanoid } from "nanoid";
import { Request, Response } from "express";
import Url from "../models/url";
import { start } from "repl";

export const createShortUrl = async (req: Request, res: Response) => {
  const { originalUrl } = req.body;

  if (originalUrl.trim() === "") {
    console.log("Url is required!");
    return res.status(400).json({ message: "Url is required!" });
  }

  // check if the url is valid or not
  const urlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
  if (!urlRegex.test(originalUrl)) {
    return res.status(400).json({ message: "Url is not valid!" });
  }

  if (originalUrl.length > 2048) {
    return res.status(400).json({ message: "Url is too long!" });
  }

  const shortUrl = nanoid(6);
  try {
    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
    });
    const newShortUrl = newUrl.dataValues.shortUrl;

    res.status(201).json({
      message: "Url created successfully",
      data: {
        originalUrl: newUrl.dataValues.originalUrl,
        shortUrl: `http://localhost:3000/${newShortUrl}`,
        clicks: newUrl.dataValues.clicks,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOriginalUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ where: { shortUrl } });
    if (!url) {
      return res.status(404).json({ message: "Url not found" });
    }
    await url.increment("clicks");

    if (process.env.BASE_URL) {
      res.redirect(url.dataValues.originalUrl);
    } else {
      res.status(500).json({
        message: "BASE_URL is not defined in the environment variables",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error redirecting the original url!" });
  }
};
