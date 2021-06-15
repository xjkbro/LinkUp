import { Avatar, Button, IconButton, Modal } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import { useRouter } from "next/router";

function Sidebar() {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const userChatRef = db
        .collection("chats")
        .where("users", "array-contains", user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt(
            "Please enter email address you would like to chat with"
        );
        if (!input) return null;
        if (
            EmailValidator.validate(input) && //checks validity of email
            !chatAlreadyExists(input) && //checks for existing chat
            input !== user.email //checks if input is the email of user
        ) {
            db.collection("chats").add({
                users: [user.email, input],
            });
        }
    };
    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recipientEmail)
                    ?.length > 0
        );

    return (
        <Container>
            <Header>
                <UserAvatar
                    src={user.photoURL}
                    // onClick={() => auth.signOut()}
                />
                {/* <DisplayName>{user.displayName}</DisplayName> */}
                <IconsContainer>
                    <IconButton>
                        <ChatIcon onClick={createChat} />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    <IconButton>
                        <ExitToAppIcon onClick={() => auth.signOut()} />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>
            <SidebarButton onClick={createChat}>Start New Chat</SidebarButton>

            {/* Chats */}
            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    );
}

export default Sidebar;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;
const DisplayName = styled.span`
    font-size: 20px;
`;
const IconsContainer = styled.div``;
const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 2px;
`;
const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;
const SidebarButton = styled(Button)`
    width: 100%;
    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;
