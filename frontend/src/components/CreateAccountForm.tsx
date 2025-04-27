import { Component, createSignal } from "solid-js";
import { Account } from "../types/account";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";
import { TextField, TextFieldInput, TextFieldLabel } from "./ui/text-field";
import { createAccount } from "../api/accountApi";

type CreateAccountFormProps = {
    onAccountCreated: (account: Account) => void
}

export const CreateAccountForm: Component<CreateAccountFormProps> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);
    const [ownerInput, setOwnerInput] = createSignal<string>("");
    const [balanceInput, setBalanceInput] = createSignal<number>(0);

    async function handleCreateAccount() {
        try {
            if (!ownerInput()) {
                throw new Error("Owner must be specified");
            }

            const accountData = await createAccount(ownerInput(), balanceInput());

            props.onAccountCreated(accountData);
            setIsOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

    return <Dialog open={isOpen()} onOpenChange={() => { setIsOpen(!isOpen()) }}>
        <DialogTrigger>
            <Button>
                Create Account
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a new account</DialogTitle>
            </DialogHeader>

            {/* Account creation inputs */}
            <TextField>
                <TextFieldLabel>Owner</TextFieldLabel>
                <TextFieldInput type="text" onChange={(e) => setOwnerInput(e.currentTarget.value)} />
            </TextField>
            <TextField>
                <TextFieldLabel>Balance</TextFieldLabel>
                <TextFieldInput type="number" onChange={(e) => setBalanceInput(Number(e.currentTarget.value))} />
            </TextField>

            <DialogFooter>
                <Button onClick={handleCreateAccount}>
                    Create account
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
};
