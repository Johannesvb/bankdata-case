import type { Account } from "../models/account.js";

const testAccount: Account = { id: 1, balance: 100, owner: "test", transactionLog: [] }
let accounts: Record<number, Account> = [testAccount];
let nextId = Object.values(accounts).length + 1;

export function createAccount(owner: string, initialBalance: number): Account {
    const id = nextId++;
    const account: Account = { id: id, owner: owner, balance: initialBalance, transactionLog: [] };
    accounts[id] = account;
    return account;
}

export function listAccounts(): Account[] {
    return Object.values(accounts);
}

/**
 * Tranfers funds between accounts by modifying values directly
 * Checks if provided account ids are valid
 * Checks if account has sufficient balance before transfering funds
 * 
 * Lacks security measures to make sure that the user is owner of accounts.
 * 
 * @param fromId 
 * @param toId 
 * @param amount 
 */
export function transferFunds(fromId: number, toId: number, amount: number): void {
    const from = accounts[fromId];
    const to = accounts[toId];

    if (!from || !to) {
        throw new Error("Account not found");
    }
    if (from.balance < amount) {
        throw new Error("Insufficient funds");
    }

    from.balance -= amount;
    to.balance += amount;

    from.transactionLog.push({ toId, amount: -amount })
    to.transactionLog.push({ toId, amount: amount })
}
