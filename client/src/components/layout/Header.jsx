import React, {Suspense, useState} from "react";
import {useNavigate} from "react-router-dom"
import {AppBar, Backdrop, Box, Icon, IconButton, Toolbar, Tooltip, Typography} from "@mui/material"
import { orange } from "../../constants/color.js";
import {
    Group as GroupIcon,
    Add as AddIcon,
    Menu as MenuIcon, 
    Search as SearchIcon,
    Logout as LogoutIcon,
    Notifications as NotificationIcon,
} from "@mui/icons-material"

import { lazy } from "react";


const SearchDialog = lazy(() => import("../specific/Search.jsx"));
const NotificationDialog = lazy(() => import("../specific/Notifications.jsx"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup.jsx"))


const Header=()=>{
    
    const navigate = useNavigate();

    const [ismobile, setIsMobile] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isNewGroup, setIsNewGroup ] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    

    const handleMobile = () => {
        setIsMobile((prev) => !prev);
    }

    const openSearch = () => {
        setIsSearch((prev) => !prev);
    }

    const openNewGroup = () => {
        setIsNewGroup((prev) => !prev)
    }

    const openNotification = () => {
        setIsNotification((prev) => !prev);
    }

    const navigateToGroup = () => navigate("/groups");

    const logoutHandler = () => {
        console.log("logoutHandler");
    }


    return(
        <>
        
        <Box sx={{flexGrow:1}} height={"4rem"}>
        <AppBar position="static" sx={{bgcolor: orange}} >

            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{
                        display: {xs: "none", sm: "block"},
                    }}
                >
                    Chat App
                </Typography>
                
                <Box
                sx={{
                    display: {xs: "block", sm: "none"},
                }}
                >
                <IconButton color="inherit" onClick={handleMobile}>
                    <MenuIcon/>
                </IconButton>
                </Box>

                <Box sx={{
                    flexGrow: 1,
                }}
                />

                <Box>

                    <IconBtn
                        title={"Search"}
                        icon={<SearchIcon/>}
                        onClick={openSearch}
                    />
                    <IconBtn
                        title={"New Group"}
                        icon={<AddIcon/>}
                        onClick={openNewGroup}
                    />
                    <IconBtn
                        title={"People"}
                        icon={<GroupIcon/>}
                        onClick={navigateToGroup}
                    />
                    <IconBtn
                        title={"Notification"}
                        icon={<NotificationIcon/>}
                        onClick={openNotification}
                    />
                    <IconBtn
                        title={"Logout"}
                        icon={<LogoutIcon/>}
                        onClick={logoutHandler}
                    />

                    
                   
                </Box>

            </Toolbar>
        </AppBar>

        </Box>

        {isSearch && (
            <Suspense fallback={<Backdrop open/>}>
                <SearchDialog/>
            </Suspense>
        )}

        {isNotification && (
            <Suspense fallback={<Backdrop open/>}>
                <NotificationDialog/>
            </Suspense>
        )}

        {isNewGroup && (
            <Suspense fallback={<Backdrop open/>}>
                <NewGroupDialog/>
            </Suspense>
        )}
        
        </>
    )
};

const IconBtn = ({title,icon,onClick}) => {
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" size="large" onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    )
}

export default Header;
