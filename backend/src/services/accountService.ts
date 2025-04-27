import type { Account } from "../models/account.js";

const testAccount: Account = { id: 1, balance: 100, owner: "test" }
let accounts: Record<number, Account> = [testAccount];
let nextId = Object.values(accounts).length + 1;

export function createAccount(owner: string, initialBalance: number): Account {
    const id = nextId++;
    const account: Account = { id: id, owner: owner, balance: initialBalance };
    accounts[id] = account;
    return account;
}

export function listAccounts(): Account[] {
    return Object.values(accounts);
}

export function transferFunds(user: string, fromId: number, toId: number, amount: number): void {
    const from = accounts[fromId];
    const to = accounts[toId];

    if (from.owner !== user) {
        throw new Error("User does not have permission to transfer from account")
    }
    if (!from || !to) {
        throw new Error("Account not found");
    }
    if (from.balance < amount) {
        throw new Error("Insufficient funds");
    }

    from.balance -= amount;
    to.balance += amount;
}
