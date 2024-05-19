import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();
    const { mutate: login, isPending: isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: () => {
            navigate("/dashboard");
        },
        onError: (error) => {
            console.error("ERROR", error);
            toast.error("Provided credentials are invalid.");
        },
    });
    return { login, isLoading };
}
