import { nanoid } from "nanoid";
import { Request, Response } from "express";
import Url from "../models/url";

export const createShortUrl = async (req: Request, res: Response) => {
  const { originalUrl } = req.body;
  console.log(originalUrl);

  const shortUrl = nanoid(8);
  try {
    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
    });

    res.status(201).json({
      message: "Url created successfully",
      shortUrl: `${process.env.BASE_URL}/${newUrl.shortUrl}`,
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
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error redirecting the original url!" });
  }
};
