import { getContactById } from "@/Services/contactService";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await getContactById(+id);
    return res.status(response.status).json(response);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
