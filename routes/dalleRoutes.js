import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const image = await openai.images.generate({ prompt });
    if (image && image.data) {
      res.status(200).json({ photo: image });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response?.data?.error?.message || "Something went wrong");
  }
});

export default router;
