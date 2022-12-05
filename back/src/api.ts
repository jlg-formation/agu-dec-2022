import express, { Request, Response } from "express";

const app = express.Router();

const dateMiddleware = (req: Request, res: Response) => {
  res.json({ date: new Date() });
};

app.get("/date", dateMiddleware);

export const api = app;
