import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    };
    return (
        <Container>
            <Head>
                <title>LinkUP | Login</title>
            </Head>
            <LoginContainer>
                <Logo
                    src="https://i.ibb.co/dbS5CXz/LinkUP.png"
                    alt="https://ibb.co/N1XyDfH"
                />
                <p></p>
                <Button onClick={signIn} variant="outlined">
                    Sign In with Google
                </Button>
            </LoginContainer>
        </Container>
    );
}
export default Login;
const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: #495057;
`;
const LoginContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
    > button {
        border: none;
        :hover {
            background-color: #e9ecef;
        }
    }
`;
const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;
