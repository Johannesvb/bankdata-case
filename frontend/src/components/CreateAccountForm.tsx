import { Component, createSignal } from "solid-js";
import { Account } from "../types/account";
import { Button } from "./solid-ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./solid-ui/dialog";
import { TextField, TextFieldErrorMessage, TextFieldInput, TextFieldLabel } from "./solid-ui/text-field";
import { createAccount } from "../api/accountApi";
import { showToast } from "./solid-ui/toast"

type CreateAccountFormProps = {
    onAccountCreated: (account: Account) => void
}

export const CreateAccountForm: Component<CreateAccountFormProps> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);

    const [ownerInput, setOwnerInput] = createSignal<string>("");
    const [ownerInputError, setOwnerInputError] = createSignal<string>("");
    const [balanceInput, setBalanceInput] = createSignal<number>(0);

    async function handleCreateAccount() {
        if (!validateInputs(ownerInput())) return;

        try {
            const accountData = await createAccount(ownerInput(), balanceInput());

            props.onAccountCreated(accountData);

            closeDialog();
        } catch (error) {
            if (error instanceof Error)
                showToast({ title: "Error creating account: ", description: error.message, variant: "error" });
            console.error(error);
        }
    }

    function validateInputs(owner: string) {
        if (!owner) {
            setOwnerInputError("You must specify an owner");
            return false;
        }
        return true;
    }

    function closeDialog() {
        setIsOpen(false);
        setBalanceInput(0);
        setOwnerInput("");
        setOwnerInputError("");
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
            <TextField validationState={ownerInputError() === "" ? "valid" : "invalid"}>
                <TextFieldLabel>Owner</TextFieldLabel>
                <TextFieldInput type="text" onChange={(e) => setOwnerInput(e.currentTarget.value)} />
                <TextFieldErrorMessage>{ownerInputError()}</TextFieldErrorMessage>
            </TextField>
            
            <TextField>
                <TextFieldLabel>Balance</TextFieldLabel>
                <TextFieldInput type="number" value={0} step={1000} onChange={(e) => setBalanceInput(Number(e.currentTarget.value))} />
            </TextField>

            <DialogFooter>
                <Button onClick={handleCreateAccount}>
                    Create account
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
};
