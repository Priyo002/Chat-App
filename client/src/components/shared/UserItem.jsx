import { Avatar, IconButton, Stack, Typography, ListItem } from '@mui/material';
import React,{memo} from 'react'
import { Add as AddIcon } from '@mui/icons-material';


const UserItem = ({user,handler,hadlerIsLoading}) => {

    const {name,_id,avatar} = user;

  return (
    <ListItem >
        <Stack 
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            width={"100%"}
        >
            <Avatar/>
            <Typography
                variant="body1"
                sx={{
                    flexGlow: 1,
                    display: "-webkit-flex",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                }}
            >
                {name}
            </Typography>

            <IconButton 
                size='small'
                sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover":{
                        bgcolor: "primary.dark",
                    },
                }}
                onClick={() => handler(_id)} 
                disabled={hadlerIsLoading}
            >
                <AddIcon/>
            </IconButton>
        </Stack>
    </ListItem>
  )
}

export default memo(UserItem)