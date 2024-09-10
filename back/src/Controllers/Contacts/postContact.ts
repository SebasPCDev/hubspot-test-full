import { Properties } from "@/Interfaces/Properties";
import { postContact } from "@/Services/contactService";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const { body } = req;
  const properties: Properties = {
    properties: {
      ...body,
    },
  };
  try {
    const response = await postContact(properties);
    return res.status(response.status).json(response);
  } catch (error: any) {
    return res.status(500).json(error);
  }
};
