import { Request, Response, NextFunction } from "express";
import { body, validationResult, check } from "express-validator";

export const validateBodyContact = [
  check("firstname")
    .exists()
    .withMessage("Debe ingresar un nombre")
    .notEmpty()
    .withMessage("Debe ingresar un nombre")
    .isString()
    .withMessage("Debe ingresar un nombre válido")
    .isLength({ min: 3 })
    .withMessage("Nombre debe tener al menos 3 caracteres"),
  check("email")
    .exists()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe ingresar un email válido")
    .notEmpty()
    .withMessage("Debe ingresar un email"),
  check("phone")
    .exists()
    .withMessage("Debe ingresar un teléfono")
    .notEmpty()
    .withMessage("Debe ingresar un teléfono")
    .isLength({ min: 10, max: 18 })
    .withMessage("Debe ingresar un teléfono válido"),
  check("lastname")
    .exists()
    .withMessage("Debe ingresar un apellido")
    .notEmpty()
    .withMessage("Debe ingresar un apellido")
    .isString()
    .withMessage("Debe ingresar un apellido válido")
    .isLength({ min: 3, max: 50 })
    .withMessage("Apellido debe tener al menos 3 caracteres"),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.errors.map((e: any) => e.msg) });
    }
  },
];

export const validateBodyUpdateContact = [
  check("firstname")
    .isString()
    .withMessage("Nombre no puede ser un número")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Apellido debe tener al menos 3 caracteres"),
  check("email")
    .isEmail()
    .withMessage("Debe ingresar un email válido")
    .optional(),
  check("phone").optional(),
  check("lastname")
    .isString()
    .withMessage("Apellido no puede ser un número")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Apellido debe tener al menos 3 caracteres"),
  check().custom((value, { req }) => {
    const allowedFields = ["firstname", "lastname", "email", "phone"];
    const extraFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field)
    );
    if (extraFields.length > 0) {
      throw new Error("Campos adicionales no permitidos: " + extraFields);
    }
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.errors.map((e: any) => e.msg) });
    }
  },
];
