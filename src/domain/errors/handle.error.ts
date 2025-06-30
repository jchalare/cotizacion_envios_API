import { Response } from "express";
import { CustomError } from "./custom.error";

export class HandleError {
  static showError(error: Error, res: Response) {
    console.error("Error :", error);
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}
