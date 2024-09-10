import express from "express";
import moment from "moment";
import axios from "axios";
import dotenv from "dotenv";
import { postContact } from "@/Controllers";
import { contactsRoute } from "./contactsRoute";

dotenv.config();

export const routes = express.Router();

//Logger Middleware
routes.use((req, res, next) => {
  const date = moment().format("dddd, D MMMM YYYY, h:mm:ss a");
  console.log(
    `[Global Middleware Logger] | Method: ${req.method} | Path: ${req.url} | Date: ${date} \n--------------------`
  );
  next();
});

routes.use(contactsRoute);
