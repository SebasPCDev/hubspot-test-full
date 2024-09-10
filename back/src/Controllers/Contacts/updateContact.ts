import { updateContact } from "@/Services/contactService";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  const response = await updateContact({
    id: id,
    properties: {
      ...body,
    },
  });
  return res.status(response.status).json(response);
};
