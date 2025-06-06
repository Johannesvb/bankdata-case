import { Component, createResource, Show } from "solid-js";
import { CreateAccountForm } from "../components/CreateAccountForm";
import { Table } from "../components/Table";
import { openTransferFundsForm, TransferFundsForm } from "../components/TransferFundsForm";
import { Account } from "../types/account";

export const AccountsView: Component = () => {
    const [accounts, { refetch }] = createResource<Account[]>(fetchAccounts);

    async function fetchAccounts() {
        try {
            const accounts = await (await fetch(`http://localhost:3000/accounts`)).json()
            return accounts
        } catch (error) {
            console.error(error);
        }
    }

    return <div class="border border-border rounded-lg p-4">
        <h2>Your Accounts</h2>
        <Show when={!accounts.loading}>
            <Table<Account>
                columns={[
                    {
                        header: "ID",
                        key: "id"
                    },
                    {
                        header: "Owner",
                        key: "owner"
                    },
                    {
                        header: "Balance",
                        key: "balance"
                    },
                    {
                        header: "",
                        key: undefined,
                        render: (account) => <button class="underline text-xs"
                            onClick={() => { openTransferFundsForm(account) }}
                        >
                            Transfer funds
                        </button>
                    }
                ]}
                data={accounts() ?? []}
            />
        </Show>

        <CreateAccountForm onAccountCreated={refetch} />
        <TransferFundsForm onClose={refetch} />
    </div>;
};