import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/AuthRequest";

const JWT_SECRET = process.env.JWT_SECRET || "KAREGA";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};