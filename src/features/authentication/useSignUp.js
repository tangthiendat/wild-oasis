import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
    const { mutate: signUp, isPending: isLoading } = useMutation({
        mutationFn: signUpApi,
        onSuccess: () => {
            toast.success(
                "Account created successfully. Please verify the new account from the user's address."
            );
        },
    });
    return { signUp, isLoading };
}
