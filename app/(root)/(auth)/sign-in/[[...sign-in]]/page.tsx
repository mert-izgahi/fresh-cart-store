import { SignIn } from "@clerk/nextjs";
import { Container } from "@mantine/core";
import React from "react";

function SignInPage() {
    return (
        <Container size="xs" py="xl">
            <SignIn />
        </Container>
    );
}

export default SignInPage;
