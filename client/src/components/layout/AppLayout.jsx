import React from "react";
import Header from "./Header.jsx";
import Title from "../shared/Title.jsx";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList.jsx";
import { samplechats } from "../../constants/sampleData.js";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile.jsx";

const AppLayout = () => (WrappedComponent)=>{
return (props)=>{

        const params = useParams();
        const chatId = params.chatId;
        const handleDeletechat = (e,_id,groupChat) =>{
            console.log(e,_id,groupChat)
        }
        return(
            <>
                <Title/>
                <Header/>
                <Grid container height={"91.674vh"}>
                    <Grid 
                    item 
                    sm = {4}
                    md = {3}
                    sx={{
                        display: {xs: "none", sm:"block"},
                    }}
                    height={"100%"}>
                        <ChatList 
                        chats={samplechats} 
                        chatId={chatId}
                        handleDeletechat={handleDeletechat}
                        />
                    </Grid>

                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} />
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
                        <Profile/>
                    </Grid>
                </Grid>
            </>
        );
    };
};
export default AppLayout;