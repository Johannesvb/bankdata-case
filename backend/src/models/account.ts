import { Transaction } from "./transaction";

export type Account = {
    id: number;
    owner: string;
    balance: number;
    transactionLog: Transaction[];
}
