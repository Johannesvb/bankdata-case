import { Request, Response } from "express";
import { createAccount, listAccounts, transferFunds } from "../services/accountService.js";

export function createAccountHandler(req: Request, res: Response) {
    const { owner, initialBalance } = req.body;

    if (!owner || initialBalance == null) {
        res.status(400).json({ error: "Owner and initial balance required" });
        return
    }

    const account = createAccount(String(owner), Number(initialBalance));
    res.status(201).json(account);
}

export function listAccountsHandler(req: Request, res: Response) {
    res.json(listAccounts());
}

export function transferFundsHandler(req: Request, res: Response) {
    const { fromAccountId, toAccountId, amount } = req.body;
    try {
        transferFunds( fromAccountId, toAccountId, amount);
        res.json({ success: true });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
