import { SignUp } from "@clerk/nextjs";
import { Container } from "@mantine/core";
import React from "react";

function SignUpPage() {
    return (
        <Container size="xs" py="xl">
            <SignUp />
        </Container>
    );
}

export default SignUpPage;
