import { deleteBatchContacts } from "@/Services/contactService";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const ids = req.body;
  try {
    const response = await deleteBatchContacts(ids);
    response.status !== 204
      ? res.status(400).json(response)
      : res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
