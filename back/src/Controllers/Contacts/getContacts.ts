import { getContacts } from "@/Services/contactService";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const limit = req.query.limit ? +req.query.limit : 10;
  const after = req.query.after ? String(req.query.after) : null;

  try {
    const response = await getContacts(limit, after);
    return res.status(response.status).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
