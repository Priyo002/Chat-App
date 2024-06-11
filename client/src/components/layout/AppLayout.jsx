import React, { useCallback, useEffect } from "react";
import Header from "./Header.jsx";
import Title from "../shared/Title.jsx";
import { Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../specific/Profile.jsx";
import { useMyChatsQuery } from "../../redux/api/api.js";
import { setIsMobile } from "../../redux/reducers/misc.js";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "@mui/material";
import { useErrors, useSocketEvents } from "../../hooks/hook.jsx";
import { getSocket } from "../../socket.jsx";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from "../../constants/events.js";
import { increamentNotification, setNewMessagesAlert } from "../../redux/reducers/chat.js";
import { getOrSaveFromStorage } from "../../lib/features.js";

const AppLayout = () => (WrappedComponent)=>{
return (props)=>{

        const params = useParams();
        const dispatch = useDispatch();
        const chatId = params.chatId;

        const navigate = useNavigate();

        const socket = getSocket();

        //console.log(socket.id);

        const { isMobile } = useSelector((state)=>state.misc); 
        const { user } = useSelector((state)=> state.auth);
        const { newMessagesAlert } = useSelector((state)=>state.chat);
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

        useErrors([{isError, error}]);

        useEffect(() => {
            getOrSaveFromStorage({key: NEW_MESSAGE_ALERT, value: newMessagesAlert});
        },[newMessagesAlert,user]);

        const handleDeletechat = (e,_id,groupChat) =>{
            console.log(e,_id,groupChat)
        }
        console.log(user);
        const handleMobileClose = () => dispatch(setIsMobile(false));

        const newMessageAlertsListener  = useCallback((data) => {
            if(chatId === data.chatId) return;
            dispatch(setNewMessagesAlert(data));
            
        },[]);
        
        const newRequestListener = useCallback(() => {
            dispatch(increamentNotification());
        },[dispatch]);

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/")
        },[dispatch,navigate]);

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertsListener,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener,
        };

        useSocketEvents(socket,eventHandlers);

        //console.log("n\n",newMessagesAlert);

        return(
            <>
                <Title/>
                <Header/>

                {isLoading ? (
                    <Skeleton/>
                ) : ( 
                    <Drawer 
                        open={isMobile} 
                        onClose={handleMobileClose}
                    >
                        <ChatList
                            w="70vw"
                            chats={data?.chats}
                            chatId={chatId}
                            handleDeletechat={handleDeletechat}
                            newMessagesAlert = {newMessagesAlert}
                        />
                    </Drawer>
                )}

                <Grid container height={"91.674vh"}>
                    <Grid 
                    item 
                    sm = {4}
                    md = {3}
                    sx={{
                        display: {xs: "none", sm:"block"},
                    }}
                    height={"100%"}>
                    {
                        isLoading  ? (<Skeleton/>) : (
                        <ChatList 
                            chats={data?.chats} 
                            chatId={chatId}
                            handleDeletechat={handleDeletechat}
                            newMessagesAlert = {newMessagesAlert}
                        />)
                    }
                    </Grid>

                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} chatId={chatId} user={user}/>
                    </Grid>

                    <Grid 
                    item 
                    md={4} 
                    lg={3} 
                    height={"100%"}
                    sx={{
                        display: {xs: "none", md:"block"},
                        padding: "2rem",
                        bgcolor: "rgba(0,0,0,0.85)",
                    }}>
                        <Profile user={user}/>
                    </Grid>
                </Grid>
            </>
        );
    };
};
export default AppLayout;