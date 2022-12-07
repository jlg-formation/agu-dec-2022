import express, { Request, Response } from "express";
import { Article, NewArticle } from "./interfaces/article";

function generateId() {
  return Date.now() + "_" + Math.floor(Math.random() * 1e9);
}

let articles: Article[] = [
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

app.use(express.json());

app.post("/articles", (req, res) => {
  const newArticle: NewArticle = req.body;
  const id = generateId();
  const article: Article = { id, ...newArticle };
  articles.push(article);
  res.status(201).json({ id });
});

app.delete("/articles", (req, res) => {
  const ids: string[] = req.body;
  articles = articles.filter((a) => !ids.includes(a.id));
  res.status(204).end();
});

export const api = app;
