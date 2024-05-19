/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: login, isPending: isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueriesData(["user"], user);
            navigate("/dashboard");
        },
        onError: (error) => {
            console.error("ERROR", error);
            toast.error("Provided credentials are invalid.");
        },
    });
    return { login, isLoading };
}
