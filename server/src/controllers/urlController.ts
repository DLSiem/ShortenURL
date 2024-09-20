import { nanoid } from "nanoid";
import { Request, Response } from "express";
import Url from "../models/url";

export const createShortUrl = async (req: Request, res: Response) => {
  const { originalUrl } = req.body;

  const shortUrl = nanoid(6);
  try {
    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
    });
    const newShortUrl = newUrl.dataValues.shortUrl;
    console.log("New short url:", newShortUrl);
    res.status(201).json({
      message: "Url created successfully",
      shortUrl: `${process.env.BASE_URL}/${newShortUrl}`,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOriginalUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;
  console.log("Short url:", shortUrl);
  try {
    const url = await Url.findOne({ where: { shortUrl } });
    if (!url) {
      return res.status(404).json({ message: "Url not found" });
    }
    await url.increment("clicks");
    console.log("Redirecting to:", url.dataValues.originalUrl);
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
