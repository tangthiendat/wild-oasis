/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    //1. Load authenticated user
    const { user, isLoading, isAuthenticated } = useUser();

    //3. If user is not authenticated, redirect to login page
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading, navigate]);

    //2. While loading, show a spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    //4. If user is authenticated, render the app
    if (isAuthenticated) return children;
}

export default ProtectedRoute;
