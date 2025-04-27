import express from "express";
import { createAccountHandler, listAccountsHandler, transferFundsHandler } from "../controllers/accountController.js";

const router = express.Router();

// CREATE
router.post("/create", createAccountHandler);

// LIST
router.get("/", listAccountsHandler);
router.get("/list", listAccountsHandler);

// TRANSFER 
router.post("/transfer", transferFundsHandler);

export default router;
