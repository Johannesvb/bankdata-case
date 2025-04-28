import { Account } from "../types/account";

export async function createAccount(owner: string, initialBalance: number) {
    const response = await fetch("http://localhost:3000/accounts/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            owner,
            initialBalance
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create account");
    }

    const accountData: Account = await response.json();
    return accountData;
}

export async function transferFunds(fromId: number, toId: number, amount: number) {
    const response = await fetch("http://localhost:3000/accounts/transfer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fromAccountId: fromId,
            toAccountId: toId,
            amount: amount
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to transfer funds");
    }

    return await response.json();
}
