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
import axios from "axios";
import { server } from "../../constants/config.js";
import toast from "react-hot-toast";
import { userNotExists } from "../../redux/reducers/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile, setIsSearch } from "../../redux/reducers/misc.js";
import { setIsNotification } from "../../redux/reducers/misc.js";

const SearchDialog = lazy(() => import("../specific/Search.jsx"));
const NotificationDialog = lazy(() => import("../specific/Notifications.jsx"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup.jsx"))


const Header=()=>{
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isSearch, isNotification} = useSelector((state)=>state.misc);

    
    const [isNewGroup, setIsNewGroup ] = useState(false);
    

    const handleMobile = () => {
        dispatch(setIsMobile(true));
    }

    const openSearch = () => {
        dispatch(setIsSearch(true));   
    }

    const openNewGroup = () => {
        setIsNewGroup((prev) => !prev)
    }

    const openNotification = () => {
        dispatch(setIsNotification(true));
    }

    const navigateToGroup = () => navigate("/groups");

    const logoutHandler = async () => {
        
        try {
            const { data } = await axios.get(`${server}/api/v1/user/logout`,
            {withCredentials:true}
            );
            dispatch(userNotExists());
            toast.success(data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
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
