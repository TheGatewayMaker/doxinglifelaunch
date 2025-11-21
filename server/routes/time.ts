import { RequestHandler } from "express";

export interface TimeResponse {
  timestamp: number;
}

export const handleGetTime: RequestHandler = (_req, res) => {
  res.json({
    timestamp: Date.now(),
  });
};
