import express from "express";
import { signUpController } from "../controllers/signUpController.js";

export const signUpRoute = express.Router();

signUpRoute.post("/", signUpController);
