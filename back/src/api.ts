import express, { Request, Response } from "express";
import { Article } from "./interfaces/article";

const articles: Article[] = [
  { id: "a1", name: "Tournevis", price: 2.99, qty: 123 },
  { id: "a2", name: "Marteau", price: 3, qty: 45 },
];

const app = express.Router();

const dateMiddleware = (req: Request, res: Response) => {
  res.json({ date: new Date() });
};

app.get("/date", dateMiddleware);

app.get("/articles", (req, res) => {
  res.json(articles);
});

export const api = app;
