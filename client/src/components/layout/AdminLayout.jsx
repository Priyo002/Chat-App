import { Box, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { grayColor } from '../../constants/color'
import { 
    Dashboard as DashboardIcon, 
    Close as CloseIcon, 
    ManageAccounts as ManageAccountsIcon , 
    Menu as MenuIcon,
    Groups as GroupsIcon,
    Message as MessageIcon,

} from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import { Link } from '../styles/StyledComponents'


const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon/>,
    },
    {
        name: "User",
        path: "/admin/user-management",
        icon: <ManageAccountsIcon/>,
    },
    {
        name: "Chats",
        path: "/admin/chats-management",
        icon: <GroupsIcon/>,
    },
    {
        name: "Message",
        path: "/admin/messages",
        icon: <MessageIcon/>,
    },
];


const Sidebar = ({w = "100%"}) => {

    const location = useLocation();

    return (
        <Stack width={{w}} direction={"column"} p={"3rem"} spacing={"3rem"}>
            <Typography variant='h5' textTransform={"uppercase"}>
                ChattApp
            </Typography>

            <Stack spacing={"1rem"}>
            {
            adminTabs.map((tab) => (
                <Link key={tab.path} to={tab.path}>
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={"1rem"}
                    >
                        {tab.icon}
                        <Typography>{tab.name}</Typography>
                    </Stack>
                </Link>
            ))
            }
            </Stack>

        </Stack>
    )
}

const AdminLayout = ({ children }) => {

    const [isMobile,setIsMobile] = useState(false);

    const handleMobile = () => setIsMobile(!isMobile);

    const handleClose = () => setIsMobile(false);

    return (
    <Grid container minHeight={"100vh"}>

        <Box
            sx={{
                display: {
                    xs : "block", 
                    md: "none"
                },
                position: "fixed",
                right: "1rem",
                top: "1rem",
            }}
        >
            <IconButton onClick={handleMobile}>
                {isMobile ? <CloseIcon/> : <MenuIcon/>}
            </IconButton>
            
        </Box>

        <Grid
            item
            md={4}
            lg={3}
            sx={{
                display: {
                    xs : "none",
                    md: "block"
                }
            }}
        >
            <Sidebar/>
        </Grid>

        <Grid
            item
            xs={12}
            md={8}
            lg={9}
            sx={{
                bgcolor: grayColor,
            }}
        >
            {children}
        </Grid>

        <Drawer open={isMobile} onClose={handleClose}>
            <Sidebar w="50vw" />
        </Drawer>

    </Grid>
  )
}

export default AdminLayout