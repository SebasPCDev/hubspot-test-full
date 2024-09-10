import { getContactByEmail } from "@/Services/contactService";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const email = req.query.email;

  try {
    const response = await getContactByEmail(String(email));
    return res.status(response.status).json(response);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
