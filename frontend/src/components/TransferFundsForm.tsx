import { Component, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { transferFunds } from "../api/accountApi";
import { Account } from "../types/account";
import { Button } from "./solid-ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./solid-ui/dialog";
import { TextField, TextFieldInput, TextFieldLabel } from "./solid-ui/text-field";
import { showToast } from "./solid-ui/toast";

const [tranferFundsFormState, setTranferFundsFormState] = createStore<{ account?: Account, isOpen: boolean }>({ isOpen: false });

export function openTransferFundsForm(account: Account) {
    setTranferFundsFormState("account", account);
    setTranferFundsFormState("isOpen", true);
}

export function closeTransferFundsForm() {
    setTranferFundsFormState("account", undefined);
    setTranferFundsFormState("isOpen", false);
}

type TranferFundsFormProps = {
    onClose: () => void,
}

/**
 * Dialog with form inputs for transfering funds between accounts
 */
export const TransferFundsForm: Component<TranferFundsFormProps> = (props) => {
    const [accountToId, setAccountToId] = createSignal<number | undefined>();

    const [amount, setAmount] = createSignal(100);

    async function handleTranferFunds() {
        try {
            const accountTo = accountToId();
            const accountFrom = tranferFundsFormState.account?.id;

            if (accountTo === undefined || accountFrom === undefined || amount() < 0) {
                throw Error("Invalid inputs");
            }

            await transferFunds(accountFrom, accountTo, amount());

            props.onClose();
            showToast({ title: "Successfully transfered funds", variant: "success" })
            closeTransferFundsForm();
        } catch (error) {
            if (error instanceof Error)
                showToast({ title: "Error transfering funds: ", description: error.message, variant: "error" });
            console.error(error);
        }
    }

    return <Dialog open={tranferFundsFormState.isOpen} onOpenChange={() => { setTranferFundsFormState("isOpen", !tranferFundsFormState.isOpen) }}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Transfer funds from account: <span class="font-bold">{tranferFundsFormState.account?.id}</span></DialogTitle>
                <DialogDescription>
                    <p>Owner: {tranferFundsFormState.account?.owner}</p>
                    <p>Current balance: {tranferFundsFormState.account?.balance}</p>
                </DialogDescription>
            </DialogHeader>

            <TextField>
                <TextFieldLabel>To account ID</TextFieldLabel>
                <TextFieldInput type="number" onChange={(e) => setAccountToId(Number(e.currentTarget.value))} />
            </TextField>

            <TextField>
                <TextFieldLabel>Amount to transfer</TextFieldLabel>
                <TextFieldInput type="number" value={amount()} step={1000} onChange={(e) => setAmount(Number(e.currentTarget.value))} />
            </TextField>

            <DialogFooter>
                <Button onClick={handleTranferFunds}>
                    Transfer funds
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
};