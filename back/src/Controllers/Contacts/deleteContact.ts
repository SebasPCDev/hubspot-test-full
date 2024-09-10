import { deleteContact } from "@/Services/contactService";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await deleteContact(id);
    response.status !== 204
      ? res.status(400).json(response)
      : res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
